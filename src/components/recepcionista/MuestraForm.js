import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DataContext } from "../../context/DataContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "dayjs/locale/es";
import { ErrorContext } from "../../context/ErrorContext";
import FormHelperText from "@mui/material/FormHelperText";

const tab = "\u00A0";

export default function AnalisisForm() {
  const [dataAnalisis, setdataAnalisis] = useContext(DataContext);
  const [enviar, setEnviar, sinErrores, setSinErrores] =
    useContext(ErrorContext);
  const [tipoAnalisis, setTipoAnalisis] = useState(
    dataAnalisis.analisis.tipoAnalisis
  );
  const [nLote, setnLote] = useState(dataAnalisis.analisis.nLote);
  const [fechaVencimiento, setFechaVencimiento] = useState(
    dataAnalisis.analisis.fechaVencimiento
  );
  const [fechaMuestra, setFechaMuestra] = useState(
    dataAnalisis.analisis.fechaMuestra
  );
  const [matriz, setMatriz] = useState(dataAnalisis.analisis.matriz);
  const [laboratorio, setLaboratorio] = useState(
    dataAnalisis.analisis.laboratorio
  );
  const [estadoMuestra, setEstadoMuestra] = useState(
    dataAnalisis.analisis.estadoMuestra
  );
  const [descMuestra, setDescMuestra] = useState(
    dataAnalisis.analisis.descMuestra
  );
  const [identificadorMuestra, setIdentificadorMuestra] = useState(
    dataAnalisis.analisis.identificadorMuestra
  );
  const [entregadoPor, setEntregadoPor] = useState(
    dataAnalisis.analisis.identificadorMuestra
  );

  const [errorTipoAnalisis, setErrorTipoAnalisis] = useState(false);
  const [leyendaTipoAnalisis, setLeyendaTipoAnalisis] = useState("");
  const [errornLote, setErrornLote] = useState(false);
  const [leyendanLote, setLeyendanLote] = useState("");
  const [errorDescMuestra, setErrorDescMuestra] = useState(false);
  const [leyendaDescMuestra, setLeyendaDescMuestra] = useState("");
  const [errorIdentificadorMuestra, setErrorIdentificadorMuestra] =
    useState(false);
  const [leyendaIdentificadorMuestra, setLeyendaIdentificadorMuestra] =
    useState("");
  const [errorEntregadoPor, setErrorEntregadoPor] = useState(false);
  const [leyendaEntregadoPor, setLeyendaEntregadoPor] = useState("");
  const [errorMatriz, setErrorMatriz] = useState(false);
  const [leyendaMatriz, setLeyendaMatriz] = useState("");
  const [errorLaboratorio, setErrorLaboratorio] = useState(false);
  const [leyendaLaboratorio, setLeyendaLaboratorio] = useState("");
  const [errorEstadoMuestra, setErrorEstadoMuestra] = useState(false);
  const [leyendaEstadoMuestra, setLeyendaEstadoMuestra] = useState("");

  const [errorFechaMuestra, setErrorFechaMuestra] = useState(false);
  const [leyendaFechaMuestra, setLeyendaFechaMuestra] = useState("");
  const [errorFechaVencimiento, setErrorFechaVencimiento] = useState(false);
  const [leyendaFechaVencimiento, setLeyendaFechaVencimiento] = useState("");

  const handleErrorFields = () => {
    let error = false;
    if (tipoAnalisis === "") {
      setErrorTipoAnalisis(true);
      setLeyendaTipoAnalisis("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else if (tipoAnalisis.length > 20) {
      setErrorTipoAnalisis(true);
      setLeyendaTipoAnalisis("Deben ser menos de 20 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrorTipoAnalisis(false);
      setLeyendaTipoAnalisis("");
    }

    if (nLote.length > 20) {
      setErrornLote(true);
      setLeyendanLote("Deben ser menos de 20 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrornLote(false);
      setLeyendanLote("");
    }

    if (descMuestra === "") {
      setErrorDescMuestra(true);
      setLeyendaDescMuestra("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else if (descMuestra.length > 200) {
      setErrorDescMuestra(true);
      setLeyendaDescMuestra("Deben ser menos de 200 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrorDescMuestra(false);
      setLeyendaDescMuestra("");
    }

    if (identificadorMuestra === "") {
      setErrorIdentificadorMuestra(true);
      setLeyendaIdentificadorMuestra("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else if (identificadorMuestra.length > 20) {
      setErrorIdentificadorMuestra(true);
      setLeyendaIdentificadorMuestra("Deben ser menos de 20 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrorIdentificadorMuestra(false);
      setLeyendaIdentificadorMuestra("");
    }

    if (entregadoPor === "") {
      setErrorEntregadoPor(true);
      setLeyendaEntregadoPor("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else if (entregadoPor.length > 20) {
      setErrorEntregadoPor(true);
      setLeyendaEntregadoPor("Deben ser menos de 20 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrorEntregadoPor(false);
      setLeyendaEntregadoPor("");
    }

    if (matriz === "") {
      setErrorMatriz(true);
      setLeyendaMatriz("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorMatriz(false);
      setLeyendaMatriz("");
    }

    if (laboratorio === "") {
      setErrorLaboratorio(true);
      setLeyendaLaboratorio("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorLaboratorio(false);
      setLeyendaLaboratorio("");
    }

    if (estadoMuestra === "") {
      setErrorEstadoMuestra(true);
      setLeyendaEstadoMuestra("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorEstadoMuestra(false);
      setLeyendaEstadoMuestra("");
    }

    if (fechaMuestra === null) {
      setErrorFechaMuestra(true);
      setLeyendaFechaMuestra("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorFechaMuestra(false);
      setLeyendaFechaMuestra("");
    }

    if (fechaVencimiento === null) {
      setErrorFechaVencimiento(true);
      setLeyendaFechaVencimiento("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorFechaVencimiento(false);
      setLeyendaFechaVencimiento("");
    }

    if (fechaMuestra !== null && fechaVencimiento !== null) {
      if (fechaVencimiento < fechaMuestra) {
        setErrorFechaVencimiento(true);
        setLeyendaFechaVencimiento("Debe ser mayor a la fecha de muestra");
        setErrorFechaMuestra(true);
        setLeyendaFechaMuestra("Debe ser menor a la fecha de vencimiento");
        error = true;
        setEnviar(false);
      } else {
        setErrorFechaVencimiento(false);
        setLeyendaFechaVencimiento("");
        setErrorFechaMuestra(false);
        setLeyendaFechaMuestra("");
      }
    }

    const dateNow = new Date(new Date().toISOString().split("T")[0]);

    if (
      fechaMuestra !== null &&
      fechaVencimiento !== null &&
      fechaMuestra <= fechaVencimiento
    ) {
      if (dateNow < fechaMuestra) {
        setErrorFechaMuestra(true);
        setLeyendaFechaMuestra("Debe ser menor o igual a la fecha actual");
        error = true;
        setEnviar(false);
      } else {
        setErrorFechaMuestra(false);
        setLeyendaFechaMuestra("");
      }
    }

    if (
      fechaMuestra !== null &&
      fechaVencimiento !== null &&
      fechaMuestra <= fechaVencimiento
    ) {
      if (dateNow > fechaVencimiento) {
        setErrorFechaVencimiento(true);
        setLeyendaFechaVencimiento("Debe ser mayor o igual a la fecha actual");
        error = true;
        setEnviar(false);
      } else {
        setErrorFechaVencimiento(false);
        setLeyendaFechaVencimiento("");
      }
    }

    setSinErrores(!error);
  };

  const handleIdentificadorMuestra = (event) => {
    setIdentificadorMuestra(event.target.value);
    dataAnalisis.analisis.identificadorMuestra = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleEntregadoPor = (event) => {
    setEntregadoPor(event.target.value);
    dataAnalisis.analisis.entregadoPor = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleFechaMuestra = (newValue) => {
    setFechaMuestra(newValue);
    dataAnalisis.analisis.fechaMuestra = newValue;
    setdataAnalisis(dataAnalisis);
  };
  const handleFechaVencimiento = (newValue) => {
    setFechaVencimiento(newValue);
    dataAnalisis.analisis.fechaVencimiento = newValue;
    setdataAnalisis(dataAnalisis);
  };
  const handleTipoAnalisis = (event) => {
    setTipoAnalisis(event.target.value);
    dataAnalisis.analisis.tipoAnalisis = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleTipoNumeroLote = (event) => {
    setnLote(event.target.value);
    dataAnalisis.analisis.nLote = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleMatriz = (event) => {
    setMatriz(event.target.value);
    dataAnalisis.analisis.matriz = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleLaboratorio = (event) => {
    setLaboratorio(event.target.value);
    dataAnalisis.analisis.laboratorio = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleEsatdoMuestra = (event) => {
    setEstadoMuestra(event.target.value);
    dataAnalisis.analisis.estadoMuestra = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  const handleDescripcion = (event) => {
    setDescMuestra(event.target.value);
    dataAnalisis.analisis.descMuestra = event.target.value;
    setdataAnalisis(dataAnalisis);
  };
  useEffect(() => {
    if (enviar) {
      handleErrorFields();
    }
  }, [enviar]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de la muestra
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            autoFocus
            required
            id="tipoAnalisis"
            label="Tipo de análisis"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleTipoAnalisis}
            value={tipoAnalisis}
            error={errorTipoAnalisis}
            helperText={leyendaTipoAnalisis}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="nLote"
            value={nLote}
            label="Numero de lote"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleTipoNumeroLote}
            error={errornLote}
            helperText={leyendanLote}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="identificadorMuestra"
            value={identificadorMuestra}
            label="Identificador de muestra"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleIdentificadorMuestra}
            error={errorIdentificadorMuestra}
            helperText={leyendaIdentificadorMuestra}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="entregadoPor"
            value={entregadoPor}
            label="Muestra entregada por"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleEntregadoPor}
            error={errorEntregadoPor}
            helperText={leyendaEntregadoPor}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              id="fechaMuestreo"
              label="Fecha de muestreo"
              value={fechaMuestra}
              onChange={handleFechaMuestra}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={errorFechaMuestra}
                  helperText={leyendaFechaMuestra}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              id="fechaVencimiento"
              label="Fecha de vencimiento"
              value={fechaVencimiento}
              onChange={handleFechaVencimiento}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={errorFechaVencimiento}
                  helperText={leyendaFechaVencimiento}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography> {tab} </Typography>
          <FormControl fullWidth error={errorMatriz}>
            <InputLabel required id="select-matriz">
              Matriz
            </InputLabel>
            <Select
              labelId="select-matriz"
              id="matriz"
              label="Matriz"
              onChange={handleMatriz}
              value={matriz}
            >
              <MenuItem value={"Efluentes"}>Efluentes</MenuItem>
              <MenuItem value={"Agua"}>Agua</MenuItem>
              <MenuItem value={"Alimentos"}>Alimentos</MenuItem>
              <MenuItem value={"Semillas"}>Semillas</MenuItem>
              <MenuItem value={"Lácteos"}>Lácteos</MenuItem>
            </Select>
            <FormHelperText>{leyendaMatriz}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography> {tab} </Typography>
          <FormControl fullWidth error={errorLaboratorio}>
            <InputLabel required id="select-laboratorio">
              Laboratorio
            </InputLabel>
            <Select
              labelId="select-laboratorio"
              id="laboratorio"
              label="Laboratorio"
              onChange={handleLaboratorio}
              value={laboratorio}
            >
              <MenuItem value={"Laboratorio 1"}>Laboratorio 1</MenuItem>
              <MenuItem value={"Laboratorio 2"}>Laboratorio 2</MenuItem>
              <MenuItem value={"Laboratorio 3"}>Laboratorio 3</MenuItem>
              <MenuItem value={"Laboratorio 4"}>Laboratorio 4</MenuItem>
              <MenuItem value={"Laboratorio 5"}>Laboratorio 5</MenuItem>
              <MenuItem value={"Laboratorio 6"}>Laboratorio 6</MenuItem>
            </Select>
            <FormHelperText>{leyendaLaboratorio}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Typography> {tab} </Typography>
      <Grid item xs={12} md={6}>
        <Typography> {tab} </Typography>
        <FormControl fullWidth error={errorEstadoMuestra}>
          <InputLabel required id="select-estadoMuestra">
            Estado de la muestra
          </InputLabel>
          <Select
            labelId="select-estadoMuestra"
            id="estadoMuestra"
            label="Estado de la muestra"
            onChange={handleEsatdoMuestra}
            value={estadoMuestra}
          >
            <MenuItem value={"Refrigerado"}>Refrigerado</MenuItem>
            <MenuItem value={"Temperatura ambiente"}>
              Temperatura ambiente
            </MenuItem>
          </Select>
          <FormHelperText>{leyendaEstadoMuestra}</FormHelperText>
        </FormControl>
        <Typography> {tab} </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="descMuestra"
          label="Descripción de la muestra"
          value={descMuestra}
          fullWidth
          multiline
          variant="standard"
          onChange={handleDescripcion}
          error={errorDescMuestra}
          helperText={leyendaDescMuestra}
        />
      </Grid>
    </React.Fragment>
  );
}
