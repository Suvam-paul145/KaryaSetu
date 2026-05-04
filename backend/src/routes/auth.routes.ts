import { Router } from "express";
import passport from "passport";
import "../config/passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const router = Router();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    // Set a httpOnly cookie so the client can use it for subsequent requests
    // Use SameSite 'lax' for development/top-level navigation. Adjust to 'none' and secure:true for production HTTPS.
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24 * 60 * 60 * 1000 });
    res.redirect(`${clientUrl}/dashboard`);
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