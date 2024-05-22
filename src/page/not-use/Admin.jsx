import { Link } from "react-router-dom";
import Logo from "../../component/Logo";

function Admin() {
  return (
    <>
      <div className="signin">
        <header>
          <Logo />
        </header>
        <main>
          <div>
            <h2>Sign In Admin</h2>
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <Link to="/admindashboard" className="btn_gs">
              Login
            </Link>
            <p>Or</p>
            <button>Sign In With Google</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Admin;
