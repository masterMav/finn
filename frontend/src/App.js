import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import NotFound from "./components/NotFound";
import Game from "./components/Game";
import Admin from "./components/Admin";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) ?? false
  );

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
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>

          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>

          <Route exact path="/create">
            <Navbar />
            <Create />
          </Route>

          <ProtectedRoute
            exact
            path="/game"
            component={Game}
            isAuthenticated={isAuthenticated}
          />

          <ProtectedRoute
            exact
            path="/admin"
            component={Admin}
            isAuthenticated={isAuthenticated} 
          />

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
