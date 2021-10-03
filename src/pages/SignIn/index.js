import academy from "../../assets/academy.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PasswordComponent from "../../components/PasswordComponent";
import { useEffect, useState } from "react";
import useApi from "../../useApi";

function SignIn() {
  const { handleSubmit, register } = useForm();
  const [buttonOn, setButtonOn] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { signInFunction } = useApi();

  useEffect(() => {
    if (inputPassword && inputEmail) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputEmail, inputPassword]);

  return (
    <div className="form-sign">
      <form
        onSubmit={handleSubmit(signInFunction)}
        className="form-container flex-column items-center"
      >
        <img src={academy} alt="cubos-academy" className="mb-lg"></img>
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
          className={buttonOn ? `btn-pink on mt-xl` : `btn-pink off mt-xl`}
        >
          Entrar
        </button>
      </form>
      <p className="text-center">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se!</Link>
      </p>
    </div>
  );
}

export default SignIn;
