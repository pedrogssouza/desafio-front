import "./styles.css";

function CountComponent(props) {
  return (
    <div className={`${props.color} count-div flex-row items-center mt-md `}>
      <p className="count-type">{props.type}</p>
      <p className="count">{props.count}</p>
    </div>
  );
}

export default function CountsContainer(props) {
  return (
    <div className="counts-container flex-column items-center">
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
