import "./styles.css";
import { Backdrop, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditProfileContext } from "../../contexts/editProfile.js";
import useApi from "../../services/useApi.js";
import PasswordComponent from "../PasswordComponent/index.js";
import LoadingComponent from "../Loading";
import ResponseComponent from "../ResponseConfirmation";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flow-root",
  },
  label: {
    fontSize: 16,
    color: "#374952",
  },
}));

export function EditProfileComponent() {
  const classes = useStyles();
  const { editProfile, setEditProfile } = useContext(EditProfileContext);
  const { handleSubmit, register } = useForm();
  const { editProfileFunction, getProfileFunction } = useApi();

  const [buttonOn, setButtonOn] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputCpf, setInputCpf] = useState("");

  useEffect(() => {
    async function getInitialProfile() {
      const profile = await getProfileFunction();

      if (profile === undefined) {
        return;
      }

      setInputName(profile.nome);
      setInputEmail(profile.email);
      setInputPhone(profile.telefone);
      setInputCpf(profile.cpf);
    }
    getInitialProfile();
  }, []);

  useEffect(() => {
    if (inputName && inputEmail) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  }, [inputEmail, inputName]);

  return (
    <Backdrop className={classes.backdrop} open={editProfile}>
      <div className="form-sign">
        <form
          onSubmit={handleSubmit(editProfileFunction)}
          className="form-container flex-column items-center"
        >
          <p onClick={() => setEditProfile(false)} className="close-form">
            X
          </p>
          <h1 className="title-form">EDITAR USUÁRIO</h1>
          <div>
            <div className="input-container ">
              <label className={classes.label} htmlFor="name-edit">
                Nome
              </label>
              <input
                id="name-edit"
                {...register("nome", { required: true })}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="input-container ">
              <label className={classes.label} htmlFor="email-edit">
                E-mail
              </label>
              <input
                id="email-edit"
                placeholder="exemplo@gmail.com"
                value={inputEmail}
                {...register("email", { required: true })}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>
          </div>
          <PasswordComponent
            id="password"
            label="Nova senha"
            placeholder="Deixar vazio para não editar"
            register={() => register("senha")}
            class={classes.label}
          />
          <div>
            <div className="input-container ">
              <label className={classes.label} htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                placeholder="(71)99333-2222"
                {...register("telefone")}
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="input-container ">
              <label className={classes.label} htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                placeholder="222.222.222-22"
                {...register("cpf")}
                value={inputCpf}
                onChange={(e) => setInputCpf(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={buttonOn ? `btn-pink on mt-md` : `btn-pink off mt-md`}
          >
            Editar conta
          </button>
        </form>
      </div>
      <LoadingComponent />
      <ResponseComponent />
    </Backdrop>
  );
}
