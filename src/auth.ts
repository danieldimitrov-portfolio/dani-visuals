import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        if (!validUsername || !passwordHash) return null;
        if (username !== validUsername) return null;

        const valid = await bcrypt.compare(password, passwordHash);
        if (!valid) return null;

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
