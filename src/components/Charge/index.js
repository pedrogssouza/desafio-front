import "./styles.css";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Backdrop, makeStyles } from "@material-ui/core";
import useApi from "../../services/useApi";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import trash from "../../assets/trash.svg";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flex",
  },
  container: {
    width: "70%",
    height: "min-content",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "32px 0",
    borderRadius: 16,
  },
}));

export default function ChargeComponent(props) {
  const [editCharge, setEditCharge] = useState(false);
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

  props = {
    ...props,
    editCharge,
    setEditCharge,
  };

  return (
    <div
      className="charges-grid client mt-lg"
      onClick={() => {
        setEditCharge(true);
      }}
    >
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
      <p>{new Date(props.vencimento).toLocaleDateString().substr(0, 10)}</p>
      <EditCharge {...props} />
    </div>
  );
}

function EditCharge(props) {
  const classes = useStyles();
  const { clientsDisplay } = useContext(ClientsArrayContext);
  const [deleteCharge, setDeleteCharge] = useState(false);
  const [buttonOn, setButtonOn] = useState(false);
  const [inputDescription, setInputDescription] = useState(
    props.descricao || ""
  );
  const [inputValue, setInputValue] = useState(
    Number(props.valor / 100).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }) || ""
  );
  const [inputDate, setInputDate] = useState(
    new Date(props.vencimento).toISOString().substr(0, 10)
  );

  const { editChargeFunction, getClientsFunction } = useApi();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (inputDescription && inputValue && inputDate) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputDescription, inputValue, inputDate]);

  useEffect(() => {
    getClientsFunction();
  }, []);

  console.log(props);
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.editCharge}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={classes.container}>
        <form
          className="clients-form add-charges-form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            // editChargeFunction(data, props.id_cobranca);
          })}
        >
          <div>
            <div className="mb-sm ml-sm">
              <label htmlFor="id">Cliente</label>
            </div>
            {clientsDisplay.length !== 0 ? (
              <select
                id="dropdown"
                placeholder="Selecione o cliente"
                {...register("cliente_id")}
                defaultValue={props.id}
                required
              >
                {clientsDisplay.map((client) => (
                  <option value={client.id} className="select-items">
                    {client.nome}
                  </option>
                ))}
              </select>
            ) : (
              <select>
                <option></option>
              </select>
            )}
          </div>
          <div className="mb-sm ml-sm mt-lg">
            <label htmlFor="descricao">Descrição</label>
          </div>
          <input
            id="descricao"
            placeholder="Referente ao pagamento da compra online."
            {...register("descricao")}
            required
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          <div className="mb-sm ml-sm">
            <label htmlFor="status">Status</label>
          </div>
          <select
            {...register("status")}
            id="status"
            placeholder="Referente ao pagamento da compra online."
            defaultValue={props.status}
            required
          >
            <option value={false} className="select-items">
              Pendente
            </option>
            <option value={true} className="select-items">
              Pago
            </option>
          </select>
          <div className="flex-row">
            <div className="mr-lg">
              <div className="mb-sm ml-sm mt-lg">
                <label htmlFor="valor">Valor</label>
              </div>
              <input
                id="valor"
                placeholder="32,50"
                {...register("valor")}
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="vencimento">
              <div className="mb-sm ml-sm mt-lg">
                <label htmlFor="vencimento">Vencimento</label>
              </div>
              <input
                id="vencimento"
                {...register("vencimento")}
                type="date"
                required
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
          </div>
          <div className="span-delete flex-row items-center">
            <div
              className="flex-row items-center"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteCharge(!deleteCharge);
              }}
            >
              <img src={trash} />
              <span className="delete-charge">Excluir cobrança</span>
            </div>
            {deleteCharge ? (
              <div className="flex-column delete-charge-div ml-md items-center content-center">
                <p className="mt-sm">Apagar item?</p>
                <div className="flex-row mb-sm mt-sm">
                  <button className="delete-charge-button blue-delete">
                    Sim
                  </button>
                  <button
                    className="delete-charge-button red-delete ml-sm"
                    onClick={() => setDeleteCharge(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex-row mt-md">
            <button
              className="btn-white cancelar"
              onClick={(e) => {
                e.stopPropagation();
                props.setEditCharge(false);
              }}
            >
              Cancelar
            </button>
            <button
              className={buttonOn ? `btn-pink on ml-lg` : `btn-pink off ml-lg`}
              type="submit"
            >
              Editar cobrança
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}
