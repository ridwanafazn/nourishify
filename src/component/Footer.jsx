import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#474747",
        color: "white",
        padding: "2rem 5rem",
      }}
    >
      <Logo />
      <div
        style={{
          backgroundColor: "#474747",
          color: "white",
          display: "flex",
        }}
      >
        <p style={{ width: "50%", lineHeight: "1.5" }}>
          Makanan enak menyatukan orang-orang. Ketika orang terhubung saat
          makan, hal itu memberi mereka waktu untuk mengisi tenaga dan membangun
          hubungan dengan orang lain.
        </p>
        <ul
          style={{
            listStyle: "none",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <li>Phone</li>
          <li>Email</li>
          <li>Location</li>
        </ul>
      </div>
    </footer>
  );
}
