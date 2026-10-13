import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, partnerType = 'CAB_OPERATOR', contactPerson, phone, email, location, city } = body;

    if (!name || !phone || !email || !city) {
      return NextResponse.json({ error: 'Name, phone, email, and city are required' }, { status: 400 });
    }

    const partnerId = `ptn-${Date.now()}`;
    await query(
      `INSERT INTO "Partner" ("id", "name", "partnerType", "contactPerson", "phone", "email", "location", "city", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING')`,
      [partnerId, name, partnerType, contactPerson || name, phone, email, location || city, city]
    );

    return NextResponse.json({ success: true, partnerId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error registering partner' }, { status: 500 });
  }
}
