'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import type { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import type { ApiFunction } from '@/constants/types';
import { ErrorTypes } from '@/constants/errorTypes';

type Tokens = { access_token: string; refresh_token: string };

const clearCookies = () => {
  cookies().delete('access_token');
  cookies().delete('refresh_token');
};

export const generateToken = async (email: string, userId: string): Promise<Tokens> => {
  const access_token = sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  const refresh_token = sign({ originAccessToken: access_token }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: '7d',
  });
  return { access_token, refresh_token };
};

export const login: ApiFunction<{ email: string; password: string }, User> = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    clearCookies();
    return {
      error: {
        error_code: ErrorTypes.USER_NOT_FOUND,
        message: 'User not found',
      },
    };
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    clearCookies();
    return {
      error: {
        error_code: ErrorTypes.INVALID_PASSWORD,
        message: 'Invalid password',
      },
    };
  }

  const tokens = await generateToken(user.email, user.id);
  cookies().set('access_token', tokens.access_token, { httpOnly: true });
  cookies().set('refresh_token', tokens.refresh_token, { httpOnly: true });

  return { data: user };
};

export const signup: ApiFunction<{ email: string; password: string; name: string }, User> = async ({
  email,
  password,
  name,
}) => {
  const hashedPassword = await hash(password, 10);
  const data = { email, password: hashedPassword, name };
  const user = await prisma.user.create({ data });

  return { data: user };
};

export const logout: ApiFunction<null, null> = async () => {
  clearCookies();
  redirect('/');
};

export const resetPassword: ApiFunction<{ email: string; password: string }> = async ({ email, password }) => {
  const hashedPassword = await hash(password, 10);
  await prisma.user.update({ where: { email }, data: { password: hashedPassword } });
  return null;
};

export const getUser: ApiFunction<{ token: string }, User> = async ({ token }) => {
  const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;
  if (!decoded) {
    clearCookies();
    return {
      error: {
        error_code: ErrorTypes.INVALID_TOKEN,
        message: 'Invalid token',
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    clearCookies();
    return {
      error: {
        error_code: ErrorTypes.USER_NOT_FOUND,
        message: 'User not found',
      },
    };
  }

  return { data: user };
};

export const refreshToken: ApiFunction<{ token: string }, Tokens> = async ({ token }) => {
  const decoded = verify(token, process.env.JWT_SECRET_REFRESH) as JwtPayload;

  if (decoded?.originAccessToken) {
    const user = await getUser({ token: decoded.originAccessToken as string });
    if (user.error) {
      clearCookies();
      return {
        error: {
          error_code: ErrorTypes.USER_NOT_FOUND,
          message: 'User not found',
        },
      };
    }
    const tokens = await generateToken(user.data.email, user.data.id);
    return { data: tokens };
  }

  clearCookies();
  return {
    error: {
      error_code: ErrorTypes.INVALID_TOKEN,
      message: 'Invalid token',
    },
  };
};
