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
import AddClient from "./pages/AddClients";
import Sidebar from "./components/Sidebar";
import ProfileIcon from "./components/ProfileIcon";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/auth";
import { EditProfileContext } from "./contexts/editProfile";
import { LoadingContext } from "./contexts/loadingContext";
import { ResponseContext } from "./contexts/response";
import Clients from "./pages/Clients";
import { ClientsArrayContext } from "./contexts/clientsArray";
import { ClientDetailsContext } from "./contexts/clientDetails";
import Charges from "./pages/Charges";
import { ChargesArrayContext } from "./contexts/chargesArray";
import AddCharges from "./pages/AddCharges";

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
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [clientsDisplay, setClientsDisplay] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [chargesDisplay, setChargesDisplay] = useState([]);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <EditProfileContext.Provider value={{ editProfile, setEditProfile }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <ResponseContext.Provider value={{ response, setResponse }}>
            <ClientsArrayContext.Provider
              value={{ clientsDisplay, setClientsDisplay }}
            >
              <ClientDetailsContext.Provider
                value={{ clientDetails, setClientDetails }}
              >
                <ChargesArrayContext.Provider
                  value={{ chargesDisplay, setChargesDisplay }}
                >
                  <Router>
                    <Switch>
                      <Route path="/login" component={SignIn} />
                      <Route path="/cadastro" component={SignUp} />
                      <ProtectedRoutes>
                        <Sidebar>
                          <ProfileIcon>
                            <Route path="/" exact component={Home} />
                            <Route path="/clientes" exact component={Clients} />
                            <Route
                              path="/clientes/adicionar"
                              exact
                              component={AddClient}
                            />
                            <Route
                              path="/cobrancas"
                              exact
                              component={Charges}
                            />
                            <Route
                              path="/cobrancas/adicionar"
                              exact
                              component={AddCharges}
                            />
                          </ProfileIcon>
                        </Sidebar>
                      </ProtectedRoutes>
                    </Switch>
                  </Router>
                </ChargesArrayContext.Provider>
              </ClientDetailsContext.Provider>
            </ClientsArrayContext.Provider>
          </ResponseContext.Provider>
        </LoadingContext.Provider>
      </EditProfileContext.Provider>
    </AuthContext.Provider>
  );
}
