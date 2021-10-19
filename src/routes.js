import "./styles/global.css";
import { useContext, useState } from "react";
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
import Clients from "./pages/Clients";
import Charges from "./pages/Charges";
import AddCharges from "./pages/AddCharges";
import Rundown from "./pages/Rundown";
import Sidebar from "./components/Sidebar";
import ProfileIcon from "./components/ProfileIcon";
import { AuthContext } from "./contexts/auth";
import { EditProfileContext } from "./contexts/editProfile";
import { LoadingContext } from "./contexts/loadingContext";
import { ResponseContext } from "./contexts/response";
import { ClientsArrayContext } from "./contexts/clientsArray";
import { ClientDetailsContext } from "./contexts/clientDetails";
import { ChargesArrayContext } from "./contexts/chargesArray";
import { RundownTypeContext } from "./contexts/rundownType";
import { RundownDetailTypeContext } from "./contexts/rundownDetailType";

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
  const [rundownType, setRundownType] = useState("clients");
  const [rundownDetailType, setRundownDetailType] = useState("inadimplentes");

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
                  <RundownTypeContext.Provider
                    value={{ rundownType, setRundownType }}
                  >
                    <RundownDetailTypeContext.Provider
                      value={{ rundownDetailType, setRundownDetailType }}
                    >
                      <Router>
                        <Switch>
                          <Route path="/login" component={SignIn} />
                          <Route path="/cadastro" component={SignUp} />
                          <ProtectedRoutes>
                            <Sidebar>
                              <ProfileIcon>
                                <Route path="/" exact component={Home} />
                                <Route
                                  path="/relatorio"
                                  exact
                                  component={Rundown}
                                />
                                <Route
                                  path="/clientes"
                                  exact
                                  component={Clients}
                                />
                                <Route
                                  path="/clientes/adicionar"
                                  exact
                                  component={AddClient}
                                />
                                <Switch>
                                  <Route
                                    path="/cobrancas"
                                    exact
                                    component={Charges}
                                  />

                                  <Redirect
                                    exact
                                    from="/cobrancas/reload"
                                    to="/cobrancas"
                                  />
                                </Switch>
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
                    </RundownDetailTypeContext.Provider>
                  </RundownTypeContext.Provider>
                </ChargesArrayContext.Provider>
              </ClientDetailsContext.Provider>
            </ClientsArrayContext.Provider>
          </ResponseContext.Provider>
        </LoadingContext.Provider>
      </EditProfileContext.Provider>
    </AuthContext.Provider>
  );
}
