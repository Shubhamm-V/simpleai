import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const clientId: any = process.env.GOOGLE_CLIENT_ID;
const clientSecret: any = process.env.GOOGLE_CLIENT_SECRET;
const facebookClientId: any = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret: any = process.env.FACEBOOK_CLIENT_SECRET;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),

    FacebookProvider({
      clientId: facebookClientId,
      clientSecret: facebookClientSecret,
    }),
  ],
  secret: process.env.SECRET,
});
