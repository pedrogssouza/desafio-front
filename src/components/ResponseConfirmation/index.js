import { Snackbar } from "@material-ui/core";
import { Stack } from "@mui/material";
import { Alert } from "@material-ui/lab";
import { useContext } from "react";
import { ResponseContext } from "../../contexts/response";

export default function ResponseComponent() {
  const { response, setResponse } = useContext(ResponseContext);
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={!!response.data}
        autoHideDuration={6000}
        onClose={() => setResponse({})}
      >
        {response.type !== undefined ? (
          <Alert sx={{ width: "100%" }} severity={response.type}>
            {response.data}
          </Alert>
        ) : (
          ""
        )}
      </Snackbar>
    </Stack>
  );
}
