import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import { IUser } from "../types/type";

export default function NavBar() {
  // 使用 useContext判斷是否有使用者來限制nav的資料
  const userObj = useContext(MyContext) as IUser;

  const logout = () => {
    console.log("準備登出");
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
        Jason
      </Link>
      <ul className="nav-info">
        {userObj ? (
          <>
            {/* if have user */}
            <Link to="/Profile" className="nav-route ">
              Profile
            </Link>
            <div className="nav-route " onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <>
            {/* if no user */}
            <Link to="/Register" className="nav-route ">
              Register
            </Link>
            <Link to="/Login" className="nav-route ">
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
