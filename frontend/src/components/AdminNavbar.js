import { Link, useHistory } from "react-router-dom";

const AdminNavbar = () => {

  const history = useHistory();
  const logoutHandler = () => {

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.setItem('isAuthenticated', JSON.stringify(false));

    // Redirect to home.
    history.push("/");
  };

  return (
    <nav className="navbar pt-2 px-5 mx-5">
      <h1 className="ps-5 ms-5">Admin Dashboard</h1>
      <div className="links d-inline-flex pe-5 me-5">
        <Link to="/">Home </Link>
        <button onClick={logoutHandler} className="ms-4 btn btn-outline-danger">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
