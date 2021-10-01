import academy from "../../assets/academy.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PasswordComponent from "../../components/PasswordComponent";
import { useEffect, useState } from "react";

function SignUp() {
  const { handleSubmit, register } = useForm();
  const [buttonOn, setButtonOn] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  async function submit(data) {
    const response = await fetch(
      "https://sistema-cobranca-localhost071.herokuapp.com/cadastro",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    console.log(responseData);
  }

  useEffect(() => {
    if (inputPassword && inputEmail && inputName) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputName, inputEmail, inputPassword]);

  return (
    <div className="form-sign">
      <form
        onSubmit={handleSubmit(submit)}
        className="form-container flex-column items-center"
      >
        <img src={academy} alt="cubos-academy" className="mb-md"></img>
        <div>
          <label htmlFor="name">Nome</label>
          <div className="input-container ">
            <input
              id="name"
              {...register("nome", { required: true })}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <div className="input-container ">
            <input
              id="email"
              placeholder="exemplo@gmail.com"
              {...register("email", { required: true })}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </div>
        </div>
        <PasswordComponent
          id="senha"
          label="Senha"
          register={() => register("senha", { required: true })}
          setInputPassword={setInputPassword}
        />
        <button
          type="submit"
          className={buttonOn ? `btn-pink on mt-md` : `btn-pink off mt-md`}
        >
          Criar conta
        </button>
      </form>
      <p className="text-center">
        Já possui uma conta? <Link to="/login">Acesse agora!</Link>
      </p>
    </div>
  );
}

export default SignUp;
