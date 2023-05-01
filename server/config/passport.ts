import passport from "passport";
// get  strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// import User from "../models/other-user-module";
const Other = require("../models/other-user-module");

import { IMongoDBUser } from "../src/types";
// 帳號密碼儲存
require("dotenv").config();

// cookie
passport.serializeUser((user: IMongoDBUser, done: any) => {
  return done(null, user._id);
});
passport.deserializeUser((_id: string, done: any) => {
  Other.findById({ _id })
    .then((user: any) => {
      return done(null, user);
    })
    .catch((err: Error) => {
      return done(err, null);
    });
});
console.log("進入passport ");

//  google strategy
passport.use(
  new GoogleStrategy(
    {
      // 用戶端資料
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback ",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("進入passport -> GoogleStrategy");
      // check user exist our DB
      await Other.findOne({ googleId: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new Other({
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile.photos[0].value,
              email: profile.emails[0].value,
            })
              .save()
              .then((newUser: any) => {
                console.log(`New user created ${newUser.username}`);
                done(null, newUser);
              })
              .catch((err: Error) => {
                console.log(err);
              });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
      console.log("離開passport -> GoogleStrategy");
    }
  )
);

// github strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check user exist our DB
      await Other.findOne({ githubId: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new Other({
              githubId: profile.id,
              username: profile.displayName,
              thumbnail: profile.photos[0].value,
              // email: profile.emails[0].value,
            })
              .save()
              .then((newUser: any) => {
                console.log(`New user created ${newUser.username}`);
                done(null, newUser);
              })
              .catch((err: Error) => {
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

// facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check user exist our DB
      await Other.findOne({ facebookId: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new Other({
              facebookId: profile.id,
              username: profile.displayName,
              thumbnail: profile.photos[0].value,
              // email: profile.emails[0].value,
            })
              .save()
              .then((newUser: any) => {
                console.log(`New user created ${newUser.username}`);
                done(null, newUser);
              })
              .catch((err: Error) => {
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

console.log("離開passport ");
