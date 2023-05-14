export function calculateAvgTime(users, noOfUsers) {
  let totalTime = 0;
  // calculate

  users.forEach((user) => {
    user.gamedata.forEach((level) => {
      // time taken for each level.
      totalTime += Math.floor(level.elapsedTime / 1000);

      // penalty time.
      totalTime += 30 * (level.tries - 1);
    });
  });
  // return avg.

  return Math.floor(totalTime / noOfUsers);
}

export function calculateAvgAttempts(users, noOfUsers) {
  let totalAttempts = 0;

  users.forEach((user) => {
    user.gamedata.forEach((level) => {
      totalAttempts += level.tries;
    });
  });
  // return avg.

  return Math.floor(totalAttempts / (noOfUsers * 7));
}

export function calculateTimewise(users, noOfUsers) {
  let avgTimeArray = [0, 0, 0, 0, 0, 0, 0];
  let data = [];

  users.forEach((user) => {
    user.gamedata.forEach((level, index) => {
      avgTimeArray[index] += level.elapsedTime + 30000 * (level.tries - 1);
    });
  });

  avgTimeArray.forEach((val, index) => {
    data.push({ level: index, time: val / (noOfUsers * 1000) });
  });

  return data;
}

export function calculateTries(users, noOfUsers) {
  let avgTriesArray = [0, 0, 0, 0, 0, 0, 0];
  let data = [];

  users.forEach((user) => {
    user.gamedata.forEach((level, index) => {
      avgTriesArray[index] += level.tries;
    });
  });

  avgTriesArray.forEach((val, index) => {
    data.push({ level: index, attempts: val / noOfUsers });
  });

  return data;
}

export function calculateRanklist(users) {
  let data = [];
  users.forEach((user) => {
    let totalTime = 0,
      totalAttempts = 0;
    user.gamedata.forEach((level) => {
      totalTime += level.elapsedTime + 30000 * (level.tries - 1);
      totalAttempts += level.tries;
    });

    totalTime /= 1000;

    data.push({
      username: user.username,
      totalTime: (Math.floor(totalTime * 100) / 100).toFixed(2),
      totalAttempts,
    });
  });

  data.sort((a, b) => a.totalTime - b.totalTime);
  return data;
}
