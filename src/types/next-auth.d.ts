import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      picture: string | null;
      bio: string | null;
    };
    accessToken: string;
  }
  interface User {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
  }
}
