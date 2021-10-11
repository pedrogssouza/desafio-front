import { Backdrop, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { ClientDetailsContext } from "../../contexts/clientDetails";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import "./styles.css";

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

export default function ClientDetailing(props) {
  const classes = useStyles();
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  return (
    <Backdrop className={classes.backdrop} open={props.clientDetailing}>
      <div className={classes.container}>
        <div className="client-detailing">
          <div className="client-detailing-header flex-row items-center mb-md">
            <h1>{clientDetails.nome}</h1>
            <p
              onClick={(e) => {
                e.stopPropagation();
                setClientDetails({});
                props.setClientDetailing(false);
              }}
            >
              X
            </p>
          </div>
          <p className="mb-lg">{clientDetails.cpf}</p>
          <div className="client-detailing-info flex-row">
            <div className="client-infos">
              <div className="email-phone flex-row mb-md">
                <div className="flex-row">
                  <img src={mail} alt="email" className="mr-sm" />
                  <p>{clientDetails.email}</p>
                </div>
                <div className="flex-row">
                  <img src={phone} alt="phone" className="mr-sm" />
                  <p>{clientDetails.telefone}</p>
                </div>
              </div>
              <div className="flex-row mb-lg">
                <div className="mr-lg">
                  <h3>CEP</h3>
                  <p>{clientDetails.cep}</p>
                </div>
                <div className="mr-lg">
                  <h3>Estado</h3>
                  <p>{clientDetails.estado}</p>
                </div>
                <div className="mr-lg">
                  <h3>Cidade</h3>
                  <p>{clientDetails.cidade}</p>
                </div>
              </div>
              <div className="flex-row mb-lg">
                <div className="mr-lg">
                  <h3>Logradouro</h3>
                  <p>{clientDetails.logradouro}</p>
                </div>
                <div className="mr-lg">
                  <h3>Bairro</h3>
                  <p>{clientDetails.bairro}</p>
                </div>
              </div>
              <div className="mr-lg">
                <h3>Complemento</h3>
                <p>{clientDetails.complemento}</p>
              </div>
            </div>
            <hr></hr>
            <div className="client-charges-info">
              {/* {clientDetails.array.map((charge) => {})} */}
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

function ClientCharge(props) {
  return (
    <div className="flex-column">
      <div className="flex-row mb-sm">
        <p>
          <span className="client-charge-id">{props.id_cobranca}</span>
          {props.descricao}
        </p>
        <p className="client-charge-value">
          {Number(props.valor).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="flex-row">
        <p className="client-charge-date">{props.vencimento}</p>
        <p className="client-charge-status"></p>
      </div>
    </div>
  );
}
