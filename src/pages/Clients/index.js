import { useHistory } from "react-router";

export default function Clients(props) {
  const history = useHistory();
  return (
    <div className="clients-content">
      <button
        className="btn-white mb-xl"
        onClick={() => history.push("/clientes/adicionar")}
      >
        Adicionar cliente
      </button>
    </div>
  );
}
