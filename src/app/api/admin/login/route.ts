import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { setSessionCookie } from '@/lib/auth-server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await query(`SELECT * FROM "User" WHERE email = $1 AND role = 'ADMIN'`, [email]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    await setSessionCookie({
      id: user.id,
      email: user.email,
      name: user.name,
      role: 'ADMIN'
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server login error' }, { status: 500 });
  }
}
