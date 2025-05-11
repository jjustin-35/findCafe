import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    provider?: string;
    providerId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    provider?: string;
  }
}
