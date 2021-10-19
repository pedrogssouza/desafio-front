import "./styles.css";
import { useForm } from "react-hook-form";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import { ChargesArrayContext } from "../../contexts/chargesArray";
import search from "../../assets/search.svg";
import { useContext, useEffect } from "react";
import useApi from "../../services/useApi";

export default function SearchComponent(props) {
  const { setClientsDisplay } = useContext(ClientsArrayContext);
  const { setChargesDisplay } = useContext(ChargesArrayContext);
  const { getFilteredClientsFunction, getFilteredChargesFunction } = useApi();
  const { handleSubmit, register } = useForm();

  async function searchFunction(data) {
    const clientsSaved = await getFilteredClientsFunction();
    const chargesSaved = await getFilteredChargesFunction();
    const filter = data.busca.toLowerCase();

    if (props.type === "clients") {
      if (!filter) {
        setClientsDisplay(clientsSaved);
        return;
      }
      setClientsDisplay(
        clientsSaved.filter(
          (client) =>
            client.email.toLowerCase().includes(filter) ||
            client.nome.toLowerCase().includes(filter)
        )
      );
    } else if (props.type === "charges") {
      if (!filter) {
        setChargesDisplay(chargesSaved);
        return;
      }
      setChargesDisplay(
        chargesSaved.filter(
          (charge) =>
            charge.email.toLowerCase().includes(filter) ||
            charge.nome.toLowerCase().includes(filter) ||
            charge.cpf.toLowerCase().includes(filter)
        )
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(searchFunction)}
      className="search-component flex-row items-center mb-xl"
    >
      <input
        {...register("busca")}
        placeholder="Procurar por Nome, E-mail ou CPF"
      />
      <button className="flex-row" type="submit">
        <img src={search} />
        <p>BUSCAR</p>
      </button>
    </form>
  );
}
