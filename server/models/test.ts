// 載入 mongose
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// build google user schema
const googleUserSchema = new Schema({
  username: String,
  googleId: String,
  password: String,
});

// 賦予給DB的名稱
const googleUser = mongoose.model("googleUser", googleUserSchema); // build google model
