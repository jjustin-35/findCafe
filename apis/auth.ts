import { compare, hash } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export const generateToken = async (email: string, userId: string) => {
  const access_token = sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  const refresh_token = sign({ originAccessToken: access_token }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: '7d',
  });
  return { access_token, refresh_token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const tokens = await generateToken(user.email, user.id);

  return { user, ...tokens };
};

export const register = async (email: string, password: string, name: string) => {
  const hashedPassword = await hash(password, 10);
  const data = { email, password: hashedPassword, name };
  const user = await prisma.user.create({ data });

  return user;
};

export const getUser = async (token: string) => {
  const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;
  if (!decoded) throw new Error('Invalid token');

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) throw new Error('User not found');

  return user;
};

export const refreshToken = async (refreshToken: string) => {
  const decoded = verify(refreshToken, process.env.JWT_SECRET_REFRESH) as JwtPayload;

  if (decoded?.originAccessToken) {
    const user = await getUser(decoded.originAccessToken);
    const tokens = await generateToken(user.email, user.id);
    return { ...tokens };
  }

  throw new Error('Invalid token');
};
