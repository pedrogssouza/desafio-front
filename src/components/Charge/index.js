import "./styles.css";
import { format } from "date-fns";

export default function ChargeComponent(props) {
  function checkStatus(status) {
    const now = new Date();
    const expireDate = new Date(props.vencimento);

    if (status) {
      return "pago";
    } else if (now.getTime() > expireDate.getTime()) {
      return "vencido";
    } else {
      return "pendente";
    }
  }

  return (
    <div className="charges-grid client mt-lg">
      <p>
        <span className="charge-id">#{props.id_cobranca}</span>
      </p>
      <p>{props.nome}</p>
      <p>{props.descricao}</p>
      <p>
        {Number(props.valor / 100).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p>
        <span className={`charge-status ${checkStatus(props.status)}`}>
          {checkStatus(props.status)}
        </span>
      </p>
      <p>{format(new Date(props.vencimento), "MM/dd/yyyy")}</p>
    </div>
  );
}
