import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import "../style/Nav.css";

const NavbarStaff = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const auth = path.pathname === "/admin/check" || path.pathname === "/admin/manage" || path.pathname === "/admin/dashboard";
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    // Hapus token admin dari local storage
    localStorage.removeItem('adminToken');
    // Redirect ke halaman home
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
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/manage">Manage</Link></li>
          </ul>
          {auth && (
            <button
              style={{ fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavbarStaff;
