import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">JobSphere</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Job Feed</Link>
        <Link to="/create-job">Create Job</Link>
      </div>
    </nav>
  );
};

export default Navbar;
