import Cave from "./caveClass.js";

export function displaySelectCaveText(context, plotX, plotY) {
  context.font = "20px Times New Roman";
  context.fillStyle = "black";
  context.fillText("Press ↓ to enter.", plotX + 5, plotY - 15);
}

export function displayLevelReport(
  context,
  canvas,
  level,
  elapsedTime,
  score,
  tries
) {
  context.fillStyle = "#E1F8DC";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "50px Times New Roman";
  context.fillStyle = "#027148";
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (level === 0) {
    context.fillText(
      "Tutorial completed!",
      canvas.width / 2,
      canvas.height / 2 - 130
    );
  } else if (score === 0) {
    context.fillText(
      `Level ${level} Failed!`,
      canvas.width / 2,
      canvas.height / 2 - 130
    );
  } else {
    context.fillText(
      level === 6 ? "Game Completed!" : `Level ${level} Completed!`,
      canvas.width / 2,
      canvas.height / 2 - 130
    );
  }

  context.font = "30px Times New Roman";

  context.fillText(
    `Time taken: ${getFormattedTime(elapsedTime)}`,
    canvas.width / 2,
    canvas.height / 2 - 60
  );

  context.fillText(
    `Accuracy: ${score}%`,
    canvas.width / 2,
    canvas.height / 2 - 10
  );

  context.fillText(
    `No. of attempts: ${tries}`,
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  context.fillText(
    level === 6
      ? `Press SPACEBAR to play again!`
      : `Press SPACEBAR to start next level!`,
    canvas.width / 2 + 8,
    canvas.height / 2 + 180
  );
}

export function gameStartMenu(context, canvas, background) {
  background.draw(context);
  context.font = "60px Times New Roman";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Click here to start!", canvas.width / 2, canvas.height / 2);
}

function getFormattedTime(elapsedTime) {
  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime - hours * 3600000) / 60000);
  let seconds = Math.floor(
    (elapsedTime - hours * 3600000 - minutes * 60000) / 1000
  );
  let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

export function displayStatusText(context, level, elapsedTime) {
  context.font = "25px Times New Roman";
  context.fillStyle = "black";
  const formattedTime = getFormattedTime(elapsedTime);
  context.fillText("Time: " + formattedTime, 40, 30);
  context.fillText(level ? `Level: ${level}` : `Tutorial Level`, 235, 30);
}

export function displayPausedMenu(canvas, context, level) {
  canvas.style.opacity = 0.7;

  context.font = "90px Times New Roman";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game Paused", canvas.width / 2, canvas.height / 2 - 70);

  context.font = "30px Times New Roman";
  context.fillText(
    "Press SPACEBAR to resume.",
    canvas.width / 2 + 5,
    canvas.height / 2 + 10
  );

  context.font = "24px Times New Roman";
  context.fillText(
    "Hint: " + displayClues(level),
    canvas.width / 2 + 5,
    canvas.height / 2 + 60
  );
}

export function cavesGenerator(level, canvas) {
  let caves = [];
  if (level === 0) {
    caves = [new Cave(canvas.width, canvas.height, 800)];
  } else if (level === 1) {
    caves = [
      new Cave(canvas.width, canvas.height, 400),
      new Cave(canvas.width, canvas.height, 615),
      new Cave(canvas.width, canvas.height, 830),
    ];
  } else if (level === 2) {
    caves = [
      new Cave(canvas.width, canvas.height, 350),
      new Cave(canvas.width, canvas.height, 485),
      new Cave(canvas.width, canvas.height, 618),
      new Cave(canvas.width, canvas.height, 753),
      new Cave(canvas.width, canvas.height, 884),
    ];
  } else if (level === 3) {
    caves = [
      new Cave(canvas.width, canvas.height, 350),
      new Cave(canvas.width, canvas.height, 610),
      new Cave(canvas.width, canvas.height, 870),
    ];
  } else if (level === 4) {
    caves = [
      new Cave(canvas.width, canvas.height, 350),
      new Cave(canvas.width, canvas.height, 610),
      new Cave(canvas.width, canvas.height, 870),
    ];
  } else if (level === 5) {
    caves = [
      new Cave(canvas.width, canvas.height, 350),
      new Cave(canvas.width, canvas.height, 610),
      new Cave(canvas.width, canvas.height, 870),
    ];
  } else {
    caves = [
      new Cave(canvas.width, canvas.height, 350),
      new Cave(canvas.width, canvas.height, 610),
      new Cave(canvas.width, canvas.height, 870),
    ];
  }
  return caves;
}

