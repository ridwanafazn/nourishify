import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Tambahkan logika autentikasi di sini
    if (username === "admin" && password === "password") { // Contoh autentikasi sederhana
      localStorage.setItem("adminLoggedIn", true);
      navigate("/admin/check");
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
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
  );
}

export default AdminSignin;
