import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DataContext } from "../../context/DataContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getClientes } from "../../api/api";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ErrorContext } from "../../context/ErrorContext";

const tab = "\u00A0";

export default function SearchClient(props) {
  const [enviar, setEnviar, sinErrores, setSinErrores] =
    useContext(ErrorContext);
  const [dataAnalisis, setdataAnalisis] = useContext(DataContext);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(dataAnalisis.cliente);
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});
  const [errorCliente, setErrorCliente] = useState(false);
  const [leyendaCliente, setLeyendaCliente] = useState("");

  const handleErrorFields = () => {
    let error = false;
    if (cliente.nombre === "") {
      setErrorCliente(true);
      setLeyendaCliente("Debe seleccionar una opción");
      error = true;
      setEnviar(false);
    } else {
      setErrorCliente(false);
      setLeyendaCliente("");
    }

    setSinErrores(!error);
  };

  const handleAlert = (msj) => {
    setAlert(msj);
  };

  const handleCloseSlackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSlackBar(false);
  };

  const handleClickSlackBar = () => {
    setOpenSlackBar(true);
  };

  const handleOnChange = (e, value) => {
    if (value != null) {
      setCliente(value);
      dataAnalisis.cliente = value;
      setdataAnalisis(dataAnalisis);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
  
    if (enviar) {
      handleErrorFields();
    } 
  }, [enviar]);

  async function loadClients() {
    try {
      const clientesFromApi = await getClientes();
      await setClientes(clientesFromApi);
    } catch (error) {
      handleAlert({
        status: "error",
        message: "Error al cargar datos de clientes",
      });
      handleClickSlackBar();
      props.setButtomSiguiente(true);
    }
  }

  return (
    <React.Fragment>
      <Autocomplete
        fullWidth
        disablePortal
        getOptionLabel={(option) =>
          option.nombre === ""
            ? ""
            : `${option.nombre} ${option.apellido} (${option.empresa})`
        }
        id="combo-box-cliente"
        value={cliente}
        options={clientes === undefined ? [] : clientes}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Clientes"
            error={errorCliente}
            helperText={leyendaCliente}
          />
        )}
      />

      <Grid item xs={6}>
        <Typography> {tab} </Typography>
        <Typography> {tab} </Typography>
        <Typography variant="h6" gutterBottom>
          Datos del cliente
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              id="firstName"
              name="firstName"
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={cliente.nombre}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              id="lastName"
              name="lastName"
              label="Apellido"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={cliente.apellido}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              id="empresa"
              name="empresa"
              label="Empresa"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={cliente.empresa}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              id="idTipoVinculo"
              name="tipoVinculo"
              label="Tipo de Vínculo"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={cliente.tipoVinculo}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              id="telefono"
              name="telefono"
              label="Telefono"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={cliente.telefono}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              id="localidad"
              name="localidad"
              label="Localidad"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={cliente.localidad}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              id="correo"
              name="correo"
              label="Correo"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={cliente.correo}
              onChange={() => {}}
              multiline
            />
          </Grid>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSlackBar}
          autoHideDuration={6000}
          onClose={handleCloseSlackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSlackBar}
            severity={alert.status === "success" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    </React.Fragment>
  );
}
