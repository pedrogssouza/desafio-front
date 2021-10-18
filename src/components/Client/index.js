import "./styles.css";
import { Backdrop, makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import edit from "../../assets/edit-icon.svg";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import ClientForm from "../ClientForm";
import useApi from "../../services/useApi";
import ClientDetailing from "../ClientDetails";
import { ClientDetailsContext } from "../../contexts/clientDetails";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flow-root",
  },
  container: {
    width: "70%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function ClientComponent(props) {
  const [editClient, setEditClient] = useState(false);
  const [clientDetailing, setClientDetailing] = useState(false);
  const { getClientDetailsFunction } = useApi();

  return (
    <div
      onClick={async () => {
        await getClientDetailsFunction(props.id);
        setClientDetailing(true);
      }}
      className="clients-grid client mt-lg"
    >
      <div className="client-details flex-column">
        <h3 className="mb-sm">{props.nome}</h3>
        <p className="flex-row mb-sm">
          <img src={mail} alt="email" className="mr-sm" />
          {props.email}
        </p>
        <p className="flex-row">
          <img src={phone} alt="telefone" className="mr-sm" />
          {props.telefone}
        </p>
      </div>
      <p className="flex-row">
        {Number(props.valor_total_cobrancas_feitas / 100).toLocaleString(
          "pt-br",
          {
            style: "currency",
            currency: "BRL",
          }
        )}
      </p>
      <p className="flex-row">
        {Number(props.valor_total_cobrancas_recebidas / 100).toLocaleString(
          "pt-br",
          {
            style: "currency",
            currency: "BRL",
          }
        )}
      </p>
      <p
        className={
          props.status === "em dia"
            ? `em-dia client-status flex-row items-center`
            : `inadimplente client-status flex-row items-center`
        }
      >
        <p>{props.status}</p>
        <img
          className="mr-md edit-client"
          src={edit}
          onClick={async (e) => {
            e.stopPropagation();
            await getClientDetailsFunction(props.id);
            setEditClient(true);
          }}
        />
      </p>
      <EditClient
        editClient={editClient}
        setEditClient={setEditClient}
        id={props.id}
      />
      {clientDetailing ? (
        <ClientDetailing
          clientDetailing={clientDetailing}
          setClientDetailing={setClientDetailing}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function EditClient(props) {
  const classes = useStyles();
  const { editClientFunction } = useApi();
  const { setClientDetails } = useContext(ClientDetailsContext);

  return (
    <Backdrop
      className={classes.backdrop}
      open={props.editClient}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={classes.container}>
        <ClientForm
          button={"Editar Cliente"}
          closeButton={(e) => {
            e.stopPropagation();
            setClientDetails({});
            props.setEditClient(false);
          }}
          function={editClientFunction}
        />
      </div>
    </Backdrop>
  );
}
