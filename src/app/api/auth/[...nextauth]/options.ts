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
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...user };

      if (trigger === "update") return { ...token, user: { ...session.user } };

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...token.user },
        accessToken: token.accessToken,
      };
    },
  },
};

export default options;
