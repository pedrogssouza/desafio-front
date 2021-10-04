import "./styles.css";
import { Backdrop, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditProfileContext } from "../../contexts/editProfile.js";
import useApi from "../../useApi.js";
import PasswordComponent from "../PasswordComponent/index.js";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

  useEffect(async () => {
    const profile = await getProfileFunction();
    setInputName(profile.nome);
    setInputEmail(profile.email);
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
            <label className={classes.label} htmlFor="name">
              Nome
            </label>
            <div className="input-container ">
              <input
                id="name"
                {...register("nome", { required: true })}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={classes.label} htmlFor="email">
              E-mail
            </label>
            <div className="input-container ">
              <input
                id="email"
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
            <label className={classes.label} htmlFor="phone">
              Telefone
            </label>
            <div className="input-container ">
              <input
                id="phone"
                placeholder="(71) 9 9333-2222"
                {...register("telefone")}
              />
            </div>
          </div>
          <div>
            <label className={classes.label} htmlFor="cpf">
              CPF
            </label>
            <div className="input-container ">
              <input
                id="cpf"
                placeholder="222.222.222-22"
                {...register("cpf")}
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
    </Backdrop>
  );
}
