import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Google from "../imgs/google.png";
import Facebook from "../imgs/facebook.png";
import Github from "../imgs/github.png";
import Line from "../imgs/line.png";

// 利用 google、facebook登入
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const googleLogin = () => {
    // navigate("/auth/google");
    window.open("http://localhost:8000/auth/google", "_self");
  };
  const facebookLogin = () => {
    // navigate("/auth/google");
    window.open("http://localhost:8000/auth/facebook", "_self");
  };
  const githubLogin = () => {
    // navigate("/auth/google");
    window.open("http://localhost:8000/auth/github", "_self");
  };
  const lineLogin = () => {
    // navigate("/auth/google");
    window.open("http://localhost:8000/auth/line", "_self");
  };
  const handleUserName = (event: any) => {
    // console.log(event.target.value);
    setUserName(event.target.value);
  };
  const handlePassword = (event: any) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };
  return (
    <div className="login">
      <div className="wrapper">
        {/* 第三方登入 */}
        <div className="other-login">
          <div className="google login-box" onClick={googleLogin}>
            <img src={Google} alt="" />
            <p>Login with google</p>
          </div>
          <div className="facebook login-box" onClick={facebookLogin}>
            <img src={Facebook} alt="" />
            <p>Login with facebook</p>
          </div>
          <div className="github login-box" onClick={githubLogin}>
            <img src={Github} alt="" />
            <p>Login with github</p>
          </div>
          {/* <Link to="/auth/github">Login with github</Link> */}
          <div className="line login-box" onClick={lineLogin}>
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
            onChange={handleUserName}
          />
          <input
            className="userpassword"
            type="password"
            placeholder="UserPassword"
            required
            onChange={handlePassword}
          />
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