export function displayQuestion(context, level) {
  context.fillStyle = "black";

  if (level === 0) {
    context.font = "25px Times New Roman";

    context.fillText(
      "Welcome! all the game instructions are on your left.",
      40,
      85
    );
    context.fillText("Current Task: Go to the cave.", 40, 120);
  } else if (level === 1) {
    context.font = "25px Times New Roman";
    context.fillText("Which one is heavier?", 40, 85);

    context.font = "22px Times New Roman";
    context.fillText("A pound of Rocks.", 390, 420);
    context.fillText("A pound of Cotton.", 595, 420);
    context.fillText("None.", 865, 420);
  } else if (level === 2) {
    context.font = "25px Times New Roman";
    context.fillText("Find the odd one out?", 40, 85);

    context.font = "22px Times New Roman";
    context.fillText("First.", 390, 420);
    context.fillText("Second.", 513, 420);
    context.fillText("Third.", 660, 420);
    context.fillText("Forth.", 790, 420);
    context.fillText("Fifth.", 920, 420);
  } else if (level === 3) {
    context.font = "25px Times New Roman";

    context.fillText(
      "If six thousand six hundred and six dollar is written as $6,606,",
      40,
      85
    );
    context.fillText(
      "then write eleven thousand eleven hundred and eleven dollars?",
      40,
      120
    );

    context.fillText("$11111", 378, 420);
    context.fillText("$111111", 630, 420);
    context.fillText("$12111", 890, 420);
  } else if (level === 4) {
    context.font = "25px Times New Roman";
    context.fillText(
      "Mr. & Mrs. Smith went for a picnic. Mrs. Smith has 5 sons and",
      40,
      85
    );
    context.fillText(
      "each son has a sister who has 5 daughters each of whom have 1 brother each.",
      40,
      120
    );
    context.fillText("How many of them went for the picnic?", 40, 155);

    context.fillText("52 people", 368, 420);
    context.fillText("30 people", 630, 420);
    context.fillText("2 people", 890, 420);
  } else if (level === 5) {
    context.font = "25px Times New Roman";

    context.fillText(
      "If you are running in a race and you pass the person in the second place.",
      40,
      85
    );
    context.fillText("What place are you in?", 40, 120);

    context.fillText("First", 385, 420);
    context.fillText("Second", 637, 420);
    context.fillText("Third", 900, 420);
  } else {
    context.font = "25px Times New Roman";

    context.fillText(
      "If you are supposed to take pills at half an hour intervals,",
      40,
      85
    );
    context.fillText("how many minutes would 5 pills last?", 40, 120);

    context.fillText("150 mins.", 375, 420);
    context.fillText("180 mins.", 627, 420);
    context.fillText("120 mins.", 890, 420);
  }
}

export function calculateScore(level, selectedCave) {
  let score = 100;
  if (level === 0) {
    score = 100;
  } else if (level === 1) {
    score = selectedCave === 3 ? 100 : 0;
  } else if (level === 2) {
    score = selectedCave === 4 ? 100 : 0;
  } else if (level === 3) {
    score = selectedCave === 3 ? 100 : 0;
  } else if (level === 4) {
    score = selectedCave === 3 ? 100 : 0;
  } else if (level === 5) {
    score = selectedCave === 2 ? 100 : 0;
  } else {
    score = selectedCave === 3 ? 100 : 0;
  }
  return score;
}

export function displayClues(level) {
  let hint;
  if (level === 0) {
    hint = "Hints of the treasure hunt will be shown here!";
  } else if (level === 1) {
    hint = "1 pound = .45 Kg";
  } else if (level === 2) {
    hint = "Read carefully!";
  } else if (level === 3) {
    hint = "No blunders!";
  } else if (level === 4) {
    hint =
      "The names of the people who went for the picnic are provided in the question itself.";
  } else if (level === 5) {
    hint = "Who's behind you?";
  } else {
    hint = "Start from the beginning!";
  }

  return hint;
}
