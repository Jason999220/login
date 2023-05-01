import React, { useState } from "react";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleEmail = (event: any) => {
    setRegisterEmail(event.target.value);
  };
  const handleUserName = (event: any) => {
    setRegisterName(event.target.value);
  };
  const handlePassword = (event: any) => {
    setRegisterPassword(event.target.value);
  };
  return (
    <div className="flex" style={{ marginTop: "2rem" }}>
      {/* 本地端註冊 */}
      <div className="local">
        <input
          className="useremail"
          type="email"
          placeholder="Enter your email  "
          required
          onChange={handleEmail}
        />
        <input
          className="username"
          type="text"
          placeholder="Enter your name "
          required
          onChange={handleUserName}
        />
        <input
          className="userpassword"
          type="password"
          placeholder="Enter your password "
          required
          onChange={handlePassword}
        />
        <button type="submit" className="submit">
          sumbit
        </button>
      </div>
    </div>
  );
}
