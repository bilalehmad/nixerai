import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
    })
    
  ],
  // session: {

  //   strategy: 'jwt',

  //   maxAge: 30 * 24 * 60 * 60, // 30 days

  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  secret: process.env.NEXTAUTH_SECRET ,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        //console.log(account,"jwt")
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // store the user id from MongoDB to session
      //console.log(token)
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role.toString();
      session.user.subscriptionStatus = sessionUser.subscriptionStatus.toString();
      session.accessToken = token.accessToken
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            role:"client",
            subscriptionStatus:"Free"
          });
        }


        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
