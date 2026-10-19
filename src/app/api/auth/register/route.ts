import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, targetExamId, educationLevel, dailyStudyTimeMinutes, targetUniversity } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existing = dataStore.getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Account with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const targetExam = dataStore.exams.find(e => e.id === targetExamId || e.slug === targetExamId);

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash: hashedPassword,
      role: 'STUDENT' as const,
      educationLevel: educationLevel || 'FSc Pre-Medical',
      targetExamId: targetExam?.id || 'exam-mdcat',
      targetExamName: targetExam?.name || 'MDCAT',
      targetExamDate: new Date(Date.now() + 86400000 * 45).toISOString(),
      dailyStudyTimeMinutes: dailyStudyTimeMinutes || 60,
      targetUniversity: targetUniversity || 'King Edward / NUST',
      currentLevel: 1,
      xp: 0,
      streak: 1,
      longestStreak: 1,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    dataStore.users.push(newUser);

    const token = signToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      targetExamId: newUser.targetExamId,
      targetExamName: newUser.targetExamName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        targetExamId: newUser.targetExamId,
        targetExamName: newUser.targetExamName,
      },
    });

    response.cookies.set('prepai_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
