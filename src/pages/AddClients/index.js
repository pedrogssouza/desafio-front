import { useHistory } from "react-router";
import ClientForm from "../../components/ClientForm";
import useApi from "../../services/useApi";
import "./styles.css";

export default function AddClient() {
  const { addClientFunction } = useApi();
  const history = useHistory();

  function closeButton() {
    history.push("/clientes");
  }

  return (
    <div className="clients-content flex-column">
      <h1 className="mb-md">ADICIONAR CLIENTE</h1>
      <ClientForm
        button={"Adicionar cliente"}
        function={addClientFunction}
        closeButton={closeButton}
      />
    </div>
  );
}
