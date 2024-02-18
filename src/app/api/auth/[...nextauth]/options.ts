import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {
  getUserByAccessToken,
  signIn,
  signUp,
} from "@/services/Batterbox/Batterbox";

const options: AuthOptions = {
  pages: { signIn: "/", signOut: "/", error: "/", verifyRequest: "/" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        email: {},
        password: {},
        confirmPassword: {},
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          if (credentials.username && credentials.confirmPassword) {
            const data = await signUp({
              username: credentials.username,
              email: credentials.email,
              password: credentials.confirmPassword,
            });

            if (!data.accessToken || !data.refreshToken)
              throw new Error("E-mail já cadastrado.");

            return data;
          }

          const data = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          if (!data.accessToken || !data.refreshToken)
            throw new Error("E-mail ou senha inválido.");

          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...user };

      return token;

      /* 
      # Comentádo até encontrar uma solução para a persistência do token.

      const accessTokenIsValid: boolean =
        Date.now() < Date.parse(token.accessTokenExpiresAt);

      if (accessTokenIsValid) return token;

      const newTokens = await refreshToken(token.refreshToken);

      return {
        ...token,
        accessToken: newTokens.accessToken,
        accessTokenExpiresAt: newTokens.accessTokenExpiresAt,
        refreshToken: newTokens.refreshToken,
      };
      */
    },
    async session({ session, token }) {
      const userData = await getUserByAccessToken(token.accessToken);

      return {
        ...session,
        user: { ...userData },
        accessToken: token.accessToken,
      };
    },
  },
};

export default options;
