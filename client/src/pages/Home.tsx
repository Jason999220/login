import React, { useContext } from "react";
import { MyContext } from "../components/Context";
import { IUser } from "../types/type";

export default function Home() {
  const userObj = useContext(MyContext) as IUser;
  console.log(
    "前端資料================================================================"
  );
  console.log(userObj);
  console.log(
    "前端資料================================================================"
  );
  return (
    <div className="home">
      {userObj ? (
        <h1>Welcome back {userObj.username} homepage</h1>
      ) : (
        <h1>Welcome to my website</h1>
      )}
    </div>
  );
}
