// src/component/NavbarStudent.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import "../style/Nav.css";

const NavbarStudent = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const auth = path.pathname === "/dashboard" || path.pathname === "/profile";
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem('token');
    // Redirect ke halaman login
    navigate('/');
  };

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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
          {auth ? (
            <button
              onClick={() => {
                setMenu(!menu);
              }}
            >
              Setting
            </button>
          ) : (
            <Link to="/admin/login" className="btn_gs">
              Admin Login
            </Link>
          )}
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
          <button
            style={{ border: 0, borderRadius: "4px", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NavbarStudent;
