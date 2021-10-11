import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import ClientComponent from "../../components/Client";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import useApi from "../../services/useApi";
import "./styles.css";

export default function Clients(props) {
  const { getClientsFunction } = useApi();
  const history = useHistory();
  const { clientsDisplay } = useContext(ClientsArrayContext);

  useEffect(() => {
    getClientsFunction();
  }, []);

  return (
    <div className="clients-content">
      <button
        className="btn-white mb-xl"
        onClick={() => history.push("/clientes/adicionar")}
      >
        Adicionar cliente
      </button>
      <div className="clients-display-details">
        <p>Cliente</p>
        <p>Cobranças Feitas</p>
        <p>Cobranças Recebidas</p>
        <p>Status</p>
      </div>
      {clientsDisplay.length !== 0
        ? clientsDisplay.map((client) => <ClientComponent {...client} />)
        : ""}
      <LoadingComponent />
      <ResponseComponent />
    </div>
  );
}
