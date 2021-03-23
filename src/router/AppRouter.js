import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  // Route,
  Switch,
} from "react-router-dom";
import { HomeScreen } from "../components/HomeScreen";
import { AnimalEdit } from "../components/AnimalEdit";
import { LoginScreen } from "../components/LoginScreen";
import { RegisterScreen } from "../components/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import { iniciarChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AnimalCreate } from "../components/AnimalCreate";
import { AnimalProfile } from "../components/AnimalProfile";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(iniciarChecking());
  }, [dispatch]);
  if (checking) {
    return <h4>CHOTTO MATTE KUDASAII!</h4>;
  }
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}
          />
          <PublicRoute
            exact
            path="/register"
            component={RegisterScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomeScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/animals/createanimal"
            component={AnimalCreate}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/animals/animalprofile"
            component={AnimalProfile}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/animals/editAnimal"
            component={AnimalEdit}
            isAuthenticated={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};
