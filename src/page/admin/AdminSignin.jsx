import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../component/Logo";

function AdminSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://nourishify-api.vercel.app/api/staff/staff-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.msg || "Username atau password salah");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
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
            <button className="btn_gs" onClick={handleLogin}>
              Login
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Bukan staff kantin? Login sebagai siswa di halaman berikut{" "}
              <Link to="/login"> ini</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminSignin;
