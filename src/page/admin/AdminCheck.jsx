import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminCheck() {
  const [nisn, setNisn] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menambahkan state untuk login
  const [errorMessage, setErrorMessage] = useState(""); // Menambahkan state untuk pesan kesalahan
  const navigate = useNavigate();

  // Data percobaan
  const validNisns = {
    "1217050121": { claimed: true },
    "1217050122": { claimed: false },
  };

  useEffect(() => {
    // Cek status login (misalnya dari localStorage atau state global)
    const loggedInStatus = localStorage.getItem("adminLoggedIn"); // Contoh menggunakan localStorage
    if (loggedInStatus) {
      setIsLoggedIn(true);
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleCheck = () => {
    if (validNisns[nisn]) {
      if (validNisns[nisn].claimed) {
        setErrorMessage("Jatah makan dengan NISN siswa tersebut sudah diambil hari ini!");
      } else {
        navigate("/admin/menu");
      }
    } else {
      setErrorMessage("NISN tidak valid!");
    }
  };

  if (!isLoggedIn) {
    return null; // Atau tampilkan loading spinner
  }

  return (
    <div>
      <h1>Check Kuota Siswa</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="NISN Siswa"
        value={nisn}
        onChange={(e) => setNisn(e.target.value)}
      />
      <button onClick={handleCheck}>Check</button>
    </div>
  );
}

export default AdminCheck;
