import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../component/Logo";

function AdminSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Tambahkan logika autentikasi di sini
    if (username === "admin" && password === "password") {
      // Contoh autentikasi sederhana
      localStorage.setItem("adminLoggedIn", true);
      navigate("/admin/check");
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <>
      <div className="signin">
        <header>
          <Logo />
        </header>
        <main>
          <div>
            <h2>Admin Sign In</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
           
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminSignin;
