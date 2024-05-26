import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo";

function Signin() {
  const [nisn, setNisn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://nourishify-api.vercel.app/api/students/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nisn, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token ke localStorage
        localStorage.setItem('token', data.token);
        // Redirect ke dashboard
        navigate('/dashboard');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
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
            <h2>Student Sign In</h2>
            <input 
              type="text" 
              placeholder="NISN" 
              value={nisn} 
              onChange={(e) => setNisn(e.target.value)} 
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
              Bukan siswa? Login sebagai admin di halaman berikut  {" "}
              <Link to="/admin/login">ini</Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Signin;
