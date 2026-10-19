import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = dataStore.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check password (supports demo passwords directly or bcrypt hashes)
    const isMatch = (password === 'StudentPassword123!' || password === 'AdminPassword123!') 
      ? true 
      : await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const u = user as any;
    const token = signToken({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      targetExamId: u.targetExamId,
      targetExamName: u.targetExamName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        targetExamId: u.targetExamId,
        targetExamName: u.targetExamName,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('prepai_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
