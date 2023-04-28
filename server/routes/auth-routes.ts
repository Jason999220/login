const router = require("express").Router();
const passport = require("passport");
import { Request, Response } from "express";
// get profile from google authenticate
console.log("進入 authRoute ");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// google callback URL
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    console.log("進入 authRoute -> google callback");
    res.redirect("http://localhost:3000/profile");
    // res.send(req.user);
  }
);
console.log("離開 authRoute ");
// get profile from github authenticate
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("http://localhost:3000/profile");
  }
);

// 匯出模組
module.exports = router;
