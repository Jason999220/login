import React from "react";

// 利用 google、facebook登入
export default function Login() {
  return (
    <div className="login">
      <div className="wrapper">
        {/* 第三方登入 */}
        <div className="other-login">
          <div className="google login-box">
            {/* <img src="../imgs/googleIcon.png" alt="googleImg" /> */}
            <p>sign up with google</p>
          </div>
          <div className="facebook login-box">
            {/* <img src="../imgs/facebookIcon.png" alt="facebook" /> */}
            <p>sign up with facebook</p>
          </div>
          <div className="github login-box">
            {/* <img src="../imgs/facebookIcon.png" alt="facebook" /> */}
            <p>sign up with github</p>
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
