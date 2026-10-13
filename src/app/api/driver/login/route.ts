import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { setSessionCookie } from '@/lib/auth-server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await query(`
      SELECT u.*, pd.id as "driverId"
      FROM "User" u
      JOIN "ProfileDriver" pd ON pd."userId" = u.id
      WHERE u.email = $1 AND u.role = 'DRIVER'
    `, [email]);

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid driver credentials' }, { status: 401 });
    }

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid driver credentials' }, { status: 401 });
    }

    await setSessionCookie({
      id: user.id,
      email: user.email,
      name: user.name,
      role: 'DRIVER',
      driverId: user.driverId
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Driver login error' }, { status: 500 });
  }
}
