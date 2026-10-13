import { cookies } from 'next/headers';
import { AuthSession, createSessionToken, verifySessionToken } from './auth';

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('blueway_session')?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(session: AuthSession) {
  const token = await createSessionToken(session);
  const cookieStore = cookies();
  cookieStore.set('blueway_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}
