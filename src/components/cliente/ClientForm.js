import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { editClient } from "../../api/api";
import { deleteClient } from "../../api/api";
import validator from "validator";
import FormHelperText from "@mui/material/FormHelperText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const tab = "\u00A0";

export default function ClientForm(props) {
  const [disabled, setDisabled] = useState(true);

  const [cliente, setCliente] = useState({
    id: props.selectedRaw.id,
    nombre: props.selectedRaw.nombre,
    apellido: props.selectedRaw.apellido,
    empresa: props.selectedRaw.empresa,
    localidad: props.selectedRaw.localidad,
    tipoVinculo: props.selectedRaw.tipoVinculo,
    direccion: props.selectedRaw.direccion,
    telefono: props.selectedRaw.telefono,
    correo: props.selectedRaw.correo,
  });

  const [id] = useState(props.selectedRaw.id);
  const [nombre, setNombre] = useState(props.selectedRaw.nombre);
  const [apellido, setApellido] = useState(props.selectedRaw.apellido);
  const [empresa, setEmpresa] = useState(props.selectedRaw.empresa);
  const [localidad, setLocalidad] = useState(props.selectedRaw.localidad);
  const [tipoVinculo, setTipoVinculo] = useState(props.selectedRaw.tipoVinculo);
  const [direccion, setDireccion] = useState(props.selectedRaw.direccion);
  const [telefono, setTelefono] = useState(props.selectedRaw.telefono);
  const [correo, setCorreo] = useState(props.selectedRaw.correo);
  const [open, setOpen] = useState(false);

  const [errorNombre, setErrorNombre] = useState(false);
  const [leyendaNombre, setLeyendaNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState(false);
  const [leyendaApellido, setLeyendaApellido] = useState("");
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [leyendaCorreo, setLeyendaCorreo] = useState("");
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [leyendaTelefono, setLeyendaTelefono] = useState("");
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [leyendaDireccion, setLeyendaDireccion] = useState("");
  const [errorLocalidad, setErrorLocalidad] = useState(false);
  const [leyendaLocalidad, setLeyendaLocalidad] = useState("");
  const [errorEmpresa, setErrorEmpresa] = useState(false);
  const [leyendaEmpresa, setLeyendaEmpresa] = useState("");
  const [errorTipoVinculo, setErrorTipoVinculo] = useState(false);
  const [leyendaTipoVinculo, setLeyendaTipoVinculo] = useState("");

  const isnum = (val) => {
    return /^\d+$/.test(val);
  };

  const handleNombre = (event) => {
    setNombre(event.target.value);
    cliente.nombre = event.target.value;
    setCliente(cliente);
  };
  const handleApellido = (event) => {
    setApellido(event.target.value);
    cliente.apellido = event.target.value;
    setCliente(cliente);
  };
  const handleEmpresa = (event) => {
    setEmpresa(event.target.value);
    cliente.empresa = event.target.value;
    setCliente(cliente);
  };
  const handleLocalidad = (event) => {
    setLocalidad(event.target.value);
    cliente.localidad = event.target.value;
    setCliente(cliente);
  };
  const handleDireccion = (event) => {
    setDireccion(event.target.value);
    cliente.direccion = event.target.value;
    setCliente(cliente);
  };
  const handleTelefono = (event) => {
    setTelefono(event.target.value);
    cliente.telefono = event.target.value;
    setCliente(cliente);
  };
  const handleCorreo = (event) => {
    setCorreo(event.target.value);
    cliente.correo = event.target.value;
    setCliente(cliente);
  };
  const handleTipoVinculo = (event) => {
    setTipoVinculo(event.target.value);
    cliente.tipoVinculo = event.target.value;
    setCliente(cliente);
  };

  //Acciones
  const handleConfirmar = async () => {
    let error = handleErrorFields();
    if (!error) {
      const msj = await editClient(cliente);
      props.handleDialog();
      props.loadClients();
      props.handleAlert(msj);
    }
  };

  const onClickEditar = () => {
    setDisabled(false);
  };

  const onClickEliminar = async () => {
    handleOpenAlert();
  };

  const onClickEliminarAlert = async () => {
    const msj = await deleteClient(id);
    props.handleDialog();
    props.loadClients();
    props.handleAlert(msj);
  };

  const handleOpenAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleErrorFields = () => {
    let error = false;

    if (nombre === "") {
      setErrorNombre(true);
      setLeyendaNombre("Campo obligatorio");
      error = true;
    } else if (nombre.length > 20) {
      setErrorNombre(true);
      setLeyendaNombre("Deben ser menos de 20 caracteres");
      error = true;
    } else {
      setErrorNombre(false);
      setLeyendaNombre("");
    }

    if (tipoVinculo === "") {
      setErrorTipoVinculo(true);
      setLeyendaTipoVinculo("Debe seleccionar una opción");
      error = true;
    } else {
      setErrorTipoVinculo(false);
      setLeyendaTipoVinculo("");
    }

    if (apellido === "") {
      setErrorApellido(true);
      setLeyendaApellido("Campo obligatorio");
      error = true;
    } else if (apellido.length > 20) {
      setErrorApellido(true);
      setLeyendaApellido("Deben ser menos de 20 caracteres");
      error = true;
    } else {
      setErrorApellido(false);
      setLeyendaApellido("");
    }

    if (direccion === "") {
      setErrorDireccion(true);
      setLeyendaDireccion("Campo obligatorio");
      error = true;
    } else if (direccion.length > 50) {
      setErrorDireccion(true);
      setLeyendaDireccion("Deben ser menos de 50 caracteres");
      error = true;
    } else {
      setErrorDireccion(false);
      setLeyendaDireccion("");
    }
    if (localidad === "") {
      setErrorLocalidad(true);
      setLeyendaLocalidad("Campo obligatorio");
      error = true;
    } else if (localidad.length > 50) {
      setErrorLocalidad(true);
      setLeyendaLocalidad("Deben ser menos de 50 caracteres");
      error = true;
    } else {
      setErrorLocalidad(false);
      setLeyendaLocalidad("");
    }
    if (empresa === "") {
      setErrorEmpresa(true);
      setLeyendaEmpresa("Campo obligatorio");
      error = true;
    } else if (empresa.length > 50) {
      setErrorEmpresa(true);
      setLeyendaEmpresa("Deben ser menos de 50 caracteres");
      error = true;
    } else {
      setErrorEmpresa(false);
      setLeyendaEmpresa("");
    }

    if (correo === "") {
      setErrorCorreo(true);
      setLeyendaCorreo("Campo obligatorio");
      error = true;
    } else if (correo.length > 50) {
      setErrorCorreo(true);
      setLeyendaCorreo("Deben ser menos de 50 caracteres");
      error = true;
    } else {
      if (!validator.isEmail(correo)) {
        setErrorCorreo(true);
        setLeyendaCorreo("Debe introducir un correo válido");
        error = true;
      } else {
        setErrorCorreo(false);
        setLeyendaCorreo("");
      }
    }

    if (telefono === "") {
      setErrorTelefono(true);
      setLeyendaTelefono("Campo obligatorio");
      error = true;
    } else if (telefono.length > 10) {
      setErrorTelefono(true);
      setLeyendaTelefono("Deben ser menos de 10 números");
      error = true;
    } else {
      if (!isnum(telefono)) {
        setErrorTelefono(true);
        setLeyendaTelefono("Debe intriducir solo números");
        error = true;
      } else {
        setErrorTelefono(false);
        setLeyendaTelefono("");
      }
    }

    return error;
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            Datos del cliente
          </Typography>
          <Dialog
            open={open}
            onClose={handleCloseAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminar cliente"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Seguro quiere eliminar el cliente?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                size="medium"
                color="error"
                onClick={handleCloseAlert}
              >
                Cancelar
              </Button>
              <Button
                startIcon={<CheckIcon />}
                variant="contained"
                size="medium"
                onClick={onClickEliminarAlert}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorNombre}
                helperText={leyendaNombre}
                disabled={disabled}
                required
                id="id_nombre"
                name="nombre"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={nombre}
                onChange={handleNombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorApellido}
                helperText={leyendaApellido}
                disabled={disabled}
                required
                id="lastName"
                name="lastName"
                label="Apellido"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={apellido}
                onChange={handleApellido}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorDireccion}
                helperText={leyendaDireccion}
                disabled={disabled}
                required
                id="direccion"
                name="direccion"
                label="Dirección"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={direccion}
                onChange={handleDireccion}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorLocalidad}
                helperText={leyendaLocalidad}
                disabled={disabled}
                required
                id="localidad"
                name="localidad"
                label="Localidad"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={localidad}
                onChange={handleLocalidad}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={errorEmpresa}
                helperText={leyendaEmpresa}
                disabled={disabled}
                required
                id="empresa"
                name="empresa"
                label="Empresa"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={empresa}
                onChange={handleEmpresa}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorTelefono}
                helperText={leyendaTelefono}
                disabled={disabled}
                required
                id="telf"
                name="telf"
                label="Teléfono"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={telefono}
                onChange={handleTelefono}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errorCorreo}
                helperText={leyendaCorreo}
                disabled={disabled}
                required
                id="mail"
                name="mail"
                label="Correo electronico"
                fullWidth
                variant="standard"
                autoComplete="given-name"
                value={correo}
                onChange={handleCorreo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography> {tab} </Typography>
              <FormControl fullWidth error={errorTipoVinculo}>
                <InputLabel id="select-estadoMuestra">
                  Tipo de vinculación
                </InputLabel>
                <Select
                  disabled={disabled}
                  labelId="select-estadoMuestra"
                  id="estadoMuestra"
                  label="Estado de la Muestra"
                  onChange={handleTipoVinculo}
                  value={tipoVinculo}
                >
                  <MenuItem value={"Presupuesto"}>Presupuesto</MenuItem>
                  <MenuItem value={"Convenio"}>Convenio</MenuItem>
                </Select>
                <FormHelperText>{leyendaTipoVinculo}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {disabled ? (
            <>
              <Button
                startIcon={<DeleteForeverOutlined />}
                variant="outlined"
                size="medium"
                color="error"
                onClick={onClickEliminar}
              >
                Eliminar
              </Button>
              <Button
                startIcon={<EditOutlined />}
                variant="contained"
                size="medium"
                onClick={onClickEditar}
              >
                Editar
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                size="medium"
                color="error"
                onClick={props.handleDialog}
              >
                Cancelar
              </Button>
              <Button
                startIcon={<CheckIcon />}
                variant="contained"
                size="medium"
                onClick={handleConfirmar}
              >
                Confirmar
              </Button>
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
