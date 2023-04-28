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

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("http://localhost:3000/profile");
  }
);

// logout
router.get("/logout", (req: Request, res: Response) => {
  if (req.user) {
    req.logout((err) => {
      // if (err) return next(err);
      if (err) return res.send("Successfully logged out");
      res.redirect("/");
    });
  }
});

// 匯出模組
module.exports = router;
