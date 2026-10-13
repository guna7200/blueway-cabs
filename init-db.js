const { Client } = require('pg');
require('dotenv').config();

async function initDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to Neon PostgreSQL!');

    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "phone" TEXT,
        "role" TEXT DEFAULT 'CUSTOMER',
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "ProfileCustomer" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT UNIQUE NOT NULL,
        "address" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "ProfileDriver" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT UNIQUE NOT NULL,
        "licenseNumber" TEXT UNIQUE NOT NULL,
        "licenseExpiry" TEXT NOT NULL,
        "experienceYears" INT DEFAULT 1,
        "preferredArea" TEXT,
        "drivingType" TEXT,
        "dob" TEXT,
        "address" TEXT,
        "city" TEXT,
        "profilePhoto" TEXT,
        "status" TEXT DEFAULT 'PENDING',
        "rejectionReason" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "ProfileAdmin" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT UNIQUE NOT NULL,
        "title" TEXT DEFAULT 'Operations Manager',
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "VehicleType" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT UNIQUE NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "description" TEXT,
        "capacitySeats" INT DEFAULT 4,
        "luggageBags" INT DEFAULT 2,
        "isAc" BOOLEAN DEFAULT true,
        "imageUrl" TEXT,
        "baseFare" DOUBLE PRECISION DEFAULT 500,
        "perKmRate" DOUBLE PRECISION DEFAULT 14,
        "minimumKm" DOUBLE PRECISION DEFAULT 10,
        "driverBata" DOUBLE PRECISION DEFAULT 300,
        "nightCharge" DOUBLE PRECISION DEFAULT 200,
        "extraHourRate" DOUBLE PRECISION DEFAULT 150,
        "airportCharge" DOUBLE PRECISION DEFAULT 200,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Vehicle" (
        "id" TEXT PRIMARY KEY,
        "ownerName" TEXT NOT NULL,
        "ownerPhone" TEXT NOT NULL,
        "ownerEmail" TEXT,
        "ownerAddress" TEXT,
        "vehicleNumber" TEXT UNIQUE NOT NULL,
        "make" TEXT NOT NULL,
        "model" TEXT NOT NULL,
        "manufacturingYear" INT NOT NULL,
        "fuelType" TEXT NOT NULL,
        "seatingCapacity" INT DEFAULT 4,
        "isAc" BOOLEAN DEFAULT true,
        "vehicleTypeId" TEXT NOT NULL,
        "status" TEXT DEFAULT 'PENDING',
        "rejectionReason" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id")
      );

      CREATE TABLE IF NOT EXISTS "DriverDocument" (
        "id" TEXT PRIMARY KEY,
        "driverId" TEXT NOT NULL,
        "documentType" TEXT NOT NULL,
        "fileUrl" TEXT NOT NULL,
        "status" TEXT DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("driverId") REFERENCES "ProfileDriver"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "VehicleDocument" (
        "id" TEXT PRIMARY KEY,
        "vehicleId" TEXT NOT NULL,
        "documentType" TEXT NOT NULL,
        "fileUrl" TEXT NOT NULL,
        "status" TEXT DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "DriverVehicleAssignment" (
        "id" TEXT PRIMARY KEY,
        "driverId" TEXT NOT NULL,
        "vehicleId" TEXT NOT NULL,
        "assignedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "active" BOOLEAN DEFAULT true,
        FOREIGN KEY ("driverId") REFERENCES "ProfileDriver"("id") ON DELETE CASCADE,
        FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "RentalPackage" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "hours" INT NOT NULL,
        "includedKm" INT NOT NULL,
        "basePrice" DOUBLE PRECISION NOT NULL,
        "extraKmRate" DOUBLE PRECISION NOT NULL,
        "extraHrRate" DOUBLE PRECISION NOT NULL,
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Booking" (
        "id" TEXT PRIMARY KEY,
        "bookingNumber" TEXT UNIQUE NOT NULL,
        "serviceType" TEXT NOT NULL,
        "tripType" TEXT,
        "airportTripType" TEXT,
        "pickupLocation" TEXT NOT NULL,
        "dropLocation" TEXT,
        "pickupDate" TEXT NOT NULL,
        "pickupTime" TEXT NOT NULL,
        "returnDate" TEXT,
        "returnTime" TEXT,
        "airportName" TEXT,
        "flightNumber" TEXT,
        "rentalPackageId" TEXT,
        "passengers" INT DEFAULT 1,
        "customerName" TEXT NOT NULL,
        "customerPhone" TEXT NOT NULL,
        "customerEmail" TEXT NOT NULL,
        "specialNotes" TEXT,
        "ownVehicle" BOOLEAN DEFAULT false,
        "customerId" TEXT,
        "vehicleTypeId" TEXT,
        "vehicleId" TEXT,
        "driverId" TEXT,
        "status" TEXT DEFAULT 'PENDING',
        "assignedAt" TIMESTAMP(3),
        "assignedBy" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("customerId") REFERENCES "ProfileCustomer"("id"),
        FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id"),
        FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id"),
        FOREIGN KEY ("driverId") REFERENCES "ProfileDriver"("id")
      );

      CREATE TABLE IF NOT EXISTS "BookingPricing" (
        "id" TEXT PRIMARY KEY,
        "bookingId" TEXT UNIQUE NOT NULL,
        "baseFare" DOUBLE PRECISION DEFAULT 0,
        "estimatedKm" DOUBLE PRECISION DEFAULT 0,
        "ratePerKm" DOUBLE PRECISION DEFAULT 0,
        "kmCharge" DOUBLE PRECISION DEFAULT 0,
        "driverBata" DOUBLE PRECISION DEFAULT 0,
        "nightCharge" DOUBLE PRECISION DEFAULT 0,
        "extraHrCharge" DOUBLE PRECISION DEFAULT 0,
        "airportCharge" DOUBLE PRECISION DEFAULT 0,
        "tollEstimate" DOUBLE PRECISION DEFAULT 0,
        "parkingEstimate" DOUBLE PRECISION DEFAULT 0,
        "discount" DOUBLE PRECISION DEFAULT 0,
        "totalFare" DOUBLE PRECISION DEFAULT 0,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "BookingStatusHistory" (
        "id" TEXT PRIMARY KEY,
        "bookingId" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "changedBy" TEXT NOT NULL,
        "notes" TEXT,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "AdminNote" (
        "id" TEXT PRIMARY KEY,
        "bookingId" TEXT NOT NULL,
        "author" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Review" (
        "id" TEXT PRIMARY KEY,
        "bookingId" TEXT UNIQUE NOT NULL,
        "rating" INT NOT NULL,
        "comment" TEXT,
        "isPublic" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "Notification" (
        "id" TEXT PRIMARY KEY,
        "recipient" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "isRead" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Setting" (
        "id" TEXT PRIMARY KEY,
        "key" TEXT UNIQUE NOT NULL,
        "value" TEXT NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Location" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT UNIQUE NOT NULL,
        "address" TEXT,
        "city" TEXT NOT NULL,
        "isAirport" BOOLEAN DEFAULT false,
        "isActive" BOOLEAN DEFAULT true
      );
    `);

    console.log('✅ ALL NEON POSTGRESQL TABLES CREATED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Table Creation Error:', err);
  } finally {
    await client.end();
  }
}

initDb();
