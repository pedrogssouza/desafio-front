import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/auth";
import { ChargesArrayContext } from "../contexts/chargesArray";
import { ClientDetailsContext } from "../contexts/clientDetails";
import { ClientsArrayContext } from "../contexts/clientsArray";
import { EditProfileContext } from "../contexts/editProfile";
import { LoadingContext } from "../contexts/loadingContext";
import { ResponseContext } from "../contexts/response";
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
  const { setClientsDisplay } = useContext(ClientsArrayContext);
  const { clientDetails, setClientDetails } = useContext(ClientDetailsContext);
  const { setChargesDisplay } = useContext(ChargesArrayContext);
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
    setResponse({});

    setLoading(true);

    const response = await getProtectedRequest("/cadastro", token);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setResponse({
        data: responseData,
        type: "success",
      });
      return responseData;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function addClientFunction(data) {
    setResponse({});

    setLoading(true);

    const response = await postProtectedRequest(
      "/cliente/cadastro",
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

  async function getClientsFunction() {
    setResponse({});

    setLoading(true);

    const response = await getProtectedRequest("/cliente", token);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setClientsDisplay(responseData);
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function editClientFunction(data) {
    setResponse({});

    setLoading(true);

    const id = clientDetails.id;

    const response = await postProtectedRequest(
      `/cliente/cadastro/${id}`,
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
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function getClientDetailsFunction(id) {
    setResponse({});

    setLoading(true);

    const response = await getProtectedRequest(`/cliente/${id}`, token);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setClientDetails(responseData[0]);
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function getChargesFunction() {
    setResponse({});

    setLoading(true);

    const response = await getProtectedRequest("/cliente/cobranca", token);

    const responseData = await response.json();

    setLoading(false);

    if (response.ok) {
      setChargesDisplay(responseData);
      return;
    }

    setResponse({
      data: responseData,
      type: "error",
    });
  }

  async function signUpChargeFunction(data, id) {
    setResponse({});

    setLoading(true);

    const response = await postProtectedRequest(
      `/cliente/cobranca/${id}`,
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
    getClientsFunction,
    editClientFunction,
    getClientDetailsFunction,
    getChargesFunction,
    signUpChargeFunction,
  };
}
