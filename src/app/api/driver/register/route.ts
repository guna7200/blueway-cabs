import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      password,
      licenseNumber,
      licenseExpiry,
      experienceYears = 1,
      preferredArea,
      drivingType = 'Both',
      documents
    } = body;

    if (!fullName || !phone || !email || !password || !licenseNumber) {
      return NextResponse.json({ error: 'All mandatory fields are required' }, { status: 400 });
    }

    // License format validation check
    const cleanDl = licenseNumber.replace(/[\s-]/g, '');
    const dlRegex = /^([A-Z]{2}[0-9]{2}[A-Z0-9]{2,4}[0-9]{7,11})$/i;
    if (cleanDl.length < 13 || !dlRegex.test(cleanDl)) {
      return NextResponse.json({ error: 'Invalid Driving License number format.' }, { status: 400 });
    }

    // Check duplicate email or license number
    const existingDl = await query(`SELECT id FROM "ProfileDriver" WHERE "licenseNumber" = $1`, [licenseNumber.toUpperCase()]);
    if (existingDl.rows.length > 0) {
      return NextResponse.json({ error: 'Driving License number is already registered.' }, { status: 400 });
    }

    const passHash = await bcrypt.hash(password, 10);
    const userId = `usr-drv-${Date.now()}`;

    // Create User record
    await query(
      `INSERT INTO "User" ("id", "email", "password", "name", "phone", "role")
       VALUES ($1, $2, $3, $4, $5, 'DRIVER')`,
      [userId, email, passHash, fullName, phone]
    );

    // Create ProfileDriver record (PENDING approval)
    const driverId = `drv-${Date.now()}`;
    await query(
      `INSERT INTO "ProfileDriver" (
        "id", "userId", "licenseNumber", "licenseExpiry", "experienceYears",
        "preferredArea", "drivingType", "status"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING')`,
      [driverId, userId, licenseNumber.toUpperCase(), licenseExpiry, experienceYears, preferredArea, drivingType]
    );

    // Store Driver License & Govt ID Documents if provided
    if (documents?.licenseDoc) {
      await query(
        `INSERT INTO "DriverDocument" ("id", "driverId", "documentType", "fileUrl", "status")
         VALUES ($1, $2, 'LICENSE', $3, 'PENDING')`,
        [`doc-lic-${Date.now()}`, driverId, documents.licenseDoc]
      );
    }

    if (documents?.govtIdDoc) {
      await query(
        `INSERT INTO "DriverDocument" ("id", "driverId", "documentType", "fileUrl", "status")
         VALUES ($1, $2, 'GOVT_ID', $3, 'PENDING')`,
        [`doc-gid-${Date.now()}`, driverId, documents.govtIdDoc]
      );
    }

    return NextResponse.json({ success: true, driverId });
  } catch (err: any) {
    console.error('Driver registration API error:', err);
    return NextResponse.json({ error: err.message || 'Error registering driver' }, { status: 500 });
  }
}
