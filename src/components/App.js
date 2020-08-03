import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import PitchApp from "./pitchApp/PitchApp";
import store from "../redux/store";
import * as ReactRedux from "react-redux";
import Callback from "./callback/Callback";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import Auth from "../Auth/auth";
import Profile from "./profile/Profile";
import "../styles/main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
    console.log("history type", typeof this.props.history);
  }

  render() {
    return (
      <ReactRedux.Provider store={store}>
        <div className="container-fluid">
          <Header auth={this.auth} {...this.props} />
          <Switch>
            <Route exact path="/" component={PitchApp} />
            <Route
              path="/profile"
              render={(props) =>
                this.auth.isAuthenticated() ? (
                  <Profile auth={this.auth} {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/callback"
              render={(props) => <Callback auth={this.auth} {...props} />}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </ReactRedux.Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
