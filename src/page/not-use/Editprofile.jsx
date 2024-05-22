import { Link } from "react-router-dom";
import Logo from "../../component/Logo";

function Editprofile() {
  return (
    <>
      <div className="editprofile">
        <header>
          <Logo />
        </header>
        <main>
          <div>
            <h2>Edit Profile</h2>
            <input type="text" placeholder="Nama" />
            <input type="text" placeholder="Nisn" />
            <input type="Email" placeholder="Email Adress" />
            <input type="text" placeholder="Nomor Telepon" />
            <button className="btn1">Save</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Editprofile;
