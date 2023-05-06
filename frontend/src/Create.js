import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Create = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { email } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
    fetch("https://finn-bhvk.onrender.com/api/register", {
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
      })
      .catch((err) => {
        setIsPending(false);
        setError(err);
      });
  };

  return (
    <div className="l-login">
      <div className="login-container">
        <p className="title">Create</p>
        <p className="welcome-message">
          Thank you for choosing our platform. To ensure the security of your
          account, we kindly request you to create a username and password.
          <br /> <br />
          We recommend choosing a username that is easy for you to remember, but
          difficult for others to guess.
        </p>

        {email}
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
          {error && (
            <div className="badge rounded-pill bg-danger" id="formError">
              {error}
            </div>
          )}
          {!isPending && <button className="submit">Create</button>}
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

export default Create;
