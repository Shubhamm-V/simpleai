import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const clientId: any = process.env.GOOGLE_CLIENT_ID;
const clientSecret: any = process.env.GOOGLE_CLIENT_SECRET;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    // Add other providers here if needed
  ],
});
