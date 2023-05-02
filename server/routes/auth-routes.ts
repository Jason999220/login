import { Request, Response } from "express";
const router = require("express").Router();
const passport = require("passport");
const { registerValidation, loginValidation } = require("../src/validation");
// const Local = require("../models/local-user-module");
const jwt = require("jsonwebtoken");
import Local from "../models/local-user-module";

// 本地端註冊
router.post("/register", async (req: Request, res: Response) => {
  // res.send(req.body); // 確認postman可以連線到
  // 將資料都進Joi驗證處理
  const { error } = registerValidation(req.body);
  // if error exist
  if (error) return res.status(400).send(error.details[0].message);
  // check if email exist，from DB find
  const emailExist = await Local.findOne({ email: req.body.email });
  // 此email已存在
  if (emailExist) {
    console.log("Email already exist !!");
    return res.status(400).send("Email has already been registered.");
  }
  // 假如不存在就註冊並新增資料
  const newUser = new Local({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  try {
    console.log("saveing new user");
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "Successfully saved",
      savedObject: savedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 本地端登入
router.post("/login", async (req: Request, res: Response) => {
  // into validationn of the loginValidation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if user exist
  await Local.findOne({ email: req.body.email })
    .then((findUser: any) => {
      // if email not exist
      if (!findUser) return res.status(401).send("Email not exist");
      // if email  exist
      if (findUser) {
        // compare the password
        findUser.comparePassword(
          req.body.password,
          (err: Error, isMatch: Boolean) => {
            // if err exist
            if (err) return res.status(400).send(err);
            // check isMatch
            if (isMatch) {
              // get JWT token
              // set Payload
              const tokenObj = { _id: findUser._id, email: findUser.email };
              // set token => payload + secret
              const token = jwt.sign(tokenObj, process.env.MY_SECRET);
              // 將資料發送到前端
              res.send({ successfully: true, token: "JWT " + token, findUser });
            } else {
              res.status(401).send("Wrong account or password.");
            }
          }
        );
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

// 第三方登入
// Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    console.log("進入 authRoute -> google callback");
    res.redirect("http://localhost:3000/profile");
    // res.send(req.user);
  }
);

// Github login
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

// Facebook login
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

// 將資料傳遞到前端
router.get("/getCurrentUser", (req: Request, res: Response) => {
  return res.send(req.user);
});

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

console.log("離開 authRoute ");
// 匯出模組
module.exports = router;
