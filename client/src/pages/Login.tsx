import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { MyContext } from "../components/Context";

import Google from "../imgs/google.png";
import Facebook from "../imgs/facebook.png";
import Github from "../imgs/github.png";
import Line from "../imgs/line.png";

// 利用 google、facebook登入
export default function Login() {
  // usecontext
  // const obj = useContext(MyContext);
  // console.log(obj.setUserObj);

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const navigate = useNavigate();

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
  const handleEmail = (event: any) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    AuthServices.login(email, password)
      .then((result) => {
        console.log(result);
        window.alert(
          "Congratulations !! " +
            result.data.findUser.username +
            " successfully login"
        );
        navigate("/profile");
      })
      .catch((err) => {
        // console.log(err.response.data);
        setErrorMessage(err.response.data);
      });
  };
  return (
    <div className="login">
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
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
            className="email"
            type="text"
            placeholder="email"
            required
            onChange={handleEmail}
          />
          <input
            className="userpassword"
            type="password"
            placeholder="UserPassword"
            required
            onChange={handlePassword}
          />
          <button type="submit" className="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
