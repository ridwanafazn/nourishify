import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import MenuCard from "../../component/MenuCard";
import Nav from "../../component/Nav";

function AdminMenu() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleClaim = () => {
    // Logika klaim di sini
    navigate("/admin/check");
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <main style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            textAlign: "center",
            fontSize: "3rem",
          }}
        >
          Menu Hari Ini
        </h1>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            lineHeight: "1.8",
            textAlign: "center",
          }}
        >
          Pilih Menu Keinginan Anda Sesuai Dengan Ketersediaan Makanan
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <MenuCard
            id="1"
            isSelected={selected === 1}
            imageUrl={"nasgor.jpg"}
            nama={"Nasi Goreng"}
            detail={"Nasi dengan bumbu khas"}
            stok={"Stok: 10 Porsi"}
            onClick={() => {
              setSelected(1);
            }}
          />
          <MenuCard
            id="2"
            isSelected={selected === 2}
            imageUrl={"nasikangkung.jpg"}
            nama={"Nasi Kangkung"}
            detail={"Nasi, Tumis Kangkung, Ayam Goreng"}
            stok={"Stok: 8 Porsi"}
            onClick={() => {
              setSelected(2);
            }}
          />
        </div>
        {selected !== 0 && (
          <>
            <button
              style={{
                fontFamily: "DM Sans, sans-serif",
                margin: "1rem",
                backgroundColor: "#ad343e",
                color: "white",
              }}
              onClick={handleClaim}
            >
              Klaim
            </button>{" "}
            <button
              style={{ fontFamily: "DM Sans, sans-serif", margin: "1rem" }}
              onClick={() => {
                setSelected(0);
              }}
            >
              Batal
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminMenu;
