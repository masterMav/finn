import { setupGame } from "./utils/gameSetup";
import { useEffect } from "react";
import RunImage from "../images/Run.png";
import BackgroundImage from "../images/background.png";
import CaveImage from "../images/cave.png";
import LvlCompletedImage from "../images/lvlCompleted.png";
import CompassImage from "../images/compass.png";
import ArrowKeysImage from "../images/arrowKeys2.png";
import SpacebarImage from "../images/spacebar2.png";

const Game = () => {
  useEffect(() => {
    setupGame();
  }, []);

  document.body.style.backgroundColor = "#e7e8d1";

  return (
    <div className="game">
      {/* Game window & its images. */}
      <canvas id="canvas1"></canvas>
      <img id="playerImage" src={RunImage} alt="sprites" />
      <img id="backgroundImage" src={BackgroundImage} alt="backgroundImage" />
      <img id="caveImage" src={CaveImage} alt="caveImage" />
      <img id="lvlCompletedImage" src={LvlCompletedImage} alt="lvlImage" />

      {/* Navbar */}
      <div className="px-4 pt-2 pb-3 navMenu container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="display-6 fw-bold col-sm-4 text-center">
            finn's adventure
          </div>
          <div className="col-sm-4 pt-3 px-5 fw-bold text-left">
            <i className="bi bi-box-arrow-right px-1"></i>
            Logout
          </div>
        </div>
      </div>
      <div className="center-line"></div>

      {/* Sidebar */}
      <div className="sidebar">
        <img className="pb-5 ps-3" src={CompassImage} alt="" />
        <p id="mov">Player Movement:</p>
        <img src={ArrowKeysImage} alt="" />
        <p className="pt-4">Pause/Show Hints:</p>
        <img src={SpacebarImage} id="spacebarImage" alt="" />
      </div>
    </div>
  );
};

export default Game;
