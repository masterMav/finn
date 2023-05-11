import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import NotFound from "./components/NotFound";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>

          <Route exact path="/login">
            <Navbar />
            <Login />
          </Route>

          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>

          <Route exact path="/create">
            <Navbar />
            <Create />
          </Route>

          <Route exact path="/game">
            <Game />
          </Route>

          <Route path="*">
            <Navbar />
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
