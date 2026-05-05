import { Router } from "express";
import passport from "passport";
import { googleOAuthConfigured } from "../config/passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const router = Router();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const authUrl = `${clientUrl}/auth`;

router.get(
  "/google",
  (req, res, next) => {
    if (!googleOAuthConfigured) {
      return res.status(503).json({ message: "Google OAuth is not configured" });
    }
    next();
  },
  // Use session: false to avoid requiring express-session middleware (we use JWT cookies instead)
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    if (!googleOAuthConfigured) {
      return res.redirect(authUrl);
    }
    next();
  },
  // session: false avoids passport trying to establish a login session (no express-session used)
  passport.authenticate("google", { failureRedirect: authUrl, session: false }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    // Set a httpOnly cookie so the client can use it for subsequent requests
    // Use SameSite 'lax' for development/top-level navigation. Adjust to 'none' and secure:true for production HTTPS.
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24 * 60 * 60 * 1000 });
    const redirectTo = `${authUrl}?token=${token}`;
    console.log(`Redirecting to client after OAuth: ${redirectTo}`);
    res.redirect(redirectTo);
  }
);

// Returns current authenticated user based on JWT cookie
router.get('/me', async (req: any, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const payload = jwt.verify(token, process.env.JWT_SECRET! as string) as any;
    const user = await User.findById(payload.id).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

// Logout - clear cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
});

export default router;
