function Leaderboard({ usersList }) {
  const listItems = usersList.map((user, index) => {
    const rank = index + 1;

    return (
      <tr key={user.username}>
        <th scope="row">{rank}</th>
        <td>{user.username}</td>
        <td>{user.totalTime}</td>
        <td>{user.totalAttempts}</td>
      </tr>
    );
  });

  return (
    <div className="leaderboard text-center my-5 border border-warning rounded border-3">
      <h2 className="pb-4 mt-3 border-bottom border-warning border-3">
        Users Leaderboard
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Username</th>
            <th scope="col">Total Time (in sec)</th>
            <th scope="col">Total Attempts</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
