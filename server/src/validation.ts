// 驗證資料格式的正確性
const Joi = require("joi");
import { RegisterUser, LoginUser } from "../src/types";

// 註冊的格式
const registerValidation = (data: RegisterUser) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    // .pattern(new RegExp("\b[w]+@[0-9a-zA-Z]"))
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(4).max(10).required(),
  });
  return schema.validate(data);
};

// 登入的格式
const loginValidation = (data: LoginUser) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(4).max(10).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
