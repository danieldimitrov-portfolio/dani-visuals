import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { timingSafeEqual } from "node:crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Потребител", type: "text" },
        password: { label: "Парола", type: "password" },
      },
      authorize: async (credentials) => {
        const username = credentials?.username;
        const password = credentials?.password;
        if (typeof username !== "string" || typeof password !== "string") return null;

        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;
        if (!validUsername || !validPassword) return null;
        if (username !== validUsername) return null;

        const supplied = Buffer.from(password, "utf8");
        const expected = Buffer.from(validPassword, "utf8");
        if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

        return { id: "admin", name: validUsername };
      },
    }),
  ],
  pages: {
    signIn: "/admin900/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
