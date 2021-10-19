import { useContext } from "react";
import { useHistory } from "react-router";
import { RundownDetailTypeContext } from "../../contexts/rundownDetailType";
import { RundownTypeContext } from "../../contexts/rundownType";
import "./styles.css";

function CountComponent(props) {
  const { rundownDetailType, setRundownDetailType } = useContext(
    RundownDetailTypeContext
  );
  const history = useHistory();
  return (
    <div
      className={`${props.color} count-div flex-row items-center mt-md `}
      onClick={() => {
        if (props.type == "Em dia") {
          setRundownDetailType("em dia");
        } else if (props.type == "Inadimplentes") {
          setRundownDetailType("inadimplente");
        } else if (props.type == "Pagas") {
          setRundownDetailType("pagas");
        } else if (props.type == "Pendentes") {
          setRundownDetailType("pendentes");
        } else if (props.type == "Vencidas") {
          setRundownDetailType("vencidas");
        }
        history.push("/relatorio");
      }}
    >
      <p className="count-type">{props.type}</p>
      <p className="count">{props.count}</p>
    </div>
  );
}

export default function CountsContainer(props) {
  const { rundownType, setRundownType } = useContext(RundownTypeContext);
  const history = useHistory();
  return (
    <div
      className="counts-container flex-column items-center"
      onClick={() => {
        if (props.title == "Clientes") {
          setRundownType("clients");
        } else if (props.title == "Cobranças") {
          setRundownType("charges");
        }
        history.push("/relatorio");
      }}
    >
      <div className="counts-container-header mb-lg flex-row content-center items-center">
        <img src={props.img} alt={`${props.img}`} />
        <p>{`${props.title}`}</p>
      </div>
      {props.array.map((item) => {
        return (
          <CountComponent
            color={item.color}
            type={item.type}
            count={item.count}
          />
        );
      })}
    </div>
  );
}
