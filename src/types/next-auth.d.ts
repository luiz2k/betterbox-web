import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
    };
    accessToken: string;
  }
  interface User {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
    };
  }
}
