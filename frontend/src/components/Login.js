import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
    fetch("https://finn-bhvk.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "error") {
          throw result.error;
        } else {
          localStorage.setItem("token", result.data);
        }

        setIsPending(false);
        setError("");

        // Login successful.
        setIsAuthenticated(true);
        
        // Store authentication status in local storage
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        
        if((username === "admin") || (username === "finn_1927@outlook.com"))
          history.push("/admin");
        else
          history.push("/game");
      })
      .catch((err) => {
        setIsPending(false);
        setError(err);
      });
  };

  return (
    <div className="l-login">
      <div className="login-container">
        <p className="title">Login</p>
        <p className="welcome-message">
          Please enter your login details to continue exploring our platform. If
          you're new here, click on the Sign Up button to create an account.
          Thank you for choosing us!
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Username/Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock"></i>
          </div>
          {error && <div className="badge rounded-pill bg-danger" id="formError">{error}</div>}
          {!isPending && <button className="submit">Login</button>}
          {isPending && (
            <button className="submit" disabled>
              Logging in....
            </button>
          )}
        </form>

        <div className="additional-action">
          <Link to="/register" className="linkStyle">
            <p>Need an account? Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
