import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 Page not found.</h2>
      <Link to="/" className = "linkStyle">Back to HomePage...</Link>
    </div>
  );
};

export default NotFound;
