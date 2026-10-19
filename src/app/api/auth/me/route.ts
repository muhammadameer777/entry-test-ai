import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { dataStore } from '@/lib/storage';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = dataStore.getUserById(session.id) || session;
  return NextResponse.json({ authenticated: true, user });
}
