function Leaderboard() {
  const usersList = [
    { username: "mav", attempts: 1, totalTime: 300 },
    { username: "jet", attempts: 3, totalTime: 305 },
    { username: "git", attempts: 2, totalTime: 120 },
    { username: "foo", attempts: 6, totalTime: 560 },
    { username: "bar", attempts: 99, totalTime: 890 },
  ];

  const listItems = usersList.map((user, index) => {
    const rank = index + 1;

    return (
      <tr key={user.username}>
        <th scope="row">{rank}</th>
        <td>{user.username}</td>
        <td>{user.totalTime}</td>
        <td>{user.attempts}</td>
      </tr>
    );
  });

  return (
    <div className="leaderboard text-center mt-5 border border-warning rounded border-5">
      <h2 className="pb-4 mt-3 border-bottom border-warning border-5">Users Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Username</th>
            <th scope="col">Total Time</th>
            <th scope="col">Total Attempts</th>
          </tr>
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
