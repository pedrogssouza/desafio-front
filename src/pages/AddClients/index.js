import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import useApi from "../../useApi";
import getDataByCep from "../../viaCep";
import "./styles.css";

export default function AddClient(props) {
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
  const { addClientFunction } = useApi();

  useEffect(() => {
    if (inputName && inputEmail && inputCpf) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputEmail, inputName, inputCpf]);

  async function loadDataByCep(cep) {
    const data = await getDataByCep(cep);
    setInputCity(data.localidade);
    setInputStreet(data.logradouro);
    setInputUf(data.uf);
    setInputBairro(data.bairro);
  }

  useEffect(() => {
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
    <div className="add-clients-content flex-column">
      <h1 className="add-clients-form-title mb-md">ADICIONAR CLIENTE</h1>
      <div className="add-clients-container">
        <form
          className="add-clients-form flex-column "
          onSubmit={handleSubmit(addClientFunction)}
        >
          <div className="add-clients-input-container flex-column">
            <label htmlFor="name" className="add-clients-form-label">
              Nome
            </label>
            <input
              id="name"
              {...register("nome")}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className="add-clients-input-container flex-column">
            <label className="add-clients-form-label" htmlFor="email">
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
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                value={inputCpf}
                placeholder="222.222.222-22"
                {...register("cpf", { required: true })}
                onChange={(e) => setInputCpf(e.target.value)}
              />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                {...register("telefone")}
                placeholder="(71)99333-2222"
              />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="cep">
                CEP
              </label>
              <input
                id="cep"
                {...register("cep")}
                placeholder="20100-300"
                value={inputCep}
                onChange={(e) => setInputCep(e.target.value)}
              />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="number">
                Número
              </label>
              <input id="number" {...register("number")} type="number" />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="logradouro">
                Logradouro
              </label>
              <input
                id="logradouro"
                {...register("logradouro")}
                value={inputStreet}
                onChange={(e) => setInputStreet(e.target.value)}
              />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="bairro">
                Bairro
              </label>
              <input
                id="bairro"
                {...register("bairro")}
                value={inputBairro}
                onChange={(e) => setInputBairro(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="cidade">
                Cidade
              </label>
              <input
                id="cidade"
                {...register("cidade")}
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
              />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="estado">
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
            <button className="btn-white">Cancelar</button>
            <button
              type="submit"
              className={buttonOn ? `btn-pink on` : `btn-pink off `}
            >
              Adicionar cliente
            </button>
          </div>
        </form>
      </div>
      <LoadingComponent />
      <ResponseComponent />
    </div>
  );
}
