import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./contexts/auth";
import { EditProfileContext } from "./contexts/editProfile";
import {
  postRequest,
  postProtectedRequest,
  getProtectedRequest,
} from "./requests";

export default function useApi() {
  const { token, setToken } = useContext(AuthContext);
  const { setEditProfile } = useContext(EditProfileContext);
  const history = useHistory();

  async function signInFunction(data) {
    const response = await postRequest("/login", data);

    const responseData = await response.json();

    if (response.ok) {
      setToken(responseData.token);
      localStorage.setItem("token", responseData.token);
      history.push("/");
      return;
    }
  }

  async function signUpFunction(data) {
    const response = await postRequest("/cadastro", data);

    if (response.ok) {
      history.push("/login");
      return;
    }
  }

  async function editProfileFunction(data) {
    const response = await postProtectedRequest(
      "/cadastro",
      "PUT",
      data,
      token
    );

    if (response.ok) {
      setEditProfile(false);
      console.log("oi");
      return;
    }
  }

  async function getProfileFunction() {
    const response = await getProtectedRequest("/cadastro", token);

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }
  }

  async function addClientFunction(data) {
    const response = await postProtectedRequest(
      "/usuario/cadastro",
      "POST",
      data,
      token
    );

    const responseData = await response.json();

    if (response.ok) {
      return;
    }
  }

  return {
    signInFunction,
    signUpFunction,
    editProfileFunction,
    getProfileFunction,
    addClientFunction,
  };
}
