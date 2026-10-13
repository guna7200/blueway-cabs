const { Client } = require('pg');
require('dotenv').config();

async function updateVehicleImages() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    await client.query(`UPDATE "VehicleType" SET "imageUrl" = '/vehicles/sedan.jpg' WHERE id IN ('vt-sedan', 'vt-premium')`);
    await client.query(`UPDATE "VehicleType" SET "imageUrl" = '/vehicles/suv.jpg' WHERE id = 'vt-suv'`);
    await client.query(`UPDATE "VehicleType" SET "imageUrl" = '/vehicles/innova.jpg' WHERE id IN ('vt-innova', 'vt-crysta')`);
    await client.query(`UPDATE "VehicleType" SET "imageUrl" = '/vehicles/tempo.jpg' WHERE id = 'vt-tempo'`);
    console.log('Successfully updated DB VehicleType imageUrls!');
  } catch (err) {
    console.error('Error updating vehicle images:', err);
  } finally {
    await client.end();
  }
}

updateVehicleImages();
