import { Router } from "express";
import passport from "passport";
import "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;