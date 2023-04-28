// import
import express from "express";
const app = express();
import mongoose from "mongoose"; // 連接資料庫
import dovent from "dotenv";
dovent.config(); // 用於讀取放在.env的資訊
require("../config/passport"); // 認證時會進入
const authRoute = require("../routes/auth-routes"); // 驗證並取得特定網址資訊
import cors from "cors"; // 用於跨域問題
import expressSession from "express-session";
import passport from "passport";

// import User from "../models/user-module";
// import { IMongoDBUser } from "./types";

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;

// connect to mongoDB
mongoose
  .connect(
    `${process.env.MONGODB_START}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_END}`
  )
  .then(() => {
    console.log("Connect to mongodb atlas successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json()); // 用於解析資料
// cors 解決跨域問題
app.use(
  cors({
    origin: "http://localhost:3000", // client side URL
    credentials: true, // 默認為false ，即為瀏覽器是否可以在跨域情況下將身分驗證訊息送到服務端
  })
);
// express-Session
app.use(
  expressSession({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: process.env.MY_SECRET, // 當簽章用，session驗證的自創密碼
    resave: false, // 強制將session 存至 session store ， 即使沒有被修改
    saveUninitialized: true, // 強制將session 存至 session store ， 即使未初始化
  })
);

app.use(passport.initialize()); // 用於初始化認證模組，將每次的passport的req都reset
app.use(passport.session()); // 更改當前用戶，從client cookie取得session id 給deserialized
app.use(express.json()); // 解析資料
app.use("/auth", authRoute);

// cookie
// passport.serializeUser((user: IMongoDBUser, done: any) => {
//   return done(null, user._id);
// });
// passport.deserializeUser((_id: string, done: any) => {
//   User.findById({ _id })
//     .then((user) => {
//       return done(null, user);
//     })
//     .catch((err) => {
//       return done(err, null);
//     });
// });

/*
// build google user => google strategy
passport.use(
  new GoogleStrategy(
    {
      // 用戶端資料
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback ",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check user exist our DB
      await User.findOne({ googleId: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new User({
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile.photos[0].value,
              email: profile.emails[0].value,
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
// get profile from google authenticate
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// google callback URL
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: any, res: any) => {
    res.redirect("http://localhost:3000/profile");
  }
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
      console.log(profile);
      // check user exist our DB
      await User.findOne({ githubId: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new User({
              githubId: profile.id,
              username: profile.displayName,
              thumbnail: profile.photos[0].value,
              // email: profile.emails[0].value,
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
// github auth routes
app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req: any, res: any) => {
    res.redirect("http://localhost:3000/profile");
  }
);
*/
// facebook
/*
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
    },async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check user exist our DB
      await User.findOne({ facebookID: profile.id })
        .then((userExist: any) => {
          if (userExist) {
            console.log("User already exist.");
            done(null, userExist);
          } else {
            new User({
              facebookId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then((newUser) => {
                console.log(`New user created ${newUser}`);
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

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["profile"],
    prompt: "select_account",
  })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req: any, res: any) => {
    res.redirect("http://localhost:3000");
  }
);
*/

// get root
app.get("/", (req, res) => {
  res.send("Welcome to server side");
});

// 將資料傳遞到前端
app.get("/getuser", (req, res) => {
  res.send(req.user);
});

// logout
app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout((err) => {
      // if (err) return next(err);
      if (err) return res.send("Successfully logged out");
      res.redirect("/");
    });
  }
});

// listen ，在部屬heroku會產生一個port
app.listen(process.env.port || 8000, () => {
  console.log("Server listening on port 8000");
});
