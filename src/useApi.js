import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./contexts/auth";
import { EditProfileContext } from "./contexts/editProfile";
import { LoadingContext } from "./contexts/loadingContext";
import { ResponseContext } from "./contexts/response";
import {
  postRequest,
  postProtectedRequest,
  getProtectedRequest,
} from "./requests";

export default function useApi() {
  const { token, setToken } = useContext(AuthContext);
  const { setEditProfile } = useContext(EditProfileContext);
  const { setLoading } = useContext(LoadingContext);
  const { setResponse } = useContext(ResponseContext);
  const history = useHistory();

  async function signInFunction(data) {
    setResponse({});

    setLoading(true);

    const response = await postRequest("/login", data);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setToken(responseData.token);
      localStorage.setItem("token", responseData.token);
      history.push("/");
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function signUpFunction(data) {
    setResponse({});

    setLoading(true);

    const response = await postRequest("/cadastro", data);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      history.push("/login");
      setResponse({
        data: responseData,
        type: "success",
      });
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function editProfileFunction(data) {
    setResponse({});

    setLoading(true);

    const response = await postProtectedRequest(
      "/cadastro",
      "PUT",
      data,
      token
    );

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setResponse({
        data: responseData,
        type: "success",
      });
      setTimeout(() => {
        setEditProfile(false);
      }, 6000);
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function getProfileFunction() {
    setLoading(true);

    const response = await getProtectedRequest("/cadastro", token);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      return responseData;
    }
  }

  async function addClientFunction(data) {
    setResponse({});

    setLoading(true);

    const response = await postProtectedRequest(
      "/usuario/cadastro",
      "POST",
      data,
      token
    );

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setResponse({
        data: responseData,
        type: "success",
      });
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  return {
    signInFunction,
    signUpFunction,
    editProfileFunction,
    getProfileFunction,
    addClientFunction,
  };
}
