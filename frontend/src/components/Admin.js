import AdminNavbar from "./AdminNavbar";
import AdminCards from "./AdminCards";
import LevelVsTime from "./LevelVsTime";
import LevelVsAttempts from "./LevelVsAttempts";
import Leaderboard from "./Leaderboard";

const Admin = () => {
  return (
    <div className="adminDashboard">
      <AdminNavbar />

      <AdminCards />

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-5 text-center border rounded border-3 p-3 me-2">
            <h2>Level Vs Time</h2>
            <LevelVsTime />
          </div>

          <div className="col-5 text-center border rounded border-3 p-3">
            <h2>Level Vs Attempts</h2>
            <LevelVsAttempts />
          </div>
        </div>
      </div>

      <Leaderboard />
    </div>
  );
};

export default Admin;
