import "./styles/global.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Sidebar from "./components/Sidebar";
import ProfileIcon from "./components/ProfileIcon";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/cadastro" component={SignUp} />
        <Sidebar>
          <ProfileIcon>
            <Route path="/" exact component={Home} />
          </ProfileIcon>
        </Sidebar>
      </Switch>
    </Router>
  );
}
