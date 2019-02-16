import React, { Component, Suspense, lazy } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import "./App.css";

import PageLoader from "./components/PageLoader";
import * as userService from "./Services/userService";
import ContentWrapper from "./components/ContentWrapper";

const NavBar = lazy(() => import("./components/NavBar"));
const HomePage = lazy(() => import("./components/HomePage"));
const RouteMap = lazy(() => import("./components/routemap"));
const Login = lazy(() => import("./components/AuthFlow/Login"));
const Register = lazy(() => import("./components/AuthFlow/Register"));
const Logout = lazy(() => import("./components/AuthFlow/Logout"));
const DingCreate = lazy(() => import("./components/Dings/DingCreate"));
const MyDings = lazy(() => import("./components/Dings/MyDings"));

const listofAnonymousPages = [
  "/goodbye",
  "/login",
  "/register",
  "/recover",
  "/forgot",
  "/reset"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthorized: false,
      lastLogin: null,
      currentUser: {}
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  static getDerivedStateFromProps(props) {
    const locationState = props.location.state;
    if (locationState) {
      if (locationState.action === "USERLOGIN") {
        let state = { ...locationState };
        state.action = null;
        props.history.replace({
          state
        });
        return {
          userAuthorized: true,
          lastLogin: Date()
        };
      } else if (locationState.action === "USERLOGOUT") {
        let state = { ...locationState };
        state.action = null;
        props.history.replace({
          state
        });
        return {
          userAuthorized: false,
          lastLogin: null,
          currentUser: {}
        };
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userAuthorized !== this.state.userAuthorized) {
      this.getContent();
    }
    if (prevState.lastLogin !== this.state.lastLogin) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = () => {
    userService
      .getCurrent()
      .then(this.onGetCurrentSuccess)
      .catch(this.onGetCurrentFail);
  };

  onGetCurrentSuccess = data => {
    console.log("Current User: ", data);
    this.setState({
      userAuthorized: true,
      currentUser: data.item
    });
  };

  onGetCurrentFail = err => {
    console.error(err);
    this.setState({
      userAuthorized: false,
      currentUser: {}
    });
    if (listofAnonymousPages.indexOf(this.props.location.pathname) > -1) {
      return;
    }
    this.props.history.push("/login?return=" + this.props.location.pathname);
  };

  onLogoutSuccess = () => {
    this.getCurrentUser();
  };

  onLogoutFail(err) {
    console.log(err);
  }

  render() {
    let content = null;
    if (listofAnonymousPages.indexOf(this.props.location.pathname) > -1) {
      content = (
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <ContentWrapper>
              <Route
                path="/login"
                exact
                render={props => (
                  <Login
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
              <Route
                path="/register"
                exact
                render={props => (
                  <Register
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
            </ContentWrapper>
          </Switch>
        </Suspense>
      );
    } else {
      content = this.getContent();
    }
    return content;
  }

  getContent = () => {
    let content = null;
    if (this.state.userAuthorized) {
      content = (
        <Suspense fallback={<PageLoader />}>
          <ContentWrapper>
            <Route
              path="/"
              render={props => (
                <NavBar {...props} userAuthorized={this.state.userAuthorized} />
              )}
            />
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <HomePage
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
              <Route
                path="/login"
                exact
                render={props => (
                  <Login
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
              <Route
                path="/logout"
                exact
                render={props => <Logout {...props} />}
              />

              <Route
                path="/ding/new"
                exact
                render={props => (
                  <DingCreate
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />

              <Route
                path="/mydings"
                exact
                render={props => <MyDings {...props} />}
              />

              <Route
                path="/register"
                exact
                render={props => (
                  <Register
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
              <Route
                path="/myroute"
                exact
                render={props => (
                  <RouteMap
                    {...props}
                    userAuthorized={this.state.userAuthorized}
                  />
                )}
              />
            </Switch>
          </ContentWrapper>
        </Suspense>
      );
    } else {
      content = <PageLoader />;
    }
    return content;
  };
}

export default withRouter(App);
