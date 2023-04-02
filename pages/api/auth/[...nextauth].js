import NextAuth from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";

const scopes = ['identify'].join(' ')

export default NextAuth({
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
      console.log("JWT")
      if (user) {
        console.log(token)
        console.log(user)
        token.id = user.id
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      console.log("SESSION")
      if (session?.user) {
        console.log(token)
        session.user.id = token.sub;
      }
      console.log(session)
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
