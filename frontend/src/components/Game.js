import { setupGame, getInterval } from "./utils/gameSetup";
import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import RunImage from "../images/Run.png";
import BackgroundImage from "../images/background.png";
import CaveImage from "../images/cave.png";
import LvlCompletedImage from "../images/lvlCompleted.png";
import CompassImage from "../images/compass.png";
import ArrowKeysImage from "../images/arrowKeys2.png";
import SpacebarImage from "../images/spacebar2.png";

const Game = () => {
  useLayoutEffect(() => {
    // Start the game after all assets are loaded.
    setupGame();

    // Cleanup function
    return () => {
      const gameInterval = getInterval();
      clearInterval(gameInterval);

      localStorage.removeItem("gameObj");
    };
  }, []);

  document.body.style.backgroundColor = "#e7e8d1";

  const history = useHistory();
  const logoutHandler = () => {
    // Clear localStorage
    localStorage.removeItem("token");

    // Restore to original CSS
    document.body.style.backgroundColor = "#fff";
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    history.push("/");
  };

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
          <div className="col-sm-2 pt-3 px-5 mx-5 fw-bold text-left">
            <button
              type="button"
              className="btn btn-sm btn-outline-dark"
              onClick={logoutHandler}
            >
              <i className="bi bi-box-arrow-right px-1"></i>Logout
            </button>
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
