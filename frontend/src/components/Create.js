import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const Create = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const email = location.state ? location.state.email : null;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    fetch("https://finn-bhvk.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "error") {
          throw result.error;
        }

        // Registration successful
        history.push("/login");
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
        <p className="title">Create Profile</p>
        <p className="welcome-message">
          Thank you for choosing our platform. To ensure the security of your
          account, we kindly request you to create a username and password.
          <br /> <br />
          We recommend choosing a username that is easy for you to remember, but
          difficult for others to guess.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Username"
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

          {password.length > 0 && password.length < 8 && (
            <div className="badge rounded-pill bg-danger" id="formError">
              The password should be <br /> at least 8 characters long.
            </div>
          )}

          {password.length >= 8 && !isPending && (
            <button className="submit">Create Profile</button>
          )}
          {password.length < 8 && !isPending && (
            <button className="submit" disabled>
              Create Profile
            </button>
          )}

          {isPending && (
            <button className="submit" disabled>
              Creating....
            </button>
          )}
        </form>

        <div className="additional-action">
          <Link to="/login" className="linkStyle">
            <p>Already have an account? Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
