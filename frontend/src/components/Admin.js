import AdminNavbar from "./AdminNavbar";
import AdminCards from "./AdminCards";
import LevelVsTime from "./LevelVsTime";
import LevelVsAttempts from "./LevelVsAttempts";
import Leaderboard from "./Leaderboard";
import { useState, useEffect } from "react";
import {
  calculateAvgTime,
  calculateAvgAttempts,
  calculateTimewise,
  calculateTries,
  calculateRanklist,
} from "./utils/adminUtils";

const Admin = () => {
  const [error, setError] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [avgTime, setAvgTime] = useState("");
  const [avgAttempts, setAvgAttempts] = useState("");
  const [timewise, setTimewise] = useState([]);
  const [tries, setTries] = useState([]);
  const [ranklist, setRanklist] = useState([]);

  useEffect(() => {
    // send request

    fetch("https://finn-bhvk.onrender.com/api/gamedata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === "error") {
          throw result.error;
        }

        // Restore states
        setError("");

        // Fetched gamedata successfully.
        setNoOfUsers(result.users.length);
        setAvgTime(calculateAvgTime(result.users, result.users.length));
        setAvgAttempts(calculateAvgAttempts(result.users, result.users.length));
        setTimewise(calculateTimewise(result.users, result.users.length));
        setTries(calculateTries(result.users, result.users.length));
        setRanklist(calculateRanklist(result.users));
      })
      .catch((err) => {
        // Fetching errors.

        setError(err);
      });
  }, []);

  return (
    <div className="adminDashboard">
      <AdminNavbar />
      {error && (
        <div className="badge rounded-pill bg-danger" id="formError">
          {error}
        </div>
      )}

      {noOfUsers && (
        <AdminCards
          noOfUsers={noOfUsers}
          avgTime={avgTime}
          avgAttempts={avgAttempts}
        />
      )}

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-5 text-center border rounded border-3 p-3 me-2">
            <h2>Time Vs Levels</h2>
            {timewise.length !== 0 && <LevelVsTime data={timewise} />}
          </div>

          <div className="col-5 text-center border rounded border-3 p-3">
            <h2>Attempts Vs Levels</h2>
            {tries.length !== 0 && <LevelVsAttempts data={tries} />}
          </div>
        </div>
      </div>

      {ranklist && <Leaderboard usersList={ranklist} />}
    </div>
  );
};

export default Admin;
