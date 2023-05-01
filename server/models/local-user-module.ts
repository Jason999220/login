// 載入 mongose
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// build  user schema
const localUserSchema = new mongoose.Schema({
  // 本地端登入
  username: { required: true, type: String, minLength: 3, maxLength: 10 },
  email: { required: false, type: String, minLength: 3 },
  password: { required: true, type: String, minLength: 4, maxLength: 10 }, // 測試用
  hashPassword: { required: true, type: String, minLength: 4, maxLength: 1024 },
  date: { required: true, type: Date, default: Date.now },
});

// 預先處理密碼hash問題
localUserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.hashPassword = hash;
    next();
  } else {
    next();
  }
});

// 匹配密碼
localUserSchema.methods.comparePassword = function (
  password: string,
  callback: any
) {
  // 前者為未hash過的密碼
  bcrypt.compare(password, this.hashpassword, (err, isMatch) => {
    // if (err) {
    //   return callback(err, isMatch);
    // }
    // callback(null, isMatch);
    // 簡化成以下程式碼
    err ? callback(err, isMatch) : callback(null, isMatch);
  });
};
// 賦予給DB的名稱
export default mongoose.model("Local", localUserSchema); // build User model
