import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model";

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLIENT_ID) {
  const dotenv = require('dotenv');
  dotenv.config();
}

const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL || `${backendUrl}/api/auth/google/callback`;
export const googleOAuthConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

if (googleOAuthConfigured) {
  console.log(`Google OAuth callback URL: ${callbackUrl}`);

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
        });
      }
      return done(null, user);
    }
  ));
} else {
  console.warn("Google OAuth is disabled: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing");
}

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));
