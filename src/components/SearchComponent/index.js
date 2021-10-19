import "./styles.css";
import { useForm } from "react-hook-form";
import { ClientsArrayContext } from "../../contexts/clientsArray";
import { ChargesArrayContext } from "../../contexts/chargesArray";
import search from "../../assets/search.svg";
import { useContext, useEffect, useRef } from "react";
import useApi from "../../services/useApi";

export default function SearchComponent(props) {
  const { setClientsDisplay } = useContext(ClientsArrayContext);
  const { setChargesDisplay } = useContext(ChargesArrayContext);
  const { getFilteredClientsFunction, getFilteredChargesFunction } = useApi();
  const { handleSubmit, register } = useForm();
  const searchRef = useRef("");

  async function searchFunction(data) {
    const clientsSaved = await getFilteredClientsFunction();
    const chargesSaved = await getFilteredChargesFunction();
    console.log(clientsSaved);
    console.log(data);
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
            client.nome.toLowerCase().includes(filter) ||
            client.cpf.toLowerCase().includes(filter)
        )
      );
      return;
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
      onSubmit={handleSubmit((data) => {
        data.busca = searchRef.current.value;
        searchFunction(data);
      })}
      className="search-component flex-row mb-xl"
      onClick={() => searchRef.current.focus()}
    >
      <div className="flex-row div-input-search-component">
        <input
          {...register("busca")}
          placeholder="Procurar por Nome, E-mail ou CPF"
          className="input-search-component"
          defaultValue=""
          ref={searchRef}
        />
      </div>
      <button
        className="flex-row button-search-component items-center"
        type="submit"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={search} className="mr-sm" />
        <p>BUSCAR</p>
      </button>
    </form>
  );
}
