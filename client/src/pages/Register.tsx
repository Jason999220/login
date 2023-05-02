import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthServices";
import { MyContext } from "../components/Context";

export default function Register() {
  const obj = useContext(MyContext);
  let userObj = obj;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const navigate = useNavigate();

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handleUserName = (event: any) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    await AuthService.register(email, username, password)
      .then((response: any) => {
        setErrorMessage(null);
        localStorage.setItem("userExist", JSON.stringify(response.data));
        window.alert("Congratulations! You have successfully registered");
        console.log(userObj);
        navigate("/profile");
      })
      .catch((err: any) => {
        // console.log(err.response.data);
        setErrorMessage(err.response.data);
      });
  };
  return (
    <div className="flex" style={{ marginTop: "2rem" }}>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
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
        <button type="submit" className="submit" onClick={handleSubmit}>
          sumbit
        </button>
      </div>
    </div>
  );
}
