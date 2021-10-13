import { useContext, useEffect, useState } from "react";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import useApi from "../../services/useApi";
import { useForm } from "react-hook-form";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import { isBefore } from "date-fns";
import "./styles.css";

export default function AddCharges() {
  const { clientsDisplay } = useContext(ClientsArrayContext);
  const { register, handleSubmit } = useForm();
  const { getClientsFunction, signUpChargeFunction } = useApi();

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

            const now = new Date();
            const expireDate = new Date(dataSubmit.vencimento);
            if (now.getTime() > expireDate.getTime()) {
              alert("Não é possível cadastrar uma data anterior à atual");
              return;
            }

            // signUpChargeFunction(dataSubmit, id);
          })}
        >
          <div>
            <div className="mb-sm ml-sm">
              <label htmlFor="id">Dropdown</label>
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
              ""
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
          />
          <div className="mb-sm ml-sm">
            <label htmlFor="status">Status</label>
          </div>
          <select
            {...register("status")}
            id="status"
            placeholder="Referente ao pagamento da compra online."
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
              />
            </div>
          </div>
          <div className="flex-row">
            <button className="btn-white cancelar">Cancelar</button>
            <button className="btn-pink on" type="submit">
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
