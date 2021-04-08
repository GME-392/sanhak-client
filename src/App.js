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
import { checkSignedIn, onLoginSuccess } from "./redux/actions/authActions";
import { getUserAction } from "./redux/actions/userActions";
import { Auth } from "aws-amplify";
import { USER_ENDPOINT } from "./constants/URL";
import axios from "axios";

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
        // 엔드포인트 요청 = 유저 정보 불러오기
        try {
          await axios
            .get(`${USER_ENDPOINT}/userid=${username}&funcname=getUser`)
            .then((data) => dispatch(getUserAction(data)));
        } catch (err) {
          console.error(err);
        }
      }
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
