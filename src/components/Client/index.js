import { makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import edit from "../../assets/edit-icon.svg";
import { ClientDetailsContext } from "../../contexts/clientDetails";
import useApi from "../../services/useApi";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flow-root",
  },
}));

export default function ClientComponent(props) {
  const [editClient, setEditClient] = useState(false);
  const { getClientDetailsFunction } = useApi();
  return (
    <div onClick={() => getClientDetailsFunction(props.id)}>
      <div></div>
      <p></p>
      <p></p>
      <p className="client-status"></p>
      <img src={edit} onClick={() => setEditClient(true)} />
      <EditClient editClient={editClient} setEditClient={setEditClient} />
    </div>
  );
}

function EditClient(props) {
  const classes = useStyles();
  const { clientDetails } = useContext(ClientDetailsContext);
  const { editClientFunction } = useApi();
  return (
    <Backdrop className={classes.backdrop} open={props.editClient}>
      <ClientForm
        button={"Editar Cliente"}
        closeButton={() => props.setEditClient(false)}
        function={(data) => editClientFunction(data, clientDetails.id)}
      />
    </Backdrop>
  );
}
