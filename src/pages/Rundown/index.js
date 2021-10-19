import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChargeComponent from "../../components/Charge";
import ClientComponent from "../../components/Client";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import SearchComponent from "../../components/SearchComponent";
import { ChargesArrayContext } from "../../contexts/chargesArray";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import { RundownDetailTypeContext } from "../../contexts/rundownDetailType";
import { RundownTypeContext } from "../../contexts/rundownType";
import useApi from "../../services/useApi";
import "./styles.css";

export default function Rundown() {
  const { clientsDisplay } = useContext(ClientsArrayContext);
  const { chargesDisplay } = useContext(ChargesArrayContext);
  const { rundownType, setRundownType } = useContext(RundownTypeContext);
  const { rundownDetailType, setRundownDetailType } = useContext(
    RundownDetailTypeContext
  );
  const history = useHistory();
  const { getClientsFunction, getChargesFunction } = useApi();

  const [rundownTypeDropdown, setRundownTypeDropdown] = useState(false);
  const [rundownDetailTypeDropdown, setRundownDetailTypeDropdown] =
    useState(false);

  useEffect(() => {
    getClientsFunction();
    getChargesFunction();
  }, []);

  if (rundownType === "clients") {
    return (
      <div className="clients-content">
        <div className="flex-row clients-header mt-lg">
          <div className="flex-row set-rundown">
            <div>
              <p onClick={() => setRundownTypeDropdown(!rundownTypeDropdown)}>
                Clientes
              </p>
              {rundownTypeDropdown ? (
                <div className="rundown-dropdown flex-column content-center items-center ">
                  <p
                    onClick={() => {
                      setRundownType("clients");
                    }}
                    className="active"
                  >
                    Clientes
                  </p>
                  <p
                    onClick={() => {
                      setRundownType("charges");
                    }}
                  >
                    Cobranças
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <span className="ml-md mr-md active">{">"}</span>
            <div>
              <p
                onClick={() =>
                  setRundownDetailTypeDropdown(!rundownDetailTypeDropdown)
                }
              >
                {rundownDetailType === "em dia" ? "Em dia" : "Inadimplentes"}
              </p>
              {rundownDetailTypeDropdown ? (
                <div className="rundown-dropdown flex-column content-center items-center ">
                  <p
                    onClick={() => {
                      setRundownDetailType("em dia");
                      setRundownDetailTypeDropdown(false);
                    }}
                    className={rundownDetailType === "em dia" ? "active" : ""}
                  >
                    Em Dia
                  </p>
                  <p
                    onClick={() => {
                      setRundownDetailType("inadimplentes");
                      setRundownDetailTypeDropdown(false);
                    }}
                    className={
                      rundownDetailType === "inadimplentes" ? "active" : ""
                    }
                  >
                    Inadimplentes
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <SearchComponent type="clients" />
        </div>
        <div className="clients-display-details">
          <p>Cliente</p>
          <p>Cobranças Feitas</p>
          <p>Cobranças Recebidas</p>
          <p>Status</p>
        </div>
        {clientsDisplay.map((client) => (
          <ClientComponent {...client} />
        ))}
        <LoadingComponent />
        <ResponseComponent />
      </div>
    );
  } else if (rundownType === "charges") {
    return (
      <div className="charges-content">
        <div className="flex-row charges-search">
          <SearchComponent type="charges" />
        </div>
        <div className="charges-display-details">
          <p>ID</p>
          <p>Cliente</p>
          <p>Descrição</p>
          <p>Valor</p>
          <p>Status</p>
          <p>Vencimento</p>
        </div>
        {chargesDisplay.length !== 0
          ? chargesDisplay.map((charge) => (
              <ChargeComponent {...charge} key={charge.id_cobranca} />
            ))
          : ``}
        <LoadingComponent />
        <ResponseComponent />
      </div>
    );
  }
}
