import React, { createContext, useEffect, useState } from "react";
//Global Style
import GlobalStyle from "./components/GlobalStyle";
//Import Pages
import About from "./pages/About";
import Group from "./pages/Group";
import Nav from "./components/Nav/Nav";
import Rank from "./pages/Rank";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
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
import User from "./pages/User";
import GroupDetail from "./pages/GroupDetail";
import GroupStatistics from "./components/GroupStatistics/GroupStatistics";
import Guide from "./pages/Guide";
import Message from "./pages/Message";

export const DataContext = createContext();

function App() {
  const location = useLocation();
  const isSignedIn = useSelector((state) => state.AppState.isSignedIn);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkUser();
  }, [isSignedIn]);

  useEffect(() => {
    getUserData();
  }, [activeUser]);

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

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      setUserData(() => res.data);
    });
  };

  return (
    <div className="App">
      <GlobalStyle />

      <Nav />
      <DataContext.Provider value={{ userData: userData }}>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact>
              <About />
            </Route>
            <Route path="/group" exact>
              <Group />
            </Route>
            <Route path="/guide" exact>
              <Guide />
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

            <Route path="/forgot" exact>
              <Forgot />
            </Route>

            <Route path={`/message`}>
              <Message />
            </Route>

            <Route
              path={`/user/:username`}
              render={(props) => <User name={"chanmin"} {...props} />}
            />
            <Route path={`/group/:groupid`} exact render={(props) => <GroupDetail {...props} />} />
            {/* 
          <Route
            path={`/group/:groupid/info`}
            exact
            render={(props) => <GroupStatistics {...props} />}
          /> */}

            <Route path={`/user/:username`}>
              <User />
            </Route>
          </Switch>
        </AnimatePresence>
      </DataContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
