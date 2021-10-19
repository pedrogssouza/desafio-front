import { useContext, useEffect, useState } from "react";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import useApi from "../../services/useApi";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import "./styles.css";

export default function AddCharges() {
  const history = useHistory();
  const { clientsDisplay } = useContext(ClientsArrayContext);
  const { register, handleSubmit } = useForm();
  const { getClientsFunction, addChargeFunction } = useApi();

  const [buttonOn, setButtonOn] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputDate, setInputDate] = useState();

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

  return (
    <div className="clients-content flex-column">
      <h1 className="mb-md">CRIAR COBRANÇA</h1>
      <div className="clients-container">
        <form
          className="clients-form add-charges-form"
          onSubmit={handleSubmit((data) => {
            const { id, ...dataSubmit } = data;

            addChargeFunction(dataSubmit, id);
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
                {...register("id")}
                defaultValue={clientsDisplay[0].id}
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
            defaultValue={false}
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
                type="number"
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
                placeholder="18 de Dezembro de 2020"
                {...register("vencimento")}
                type="date"
                required
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-row">
            <button
              className="btn-white cancelar"
              onClick={(e) => {
                e.stopPropagation();
                history.push("/cobrancas");
              }}
            >
              Cancelar
            </button>
            <button
              className={buttonOn ? `btn-pink on ` : `btn-pink off`}
              type="submit"
            >
              Criar cobrança
            </button>
          </div>
        </form>
      </div>
      <LoadingComponent />
      <ResponseComponent />
    </div>
  );
}
