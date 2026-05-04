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

// Helpful debug output so you can verify the exact callback URL used by the server
console.log(`Google OAuth callback URL: ${callbackUrl}`);
console.log(`Google OAuth client ID: ${process.env.GOOGLE_CLIENT_ID}`);

// Validate that required environment variables are present
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials in environment variables');
}

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));