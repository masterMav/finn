import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>finn's adventure</h2>
      <div className="links">
        <Link to="/">Home </Link>
        <Link to="/login" id="loginLink">Login</Link>
        <Link to="/register" id="regLink">/Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
