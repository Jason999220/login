import React, { useContext } from "react";
import { MyContext } from "../components/Context";
import { IUser } from "../types/type";

export default function Profile() {
  const userObj = useContext(MyContext) as IUser;
  return (
    <div>
      {userObj ? (
        <>
          <img src={userObj.thumbnail} alt="thumbnail" />
          <div>username : {userObj.username}</div>
          {userObj.email ? <div>userEmail : {userObj.email}</div> : null}
          <div>userID : {userObj._id}</div>
        </>
      ) : (
        <h1>You must login</h1>
      )}
    </div>
  );
}
