import "./styles.css";
import clients from "../../assets/clients.svg";
import charges from "../../assets/charges.svg";
import CountsContainer from "../../components/HomeCountComponent/index.js";
import LoadingComponent from "../../components/Loading";
import useApi from "../../services/useApi";
import { useEffect, useState } from "react";

export default function Home() {
  const { getRundownFunction } = useApi();
  const [clientsOk, setClientsOk] = useState([]);
  const [clientsNotOk, setClientsNotOk] = useState([]);
  const [chargesPaid, setChargesPaid] = useState([]);
  const [chargesPending, setChargesPending] = useState([]);
  const [chargesExpired, setChargesExpired] = useState([]);

  async function getRundowns() {
    let promiseFinish = await getRundownFunction("status");
    setClientsOk(promiseFinish);
    promiseFinish = await getRundownFunction("status?inadimplente");
    setClientsNotOk(promiseFinish);
    promiseFinish = await getRundownFunction("pagas?paga");
    setChargesPaid(promiseFinish);
    promiseFinish = await getRundownFunction("vencimentos");
    setChargesPending(promiseFinish);
    promiseFinish = await getRundownFunction("vencimentos?vencida");
    setChargesExpired(promiseFinish);
  }

  useEffect(() => {
    getRundowns();
  }, []);

  const containers = [
    {
      title: "Clientes",
      img: clients,
      array: [
        {
          color: "green",
          type: "Em dia",
          count: clientsOk.length || 0,
        },
        {
          color: "red",
          type: "Inadimplentes",
          count: clientsNotOk.length || 0,
        },
      ],
    },
    {
      title: "Cobranças",
      img: charges,
      array: [
        {
          color: "green",
          type: "Pagas",
          count: chargesPaid.length || 0,
        },
        {
          color: "blue",
          type: "Previstas",
          count: chargesPending.length || 0,
        },
        {
          color: "red",
          type: "Vencidas",
          count: chargesExpired.length || 0,
        },
      ],
    },
  ];

  return (
    <div className="home-content">
      {containers.map((container) => {
        return (
          <CountsContainer
            title={container.title}
            array={container.array}
            img={container.img}
          />
        );
      })}
      <LoadingComponent />
    </div>
  );
}
