import "./styles.css";
import clients from "../../assets/clients.svg";
import charges from "../../assets/charges.svg";
import CountsContainer from "../../components/HomeCountComponent/index.js";
import LoadingComponent from "../../components/Loading";

function Home() {
  const containers = [
    {
      title: "Clientes",
      img: clients,
      array: [
        {
          color: "green",
          type: "Em dia",
          count: 0,
        },
        {
          color: "red",
          type: "Inadimplentes",
          count: 0,
        },
      ],
    },
    {
      title: "Cobranças",
      img: charges,
      array: [
        {
          color: "blue",
          type: "Previstas",
          count: 0,
        },
        {
          color: "red",
          type: "Vencidas",
          count: 0,
        },
        {
          color: "green",
          type: "Pagas",
          count: 0,
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

export default Home;
