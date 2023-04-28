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

// get root
app.get("/", (req, res) => {
  res.send("Welcome to server side");
});

// 將資料傳遞到前端
app.get("/getuser", (req, res) => {
  res.send(req.user);
});

// listen ，在部屬heroku會產生一個port
app.listen(process.env.port || 8000, () => {
  console.log("Server listening on port 8000");
});
