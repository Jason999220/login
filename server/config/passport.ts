import passport from "passport";
// get google strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
