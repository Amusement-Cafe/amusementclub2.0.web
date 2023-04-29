import NextAuth from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";

const scopes = ['identify'].join(' ')

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {params: {scope: scopes}},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions);
