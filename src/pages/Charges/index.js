import { useContext, useEffect } from "react";
import LoadingComponent from "../../components/Loading";
import ResponseComponent from "../../components/ResponseConfirmation";
import ChargeComponent from "../../components/Charge";
import { ChargesArrayContext } from "../../contexts/chargesArray";
import useApi from "../../services/useApi";
import "./styles.css";
import SearchComponent from "../../components/SearchComponent";

export default function Charges(props) {
  const { chargesDisplay } = useContext(ChargesArrayContext);
  const { getChargesFunction } = useApi();

  useEffect(() => {
    getChargesFunction();
  }, []);

  return (
    <div className="charges-content">
      <div className="flex-row charges-search">
        <SearchComponent type="charges" />
      </div>
      <div className="charges-display-details">
        <p>ID</p>
        <p>Cliente</p>
        <p>Descrição</p>
        <p>Valor</p>
        <p>Status</p>
        <p>Vencimento</p>
      </div>
      {chargesDisplay.length !== 0
        ? chargesDisplay.map((charge) => (
            <ChargeComponent {...charge} key={charge.id_cobranca} />
          ))
        : ``}
      <LoadingComponent />
      <ResponseComponent />
    </div>
  );
}
