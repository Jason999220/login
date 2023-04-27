const passport = require("passport");
const router = require("express").Router();

// get profile from google authenticate
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

// google callback URL
router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req: any, res: any) => {
    res.redirect("/profile");
    // res.redirect("http://localhost:3000");
    // res.send(req.user);
  }
);
// google auth routes
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
    prompt: "select_account",
  })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req: any, res: any) => {
    res.redirect("http://localhost:3000");
  }
);
module.exports = router;
