import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ session });
  } catch (err) {
    return NextResponse.json({ session: null });
  }
}
