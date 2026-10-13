import { query } from '@/lib/db';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'blueway-cabs-super-secret-jwt-key-2026');

export interface AuthSession {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
  driverId?: string;
}

export async function createSessionToken(payload: AuthSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AuthSession;
  } catch (err) {
    return null;
  }
}
