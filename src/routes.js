import "./styles/global.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Sidebar from "./components/Sidebar";
import ProfileIcon from "./components/ProfileIcon";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/auth";

function ProtectedRoutes(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
  );
}

export default function Routes() {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token || "";
  });
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/cadastro" component={SignUp} />
          <ProtectedRoutes>
            <Sidebar>
              <ProfileIcon>
                <Route path="/" exact component={Home} />
              </ProfileIcon>
            </Sidebar>
          </ProtectedRoutes>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
