import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/NavbarHome";
import TeamCard from "../component/TeamCard";

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const studentToken = localStorage.getItem("token");
    const staffToken = localStorage.getItem("adminToken");

    if (!studentToken && !staffToken) {
      // Jika belum login, arahkan ke halaman login
      navigate("/login");
    } else if (studentToken && staffToken) {
      // Jika keduanya login, logout dari keduanya
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      navigate("/login");
    } else if (studentToken) {
      // Jika login sebagai student, arahkan ke dashboard student
      navigate("/dashboard");
    } else if (staffToken) {
      // Jika login sebagai staff, arahkan ke dashboard admin
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <div className="hero">
        <Navbar />
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
            <button className="btn_gs" onClick={handleGetStarted}>
              GET STARTED
            </button>
            {/* <button style={{ fontFamily: "DM Sans, sans-serif" }}>About</button> */}
          </div>
        </header>

        <main>
          <div
            id="about"
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
          <div id="our-team">
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
              jabatan={"Back-end Developer"}
            />
            <TeamCard
              imageUrl={"foto.jpg"}
              nama={"Wildan Sophal Jamil"}
              jabatan={"Front-end Developer"}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Hero;
