import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./contexts/auth";
import { postRequest } from "./requests";

export default function useApi() {
  const { token, setToken } = useContext(AuthContext);
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

    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      history.push("/login");
      return;
    }
  }

  return { signInFunction, signUpFunction };
}
