import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/" className="logo">
        Jason
      </Link>
      <ul className="nav-info">
        <Link to="/Register" className="nav-route ">
          Register
        </Link>
        <Link to="/Login" className="nav-route ">
          Login
        </Link>
        <Link to="/" className="nav-route ">
          Logout
        </Link>
      </ul>
    </nav>
  );
}
