const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log('Seeding initial data...');

    // 1. Admin User
    const adminPass = await bcrypt.hash('Admin@BlueWay2026', 10);
    const adminUser = await client.query(`
      INSERT INTO "User" ("id", "email", "password", "name", "phone", "role")
      VALUES ('user-admin-1', 'admin@bluewaycabs.com', '${adminPass}', 'BlueWay Admin', '+919876543210', 'ADMIN')
      ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name"
      RETURNING "id";
    `);
    const adminId = adminUser.rows[0].id;
    await client.query(`
      INSERT INTO "ProfileAdmin" ("id", "userId", "title")
      VALUES ('profile-admin-1', '${adminId}', 'Head of Operations')
      ON CONFLICT ("userId") DO NOTHING;
    `);

    // 2. Sample Driver
    const driverPass = await bcrypt.hash('Driver@123', 10);
    const driverUser = await client.query(`
      INSERT INTO "User" ("id", "email", "password", "name", "phone", "role")
      VALUES ('user-driver-1', 'driver.rajesh@bluewaycabs.com', '${driverPass}', 'Rajesh Kumar', '+919876543211', 'DRIVER')
      ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name"
      RETURNING "id";
    `);
    const driverId = driverUser.rows[0].id;
    const profileDriver = await client.query(`
      INSERT INTO "ProfileDriver" ("id", "userId", "licenseNumber", "licenseExpiry", "experienceYears", "preferredArea", "drivingType", "city", "status")
      VALUES ('profile-driver-1', '${driverId}', 'DL-1420110012345', '2030-12-31', 8, 'Bangalore Urban & Airport', 'Both', 'Bangalore', 'APPROVED')
      ON CONFLICT ("userId") DO NOTHING
      RETURNING "id";
    `);
    const pDriverId = profileDriver.rows[0]?.id || 'profile-driver-1';

    // 3. Vehicle Types
    const vehicleTypes = [
      { id: 'vt-sedan', name: 'Sedan', slug: 'sedan', seats: 4, luggage: 2, isAc: true, base: 500, perKm: 14, minKm: 10, bata: 300, night: 200, hr: 150, apt: 250, img: '/images/sedan.png' },
      { id: 'vt-suv', name: 'SUV', slug: 'suv', seats: 6, luggage: 4, isAc: true, base: 800, perKm: 18, minKm: 10, bata: 400, night: 250, hr: 200, apt: 350, img: '/images/suv.png' },
      { id: 'vt-innova', name: 'Innova', slug: 'innova', seats: 7, luggage: 4, isAc: true, base: 1000, perKm: 20, minKm: 10, bata: 450, night: 300, hr: 220, apt: 400, img: '/images/innova.png' },
      { id: 'vt-crysta', name: 'Innova Crysta', slug: 'innova-crysta', seats: 7, luggage: 5, isAc: true, base: 1200, perKm: 22, minKm: 10, bata: 500, night: 350, hr: 250, apt: 500, img: '/images/crysta.png' },
      { id: 'vt-premium', name: 'Premium Sedan', slug: 'premium-sedan', seats: 4, luggage: 3, isAc: true, base: 900, perKm: 19, minKm: 10, bata: 400, night: 300, hr: 220, apt: 400, img: '/images/premium.png' },
      { id: 'vt-tempo', name: 'Tempo Traveller', slug: 'tempo-traveller', seats: 12, luggage: 8, isAc: true, base: 2000, perKm: 28, minKm: 15, bata: 600, night: 400, hr: 350, apt: 800, img: '/images/tempo.png' }
    ];

    for (const vt of vehicleTypes) {
      await client.query(`
        INSERT INTO "VehicleType" ("id", "name", "slug", "capacitySeats", "luggageBags", "isAc", "baseFare", "perKmRate", "minimumKm", "driverBata", "nightCharge", "extraHourRate", "airportCharge", "imageUrl")
        VALUES ('${vt.id}', '${vt.name}', '${vt.slug}', ${vt.seats}, ${vt.luggage}, ${vt.isAc}, ${vt.base}, ${vt.perKm}, ${vt.minKm}, ${vt.bata}, ${vt.night}, ${vt.hr}, ${vt.apt}, '${vt.img}')
        ON CONFLICT ("name") DO UPDATE SET "baseFare" = EXCLUDED."baseFare", "perKmRate" = EXCLUDED."perKmRate";
      `);
    }

    // 4. Sample Approved Vehicle
    await client.query(`
      INSERT INTO "Vehicle" ("id", "ownerName", "ownerPhone", "ownerEmail", "vehicleNumber", "make", "model", "manufacturingYear", "fuelType", "seatingCapacity", "isAc", "vehicleTypeId", "status")
      VALUES ('veh-1', 'Rajesh Kumar', '+919876543211', 'driver.rajesh@bluewaycabs.com', 'KA-01-MJ-4321', 'Toyota', 'Etios Sedan', 2023, 'Diesel', 4, true, 'vt-sedan', 'APPROVED')
      ON CONFLICT ("vehicleNumber") DO NOTHING;
    `);

    // Assign driver to vehicle
    await client.query(`
      INSERT INTO "DriverVehicleAssignment" ("id", "driverId", "vehicleId", "active")
      VALUES ('dva-1', '${pDriverId}', 'veh-1', true)
      ON CONFLICT DO NOTHING;
    `);

    // 5. Rental Packages
    const rentalPkgs = [
      { id: 'pkg-4h', name: '4 Hours / 40 KM', hours: 4, km: 40, base: 1200, exKm: 15, exHr: 150 },
      { id: 'pkg-8h', name: '8 Hours / 80 KM', hours: 8, km: 80, base: 2200, exKm: 15, exHr: 150 },
      { id: 'pkg-full', name: 'Full Day (12 Hours / 120 KM)', hours: 12, km: 120, base: 3200, exKm: 15, exHr: 150 }
    ];

    for (const pkg of rentalPkgs) {
      await client.query(`
        INSERT INTO "RentalPackage" ("id", "name", "hours", "includedKm", "basePrice", "extraKmRate", "extraHrRate")
        VALUES ('${pkg.id}', '${pkg.name}', ${pkg.hours}, ${pkg.km}, ${pkg.base}, ${pkg.exKm}, ${pkg.exHr})
        ON CONFLICT DO NOTHING;
      `);
    }

    // 6. Settings
    const settings = [
      { key: 'BUSINESS_NAME', value: 'BlueWay Cabs & Travels' },
      { key: 'TAGLINE', value: 'Your Way. Our Ride.' },
      { key: 'PHONE', value: '+91 98765 43210' },
      { key: 'EMAIL', value: 'booking@bluewaycabs.com' },
      { key: 'ADDRESS', value: '123 BlueWay Plaza, Indiranagar, Bangalore, KA - 560038' },
      { key: 'WHATSAPP', value: '+919876543210' },
      { key: 'CURRENCY', value: '₹' },
      { key: 'BOOKING_PREFIX', value: 'BW' }
    ];

    for (const st of settings) {
      await client.query(`
        INSERT INTO "Setting" ("id", "key", "value")
        VALUES ('st-${st.key}', '${st.key}', '${st.value}')
        ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value";
      `);
    }

    // 7. Seed Sample Bookings
    const bookings = [
      {
        id: 'bk-1',
        bNo: 'BW-2026-000001',
        service: 'ONE_WAY',
        pickup: 'Bangalore City Station',
        drop: 'Mysore Palace, Mysore',
        pDate: '2026-09-05',
        pTime: '08:00 AM',
        cName: 'Amit Sharma',
        cPhone: '+919123456789',
        cEmail: 'amit.sharma@example.com',
        vtId: 'vt-sedan',
        status: 'CONFIRMED',
        fare: 2450
      },
      {
        id: 'bk-2',
        bNo: 'BW-2026-000002',
        service: 'AIRPORT_TRANSFER',
        aptTrip: 'PICKUP',
        aptName: 'Kempegowda International Airport (BLR)',
        flight: '6E-432',
        pickup: 'BLR Terminal 1',
        drop: 'Koramangala 4th Block',
        pDate: '2026-09-06',
        pTime: '02:30 PM',
        cName: 'Priya Nair',
        cPhone: '+919988776655',
        cEmail: 'priya.nair@example.com',
        vtId: 'vt-suv',
        status: 'DRIVER_ASSIGNED',
        driverId: pDriverId,
        vehId: 'veh-1',
        fare: 1850
      }
    ];

    for (const b of bookings) {
      await client.query(`
        INSERT INTO "Booking" (
          "id", "bookingNumber", "serviceType", "airportTripType", "airportName", "flightNumber",
          "pickupLocation", "dropLocation", "pickupDate", "pickupTime", "customerName", "customerPhone",
          "customerEmail", "vehicleTypeId", "driverId", "vehicleId", "status"
        ) VALUES (
          '${b.id}', '${b.bNo}', '${b.service}', ${b.aptTrip ? `'${b.aptTrip}'` : 'NULL'}, ${b.aptName ? `'${b.aptName}'` : 'NULL'}, ${b.flight ? `'${b.flight}'` : 'NULL'},
          '${b.pickup}', '${b.drop}', '${b.pDate}', '${b.pTime}', '${b.cName}', '${b.cPhone}',
          '${b.cEmail}', '${b.vtId}', ${b.driverId ? `'${b.driverId}'` : 'NULL'}, ${b.vehId ? `'${b.vehId}'` : 'NULL'}, '${b.status}'
        ) ON CONFLICT ("bookingNumber") DO NOTHING;

        INSERT INTO "BookingPricing" ("id", "bookingId", "baseFare", "estimatedKm", "ratePerKm", "totalFare")
        VALUES ('bp-${b.id}', '${b.id}', 500, 120, 14, ${b.fare})
        ON CONFLICT ("bookingId") DO NOTHING;
      `);
    }

    console.log('✅ SEED COMPLETED SUCCESSFULLY!');
  } catch (e) {
    console.error('❌ SEED ERROR:', e);
  } finally {
    await client.end();
  }
}

seedDb();
