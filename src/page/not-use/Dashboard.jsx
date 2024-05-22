import { useState } from "react";
import Footer from "../../component/Footer";
import Logo from "../../component/Logo";
import MenuCard from "../../component/MenuCard";
import Nav from "../../component/Nav";

function Dashboard() {
  const [selected, setSelected] = useState(0);

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
            isSelected={selected == 1}
            imageUrl={"nasgor.jpg"}
            nama={"Menu 1"}
            detail={"Nasi Goreng, Telur, Kerupuk"}
            stok={"Stok: 50 Porsi"}
            onClick={() => {
              setSelected("1");
            }}
          />
          <MenuCard
            id="2"
            imageUrl={"nasikangkung.jpg"}
            isSelected={selected == 2}
            nama={"Menu 2"}
            detail={"Nasi, Tumis Kangkung, Ayam Goreng"}
            stok={"Stok: 50 Porsi"}
            onClick={() => {
              setSelected("2");
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
            >
              klaim
            </button>{" "}
            <button
              style={{ fontFamily: "DM Sans, sans-serif", margin: "1rem" }}
              onClick={() => {
                setSelected(0);
              }}
            >
              batal
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
export default Dashboard;
