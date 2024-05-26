import { Link, useLoaderData, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import "../style/Nav.css";

export default function () {
  const path = useLocation();
  const auth = path.pathname == "/dashboard" ? true : false;
  const [menu, setMenu] = useState(false);
  return (
    <>
      <nav
        style={{
          fontFamily: "DM Sans, sans-serif",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 2rem",
        }}
      >
        <Logo />  
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "1rem",
            }}
          >
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#our-team">Our Team</a></li>
          </ul>
      
        </div>
      </nav>
      {auth && (
        <div
          style={{
            position: "absolute",
            display: menu ? "flex" : "none",
            gap: "0.25rem",
            flexDirection: "column",
            top: "64px",
            right: "32px",
            borderRadius: "4px",
            padding: "5px",
            backgroundColor: "silver",
          }}
        >
          <Link
            className="btn_editprofile"
            to="/editprofile"
            style={{ border: 0, borderRadius: "4px", cursor: "pointer" }}
          >
            Profile
          </Link>
          <button style={{ border: 0, borderRadius: "4px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}
