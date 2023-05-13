import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar pt-2 px-5 mx-5">
      <h1 className="ps-5 ms-5">finn's adventure</h1>
      <div className="links pe-5 me-5">
        <Link to="/">Home </Link>
        <Link
          to={{
            pathname:
              "https://docs.google.com/document/d/1eDYfXd1SPbv8zvQhn6-eF_qDwDQayZX_TvLl_Ttg_s4/edit?usp=sharing",
          }}
          target="_blank"
        >
          About{" "}
        </Link>
        <Link to="/login" id="loginLink">
          Login{" "}
        </Link>
        <Link to="/register" id="regLink">
          | Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
