// 載入 mongose
import mongoose from "mongoose";

// build  user schema
const userSchema = new mongoose.Schema({
  username: { required: true, type: String },
  googleId: { required: false, type: String },
  githubId: { required: false, type: String },
  lineId: { required: false, type: String },
  dacebookId: { required: false, type: String },
});

// 賦予給DB的名稱
export default mongoose.model("User", userSchema); // build User model
