import { Request, Response } from "express";
const router = require("express").Router();
const passport = require("passport");
const { registerValidation, loginValidation } = require("../src/validation");
const Local = require("../models/local-user-module");

// 本地端註冊
router.post("/register", async (req: Request, res: Response) => {
  // res.send(req.body); // 確認postman可以連線到
  // 將資料都進Joi驗證處理
  const { error } = registerValidation(req.body);
  // if error exist
  if (error) return res.status(400).send(error.details[0].message);
  // 檢查eamil是否存在，從DB找
  // const emailExist = await Local.findOne({ email: req.body.email });
  // res.send(emailExist);
  // 此email已存在
  // if (emailExist) {
  //   console.log("Email already exist !!");
  //   return res.status(400).send("Email has already been registered.");
  // }
  // // 假如不存在就註冊並新增資料
  new Local({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })
    .then(async (newUser: any) => {
      console.log("auth route 已新增使用者");
      await newUser.save
        .then((savedUser: any) => {
          res.status(200).send({
            msg: "Successfully saved",
            savedObject: savedUser,
          });
        })
        .catch((err: Error) => {
          res.status(400).send(err);
        });
    })
    .catch((err: Error) => {
      res.status(400).send(err);
    });
});

// 本地端登入
router.get("/login", (req: Request, res: Response) => {
  console.log(req);
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
