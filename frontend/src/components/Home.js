import TreeImage from "../images/trees.png";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/register");
  };

  return (
    <div className="home">
      <div className="showcase">
        <h6 className=" mb-3 text-muted text-center">Legend has it,</h6>
        <p className="text-center fw-bold theQuote">
          Happiness is not the absence of problems; it's the ability to deal
          with them.
        </p>
        <h6 className="mt-1 text-muted text-center">
          and maybe I have a bunch of them for you to work on with a nice coffee
          on a good sunday evening. So Start now to atleast see something new
          today.
        </h6>
        <div className="text-center">
          <button
            type="button"
            className="mt-3 btn col-3 btn-lg text-light headButton"
            onClick={handleClick}
          >
            Start here
          </button>
        </div>
      </div>
      <img src={TreeImage} alt="treeImage" className="treeImage mt-5 pt-5" />
      <div className="text-center text-muted homeFooter">
        <div>
          Made with ❤️ by Manavkumar Patel.
          <a href="https://github.com/masterMav/finn">
            <p className="fa-brands fa-square-github ms-4 me-2 fs-4"></p>
          </a>
          <a href="https://www.linkedin.com/in/manavkumar-patel-69802b202/">
            <p className="fa-brands fa-linkedin fs-4"></p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
