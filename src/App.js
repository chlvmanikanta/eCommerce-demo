import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Payment from "./pages/Payment";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/details/1234">About</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/details/:id">
              <Details />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/payment">
              <Payment />
            </Route>
            <Route path="*">
              <>
                <h2>Page Not Found</h2>
              </>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
