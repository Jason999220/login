import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import { IUser } from "../types/type";
import Logo from "./Logo";
import AuthService from "../services/AuthServices";

export default function NavBar() {
  // 使用 useContext判斷是否有使用者來限制nav的資料
  const userObj = useContext(MyContext) as IUser;

  const logout = () => {
    // AuthService.logout();
    // window.alert("Logout successfully, now you are redirect to the homepage.");
    // 代替以下程式碼
    axios
      .get("http://localhost:8000/auth/logout", { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data) {
          console.log("已登出");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <ul className="nav-info">
        {userObj ? (
          <>
            {/* if have user */}
            <Link to="/Profile" className="nav-route ">
              Profile
            </Link>
            <Link to="/" className="nav-route " onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            {/* if no user */}
            <Link to="auth/Register" className="nav-route ">
              Register
            </Link>
            <Link to="auth/Login" className="nav-route ">
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
