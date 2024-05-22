import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Nav from "../component/Nav";
import TeamCard from "../component/TeamCard";

function Hero() {
  return (
    <>
      <div className="hero">
        <Nav />
        <header
          style={{
            background: `url("/home.png")`,
            backgroundSize: "cover",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <h1
            style={{ fontFamily: "Playfair Display, serif", fontSize: "86px" }}
          >
            NOURISHIFY
          </h1>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              maxWidth: "350px",
              textAlign: "center",
            }}
          >
            Temukan masakan lezat dan momen tak terlupakan di surga kuliner kami
            yang ramah.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/login" className="btn_gs">
              Get Started
            </Link>

            <button style={{ fontFamily: "DM Sans, sans-serif" }}>About</button>
          </div>
        </header>

        <main>
          <div
            style={{
              display: "flex",
              padding: "5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="about1.png" alt="about" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "4rem",
              }}
            >
              <h1
                style={{
                  fontFamily: "Playfair Display, serif",
                  textAlign: "center",
                  fontSize: "3rem",
                }}
              >
                About
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  lineHeight: "1.8",
                  textAlign: "center",
                }}
              >
                Nourishify adalah sebuah website yang dibuat untuk memastikan
                dan mengelola data siswa yang berhak menerima makanan dari
                sekolah, sehingga siswa mendapatkan nutrisi yang cukup. Aplikasi
                ini tidak hanya membantu dalam pencatatan dan distribusi
                makanan, tetapi juga memfasilitasi pemantauan yan lebih akurat
                dan responsif terhadap kebutuhan siswa.
              </p>
            </div>
          </div>
          <div>
            <h1
              style={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
                fontSize: "3rem",
              }}
            >
              Our Team
            </h1>
          </div>
          <div
            style={{
              padding: "5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TeamCard
              imageUrl={"pc1.jpg"}
              nama={"Ridwan Ahmad Fauzan"}
              jabatan={"Project Manager"}
            />
            <TeamCard
              imageUrl={"pc2.jpg"}
              nama={"Reski Firmansyah"}
              jabatan={"Software Architecture"}
            />
            <TeamCard
              imageUrl={"pc3.jpg"}
              nama={"Rd Imam"}
              jabatan={"QA Tester"}
            />
            <TeamCard
              imageUrl={"pc4.JPG"}
              nama={"Siti Jahro Maulidiyah"}
              jabatan={"UI/UX Designer"}
            />
            <TeamCard
              imageUrl={"pc5.PNG"}
              nama={"Teuku Muhammad Saif"}
              jabatan={"Back-end Depelover"}
            />
            <TeamCard
              imageUrl={"foto.jpg"}
              nama={"Wildan Sophal Jamil"}
              jabatan={"Front-end Depelover"}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Hero;
