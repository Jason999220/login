const passport = require("passport").Router;
const router = require("express").Router;

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
    // res.redirect("/profile");
    res.send(req.user);
  }
);

module.exports = router;
