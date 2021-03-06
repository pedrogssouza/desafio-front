import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientDetailsContext } from "../../contexts/clientDetails";
import { ResponseContext } from "../../contexts/response";
import { maskCpf, testCpf } from "../../services/cpf";
import getDataByCep from "../../services/viaCep";
import LoadingComponent from "../Loading";
import ResponseComponent from "../ResponseConfirmation";
import "./styles.css";

export default function ClientForm(props) {
  const { setResponse } = useContext(ResponseContext);
  const { clientDetails } = useContext(ClientDetailsContext);
  const { handleSubmit, register } = useForm();
  const [buttonOn, setButtonOn] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCpf, setInputCpf] = useState("");
  const [inputCep, setInputCep] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputBairro, setInputBairro] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputUf, setInputUf] = useState("");
  const [inputComplement, setInputComplement] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  useEffect(() => {
    if (!clientDetails.cpf) {
      return;
    }
    setInputName(clientDetails.nome);
    setInputEmail(clientDetails.email);
    setInputCpf(maskCpf(clientDetails.cpf) || "");
    setInputCep(clientDetails.cep);
    setInputStreet(clientDetails.logradouro);
    setInputBairro(clientDetails.bairro);
    setInputCity(clientDetails.cidade);
    setInputUf(clientDetails.estado);
    setInputComplement(clientDetails.complemento);
    setInputPhone(clientDetails.telefone);
  }, [clientDetails]);

  useEffect(() => {
    if (inputName && inputEmail && inputCpf) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputEmail, inputName, inputCpf]);

  async function loadDataByCep(cep) {
    if (cep) {
      const data = await getDataByCep(cep);
      setInputCity(data.localidade);
      setInputStreet(data.logradouro);
      setInputUf(data.uf);
      setInputBairro(data.bairro);
      return;
    }

    setInputCity("");
    setInputStreet("");
    setInputUf("");
    setInputBairro("");
  }

  useEffect(() => {
    if (!inputCep) {
      loadDataByCep("");
      return;
    }
    if (inputCep.indexOf("-") !== -1) {
      if (inputCep.length === 9) {
        loadDataByCep(inputCep);
      }
      return;
    }
    if (inputCep.length === 8) {
      loadDataByCep(inputCep);
    }
  }, [inputCep]);

  return (
    <div className="clients-container">
      <form
        className="clients-form flex-column "
        onSubmit={handleSubmit((data) => {
          if (!testCpf(inputCpf.replaceAll(".", "").replace("-", ""))) {
            setResponse({
              data: "CPF inv??lido",
              type: "error",
            });
            return;
          }

          props.function(data);

          setInputName("");
          setInputEmail("");
          setInputCpf("");
          setInputCep("");
          setInputStreet("");
          setInputBairro("");
          setInputCity("");
          setInputUf("");
          setInputComplement("");
          setInputPhone("");
        })}
      >
        <div className="clients-input-container flex-column">
          <label htmlFor="name" className="clients-form-label">
            Nome
          </label>
          <input
            id="name"
            {...register("nome")}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="clients-input-container flex-column">
          <label className="clients-form-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            value={inputEmail}
            {...register("email", { required: true })}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="exemplo@gmail.com"
          />
        </div>
        <div className="flex-row gap">
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="cpf-client">
              CPF
            </label>
            <input
              maxLength="14"
              id="cpf-client"
              value={inputCpf}
              placeholder="222.222.222-22"
              {...register("cpf", { required: true })}
              onChange={(e) => {
                setInputCpf(maskCpf(e.target.value));
              }}
            />
          </div>
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="phone-client">
              Telefone
            </label>
            <input
              id="phone-client"
              {...register("telefone")}
              placeholder="(71)99333-2222"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-row gap">
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              maxLength="9"
              {...register("cep")}
              placeholder="20100-300"
              value={inputCep}
              onChange={(e) => {
                setInputCep(e.target.value);
              }}
            />
          </div>
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="logradouro">
              Logradouro
            </label>
            <input
              id="logradouro"
              {...register("logradouro")}
              value={inputStreet}
              onChange={(e) => setInputStreet(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-row gap">
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              {...register("bairro")}
              value={inputBairro}
              onChange={(e) => setInputBairro(e.target.value)}
            />
          </div>
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="complement">
              Complemento
            </label>
            <input
              id="complement"
              {...register("complemento")}
              value={inputComplement}
              onChange={(e) => setInputComplement(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-row gap">
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              {...register("cidade")}
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
          </div>
          <div className="clients-input-container flex-column">
            <label className="clients-form-label" htmlFor="estado">
              Estado
            </label>
            <input
              id="estado"
              {...register("estado")}
              value={inputUf}
              onChange={(e) => setInputUf(e.target.value)}
            />
          </div>
        </div>
        <div
          className="flex-row
         items-center flex-end"
        >
          <button className="btn-white" onClick={props.closeButton}>
            Cancelar
          </button>
          <button
            type="submit"
            className={buttonOn ? `btn-pink on` : `btn-pink off `}
          >
            {props.button}
          </button>
        </div>
      </form>
      <LoadingComponent />
      <ResponseComponent />
    </div>
  );
}
