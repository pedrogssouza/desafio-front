import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export default function AddClient(props) {
  const { handleSubmit, register } = useForm();
  const [buttonOn, setButtonOn] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCpf, setInputCpf] = useState("");

  useEffect(() => {
    if (inputName && inputEmail && inputCpf) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputEmail, inputName, inputCpf]);

  return (
    <div className="add-clients-content flex-column">
      <h1 className="add-clients-form-title">ADICIONAR CLIENTE</h1>
      <div className="add-clients-container">
        <form
          className="add-clients-form flex-column"
          onSubmit={handleSubmit()}
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
                {...register("cpf", { required: true })}
                onChange={(e) => setInputCpf(e.target.value)}
              />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="phone">
                Telefone
              </label>
              <input id="phone" {...register("telefone")} />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="cep">
                CEP
              </label>
              <input id="cep" {...register("cep")} />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="logradouro">
                Logradouro
              </label>
              <input id="logradouro" {...register("logradouro")} />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="bairro">
                Bairro
              </label>
              <input id="bairro" {...register("bairro")} />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="cidade">
                Cidade
              </label>
              <input id="cidade" {...register("cidade")} />
            </div>
          </div>
          <div className="flex-row gap">
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="estado">
                Estado
              </label>
              <input id="estado" {...register("estado")} />
            </div>
            <div className="add-clients-input-container flex-column">
              <label className="add-clients-form-label" htmlFor="complemento">
                Complemento
              </label>
              <input id="complemento" {...register("complemento")} />
            </div>
          </div>
          <div
            className="flex-row
         items-center flex-end"
          >
            <button className="btn-white">Cancelar</button>
            <button className={buttonOn ? `btn-pink on` : `btn-pink off `}>
              Adicionar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
