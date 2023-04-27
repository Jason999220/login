import passport from "passport";
// get google strategy
const GoogleStrategy = require("passport-google-oauth20");
const GitHubStrategy = require("passport-github").Strategy;
import User from "../models/user-module";

// 新增使用者
// import googleUser from "../models/user-module";
// 帳號密碼儲存
require("dotenv").config();

// cookie
passport.serializeUser((user: any, done: any) => {
  return done(null, user._id);
});
passport.deserializeUser((_id: any, done: any) => {
  return done(null, _id);
});

// build google user => google strategy
passport.use(
  new GoogleStrategy(
    {
      // 用戶端資料
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback ",
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // console.log(profile);
      done(null, profile);
    }
  )
);

// github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check user exist our DB
      await User.findOne({ googleID: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new User({
              githubId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then((newUser) => {
                console.log(`New user created ${newUser.username}`);
                done(null, newUser);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  )
);
