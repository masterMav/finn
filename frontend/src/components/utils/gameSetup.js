import Player from "./playerClass";
import Background from "./backgroundClass";

import {
  displaySelectCaveText,
  gameStartMenu,
  cavesGenerator,
  displayStatusText,
  displayLevelReport,
  displayPausedMenu,
  displayQuestion,
  calculateScore,
} from "./displayUtil";

let interval;

function sendGamedata(gamedata) {
  const token = localStorage.getItem("token");

  fetch("https://finn-bhvk.onrender.com/api/update-gamedata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, gamedata }),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      if (result.status === "error") {
        throw result.error;
      } else {
        console.log(result.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getInterval() {
  return interval;
}

export function setupGame() {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 563;
  let isRefreshed = false;

  let gameObj = {
    score: 100,
    isPaused: false,
    elapsedTime: 0,
    lastTime: Date.now(),
    gameStarted: 0,
    selectedCave: 0,
    level: 0,
    tries: 1,
    interval: 0,
    pX: 0,
    pY: 435,
    arr: [],
  };

  for (let i = 0; i < 7; i++) gameObj.arr.push({ elapsedTime: 0, tries: 0 });

  const localStorageGameObj = localStorage.getItem("gameObj");
  if (localStorageGameObj !== undefined && localStorageGameObj !== null) {
    try {
      gameObj = JSON.parse(localStorageGameObj);
    } catch (error) {
      console.error("Error parsing gameObj from localStorage:", error);
    }
    isRefreshed = true;
  } else {
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
  }

  // Main variables
  let score = gameObj.score; // 100% initially then gets reduced depending on the type of level.
  let isPaused = gameObj.isPaused;
  interval = gameObj.interval;
  let elapsedTime = gameObj.elapsedTime;
  let lastTime = gameObj.lastTime;
  let gameStarted = gameObj.gameStarted; // 0 = not started, 1 = started.
  let selectedCave = gameObj.selectedCave;
  let level = gameObj.level;
  let caves = cavesGenerator(level, canvas);
  let tries = gameObj.tries;
  let pX = gameObj.pX;
  let pY = gameObj.pY;
  let arr = gameObj.arr;

  // Pause & Resume functions
  function pauseGame() {
    clearInterval(interval);
    isPaused = true;
    gameObj.isPaused = isPaused;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
    displayPausedMenu(canvas, ctx, level);
  }

  function resumeGame() {
    // Reset canvas, lastTime and text-alignments.
    lastTime = Date.now();
    gameObj.lastTime = lastTime;
    isPaused = false;
    gameObj.isPaused = isPaused;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
    canvas.style.opacity = 1;
    interval = setInterval(runGame, RENDER_INTERVAL);
    gameObj.interval = interval;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
  }

  function resetGame() {
    clearInterval(interval);
    isPaused = true;
    gameObj.isPaused = isPaused;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));

    // Calculate score
    score = calculateScore(level, selectedCave);
    gameObj.score = score;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));

    // Display Level report
    displayLevelReport(ctx, canvas, level, elapsedTime, score, tries);

    // Reset game states:
    if (score === 100) {
      arr[level] = { elapsedTime, tries };
      tries = 1;
      level++;
      elapsedTime = 0;

      if (level > 6) sendGamedata(gameObj.arr);
    } else {
      tries++;
    }
    gameObj.arr = arr;
    gameObj.tries = tries;
    gameObj.level = level;
    gameObj.elapsedTime = elapsedTime;
    score = 100;
    gameObj.score = score;
    player.x = 0;
    gameObj.pX = player.x;
    selectedCave = 0;
    gameObj.selectedCave = selectedCave;
    caves = cavesGenerator(level, canvas);
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
  }

  // Records keyboard input
  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }

        // cave selection
        if (e.key === "ArrowDown" && selectedCave) {
          gameObj.selectedCave = selectedCave;
          localStorage.setItem("gameObj", JSON.stringify(gameObj));

          resetGame();
        }
      });

      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }

        // pause instantiation
        if (e.key === " " && gameStarted === 1) {
          if (level > 6) {
            gameStartMenu(ctx, canvas, background);
            level = 0;
            gameObj.level = level;
            gameStarted = 0;
            gameObj.gameStarted = gameStarted;
            localStorage.setItem("gameObj", JSON.stringify(gameObj));

            caves = cavesGenerator(level, canvas);
          } else if (isPaused) resumeGame();
          else pauseGame();
        }
      });

      canvas.addEventListener("click", (e) => {
        if (gameStarted === 0) {
          gameStarted = 1;
          gameObj.gameStarted = gameStarted;
          localStorage.setItem("gameObj", JSON.stringify(gameObj));

          resumeGame();
        }
      });
    }
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height, pX, pY);
  const background = new Background(canvas.width, canvas.height);
  const gameFPS = 80;
  const RENDER_INTERVAL = 1000 / gameFPS;

  if (isRefreshed) {
    if (isPaused) pauseGame();
    else resumeGame();
  }

  // Game start MENU
  if (gameStarted === 0) gameStartMenu(ctx, canvas, background);

  function runGame() {
    // Optimize GPU usage by rendering slower.
    const deltaTime = Date.now() - lastTime;
    if (deltaTime < RENDER_INTERVAL) {
      return;
    }
    elapsedTime += deltaTime;
    gameObj.elapsedTime = elapsedTime;
    lastTime = Date.now();
    gameObj.lastTime = lastTime;

    // Clear previous image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw new image
    background.draw(ctx);
    caves.forEach((cave) => {
      cave.draw(ctx);
    });
    player.draw(ctx);
    displayStatusText(ctx, level, elapsedTime);
    displayQuestion(ctx, level);

    // Detect player & cave intersection.
    for (let i = 0; i < caves.length; i++) {
      if (
        player.onGround() &&
        player.x >= caves[i].x - 60 &&
        player.x <= caves[i].x - 9
      ) {
        displaySelectCaveText(ctx, caves[i].x, caves[i].y);
        selectedCave = i + 1;
      }
    }

    // Player movements.
    player.update(input, deltaTime);
    gameObj.pX = player.x;
    gameObj.pY = player.y;
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
  }
}
