import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'prepai-production-secret-key-32chars-min';

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  targetExamId?: string;
  targetExamName?: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function signToken(user: AuthSessionUser): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      targetExamId: user.targetExamId,
      targetExamName: user.targetExamName,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthSessionUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthSessionUser;
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function getSessionUser(): Promise<AuthSessionUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('prepai_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireRole(user: AuthSessionUser | null, allowedRoles: Role[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
