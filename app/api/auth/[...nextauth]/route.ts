import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
		// 	name: 'credentials',
    //   type: 'credentials',
    //   id: 'credentials',
		// 	credentials: {
		// 		email: { label: 'email', type: 'text' },
		// 		password: { label: 'password', type: 'password' },
		// 	},
		// 	async authorize(credentials) {
    //     console.log(credentials);
		// 		const user: User = {id: "1", name: 'test', email: ''};
		// 		return user;
		// 	},
		// })
  ],
  adapter: PrismaAdapter(new PrismaClient),
  callbacks: {
    async session({session, token, user}) {
      session.user.userId = user.id;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

