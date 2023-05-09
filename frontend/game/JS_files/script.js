import Player from "./playerClass.js";
import Background from "./backgroundClass.js";

import {
  displaySelectCaveText,
  gameStartMenu,
  cavesGenerator,
  displayStatusText,
  displayLevelReport,
  displayPausedMenu,
  displayQuestion,
  calculateScore,
  displayClues,
} from "./displayUtil.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  // Main variables
  canvas.width = 1000;
  canvas.height = 563;
  let score = 100; // 100% initially then gets reduced depending on the type of level.
  let isPaused = true;
  let interval;
  let elapsedTime = 0;
  let lastTime = Date.now();
  let gameStarted = 0; // 0 = not started, 1 = started.
  let selectedCave = 0;
  let level = 0;
  let caves = cavesGenerator(level, canvas);
  let tries = 1;

  // Pause & Resume functions
  function pauseGame() {
    clearInterval(interval);
    isPaused = true;
    displayPausedMenu(canvas, ctx, level);
  }

  function resumeGame() {
    // Reset canvas, lastTime and text-alignments.
    lastTime = Date.now();
    isPaused = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
    canvas.style.opacity = 1;
    interval = setInterval(runGame, RENDER_INTERVAL);
  }

  function resetGame() {
    clearInterval(interval);
    isPaused = true;

    // Calculate score
    score = calculateScore(level, selectedCave);

    // Display Level report
    displayLevelReport(ctx, canvas, level, elapsedTime, score, tries);

    // Reset game states:
    if (score === 100) {
      tries = 1;
      level++;
    } else {
      tries++;
    }
    elapsedTime = 0;
    score = 100;
    player.x = 0;
    selectedCave = 0;
    caves = cavesGenerator(level, canvas);
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
        if (e.key === " " && gameStarted) {
          if (level > 6) {
            gameStartMenu(ctx, canvas, background);
            level = 0;
            gameStarted = 0;
            caves = cavesGenerator(level, canvas);
          } else if (isPaused) resumeGame();
          else pauseGame();
        }
      });

      canvas.addEventListener("click", (e) => {
        if (!gameStarted) {
          gameStarted = 1;
          resumeGame();
        }
      });
    }
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  const gameFPS = 80;
  const RENDER_INTERVAL = 1000 / gameFPS;

  // Game start MENU
  gameStartMenu(ctx, canvas, background);

  function runGame() {
    // Optimize GPU usage by rendering slower.
    const deltaTime = Date.now() - lastTime;
    if (deltaTime < RENDER_INTERVAL) {
      return;
    }
    elapsedTime += deltaTime;
    lastTime = Date.now();

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
    // displayClues(level);

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
  }
});
