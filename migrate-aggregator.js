const { Client } = require('pg');
require('dotenv').config();

async function migrateAggregatorModel() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log('Migrating Neon DB schema for Aggregator & Partner model...');

    // 1. Create Partner table (Supports Cab Operator, Travel Agency, Hotel, Corporate, etc.)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Partner" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "partnerType" TEXT NOT NULL DEFAULT 'CAB_OPERATOR',
        "contactPerson" TEXT,
        "phone" TEXT NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "location" TEXT,
        "address" TEXT,
        "city" TEXT,
        "status" TEXT DEFAULT 'PENDING',
        "rejectionReason" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Add Partner relationship to ProfileDriver and Vehicle
    await client.query(`
      ALTER TABLE "ProfileDriver" ADD COLUMN IF NOT EXISTS "partnerId" TEXT REFERENCES "Partner"("id");
      ALTER TABLE "Vehicle" ADD COLUMN IF NOT EXISTS "partnerId" TEXT REFERENCES "Partner"("id");
    `);

    // 3. Add Commission, Payment, & Payout columns to Booking & BookingPricing
    await client.query(`
      ALTER TABLE "Booking"
        ADD COLUMN IF NOT EXISTS "partnerId" TEXT REFERENCES "Partner"("id"),
        ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT DEFAULT 'PAY_LATER',
        ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT DEFAULT 'PENDING',
        ADD COLUMN IF NOT EXISTS "payoutStatus" TEXT DEFAULT 'PENDING';

      ALTER TABLE "BookingPricing"
        ADD COLUMN IF NOT EXISTS "partnerPayout" DOUBLE PRECISION DEFAULT 0,
        ADD COLUMN IF NOT EXISTS "bluewayCommission" DOUBLE PRECISION DEFAULT 0,
        ADD COLUMN IF NOT EXISTS "commissionType" TEXT DEFAULT 'PERCENTAGE',
        ADD COLUMN IF NOT EXISTS "commissionRate" DOUBLE PRECISION DEFAULT 10;
    `);

    // 4. Update VehicleType for default commission percentage
    await client.query(`
      ALTER TABLE "VehicleType"
        ADD COLUMN IF NOT EXISTS "commissionPercentage" DOUBLE PRECISION DEFAULT 10;
    `);

    // 5. Insert Default Aggregator Platform Settings
    const defaultSettings = [
      ['DEFAULT_COMMISSION_PERCENTAGE', '10'],
      ['DEFAULT_PAYMENT_MODE', 'PAY_LATER'],
      ['WHATSAPP', '+919876543210'],
      ['PHONE', '+91 98765 43210'],
      ['EMAIL', 'booking@bluewaycabs.com'],
      ['BOOKING_PREFIX', 'BW'],
      ['BUSINESS_NAME', 'BlueWay Cabs & Travels'],
      ['TAGLINE', 'Your Way. Our Ride.']
    ];

    for (const [key, val] of defaultSettings) {
      await client.query(`
        INSERT INTO "Setting" ("id", "key", "value")
        VALUES ('st-${key}', '${key}', '${val}')
        ON CONFLICT ("key") DO NOTHING;
      `);
    }

    console.log('✅ DATABASE SCHEMA MIGRATION COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.end();
  }
}

migrateAggregatorModel();
