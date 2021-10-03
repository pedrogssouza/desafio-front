import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./contexts/auth";
import { postRequest } from "./requests";

export default function useApi() {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();

  async function loginFunction(data) {
    const response = await postRequest("/login", data);

    let responseData = undefined;

    if (response.ok) {
      responseData = await response.json();

      setToken(responseData.token);
      // console.log(token)
      localStorage.setItem("token", responseData.token);
      history.push("/");
      return;
    }
  }

  return { loginFunction };
}
