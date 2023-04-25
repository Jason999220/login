import React from "react";
import Google from "../imgs/google.png";
import Facebook from "../imgs/facebook.png";
import Github from "../imgs/github.png";
import Line from "../imgs/line.png";

// 利用 google、facebook登入
export default function Login() {
  return (
    <div className="login">
      <div className="wrapper">
        {/* 第三方登入 */}
        <div className="other-login">
          <div className="google login-box">
            <img src={Google} alt="" />
            <p>Login with google</p>
          </div>
          <div className="facebook login-box">
            <img src={Facebook} alt="" />
            <p>Login with facebook</p>
          </div>
          <div className="github login-box">
            <img src={Github} alt="" />
            <p>Login with github</p>
          </div>
          <div className="line login-box">
            <img src={Line} alt="" />
            <p>Login with Line</p>
          </div>
        </div>
        <div className="or">OR</div>
        {/* 本地端登入 */}
        <div className="local">
          <input
            className="username"
            type="text"
            placeholder="UserName"
            required
          />
          <input
            className="userpassword"
            type="password"
            placeholder="UserPassword"
            required
          />
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
