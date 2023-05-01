// 載入 mongose
import mongoose from "mongoose";

// build  user schema
const otherUserSchema = new mongoose.Schema({
  // 第三方登入
  username: { required: true, type: String },
  date: { required: true, type: Date, default: Date.now },
  thumbnail: { required: true, type: String }, //  頭像縮圖
  email: { required: false, type: String },
  googleId: { required: false, type: String },
  githubId: { required: false, type: String },
  lineId: { required: false, type: String },
  facebookId: { required: false, type: String },
});

// 賦予給DB的名稱
export default mongoose.model("Other", otherUserSchema); // build User model
