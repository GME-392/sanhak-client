import React, { useEffect } from "react";
//Global Style
import GlobalStyle from "./components/GlobalStyle";
//Import Pages
import About from "./pages/About";
import Group from "./pages/Group";
import Nav from "./components/Nav";
import Rank from "./pages/Rank";
import Login from "./pages/Login";
import Register from "./pages/Register";
//Router
import { Switch, Route, useLocation } from "react-router-dom";
//Animation
import { AnimatePresence } from "framer-motion";
import "./style/app.scss";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { checkSignedIn, onLoginSuccess } from "./redux/actions/actions";
import { Auth } from "aws-amplify";

function App() {
  const location = useLocation();
  const isSignedIn = useSelector((state) => state.AppState.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
    console.log(isSignedIn);
  }, [isSignedIn]);

  const checkUser = async () => {
    try {
      const { username } = await Auth.currentAuthenticatedUser();
      if (username) {
        dispatch(onLoginSuccess(username));
      }
      console.log("username: ", username);
      // dispatch(checkSignedIn(username));
    } catch (err) {}
  };

  return (
    <div className="App">
      <GlobalStyle />

      <Nav />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <About />
          </Route>
          <Route path="/group" exact>
            <Group />
          </Route>
          <Route path="/rank" exact>
            <Rank />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
