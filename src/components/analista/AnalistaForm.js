import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Container } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectedRawContext } from "../../context/SelectedRawContext";
import { ErrorContext } from "../../context/ErrorContext";
import FormHelperText from "@mui/material/FormHelperText";
import "dayjs/locale/es";

const tab = "\u00A0";

export default function EnsayoForm() {
  const [selectedRaw, setSelectedRaw] = useContext(SelectedRawContext);
  const [enviar, setEnviar, sinErrores, setSinErrores] =
    useContext(ErrorContext);
  const [fechaAnalisis, setFechaAnalisis] = useState(
    selectedRaw.resultadosAnalisis.fechaAnalisis
  );
  const [fechaRecepcion, setFechaRecepcion] = useState(
    selectedRaw.analisis.fechaRecepcion
  );
  const [observaciones, setObservaciones] = useState(
    selectedRaw.resultadosAnalisis.observaciones
  );
  const [resultado, setResultado] = useState(
    selectedRaw.resultadosAnalisis.resultado
  );

  const [errorFechaAnalisis, setErrorFechaAnalisis] = useState(false);
  const [leyendaFechaAnalisis, setLeyendaFechaAnalisis] = useState("");

  const [errorResultado, setErrorResultado] = useState(false);
  const [leyendaResultado, setLeyendaResultado] = useState("");

  const [errorObservaciones, setErrorObservaciones] = useState(false);
  const [leyendaObservaciones, setLeyendaObservaciones] = useState("");

  const handleErrorFields = () => {
    let error = false;

    if (fechaAnalisis === null) {
      setErrorFechaAnalisis(true);
      setLeyendaFechaAnalisis("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorFechaAnalisis(false);
      setLeyendaFechaAnalisis("");
    }
    

    if (resultado === "") {
      setErrorResultado(true);
      setLeyendaResultado("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else {
      setErrorResultado(false);
      setLeyendaResultado("");
    }

    if (observaciones === "") {
      setErrorObservaciones(true);
      setLeyendaObservaciones("Campo obligatorio");
      error = true;
      setEnviar(false);
    } else if (observaciones.length > 200) {
      setErrorObservaciones(true);
      setLeyendaObservaciones("Deben ser menos de 200 caracteres");
      error = true;
      setEnviar(false);
    } else {
      setErrorObservaciones(false);
      setLeyendaObservaciones("");
    }

    setSinErrores(!error);
  };

  const handleFechaAnalisis = (newValue) => {
    setFechaAnalisis(newValue);
    selectedRaw.resultadosAnalisis.fechaAnalisis = newValue;
    setSelectedRaw(selectedRaw);
  };

  const handleResultado = (event) => {
    setResultado(event.target.value);
    selectedRaw.resultadosAnalisis.resultado = event.target.value;
    setSelectedRaw(selectedRaw);
  };

  const handleObservaciones = (event) => {
    setObservaciones(event.target.value);
    selectedRaw.resultadosAnalisis.observaciones = event.target.value;
    setSelectedRaw(selectedRaw);
  };

  useEffect(() => {
    if (enviar) {
      handleErrorFields();
    }
  }, [enviar]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom disabled>
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
                defaultValue={selectedRaw.analisis.nombre}
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
                defaultValue={selectedRaw.analisis.apellido}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                disabled
                id="localidad"
                name="localidad"
                label="Localidad"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.localidad}
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
                defaultValue={selectedRaw.analisis.empresa}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                disabled
                id="idTipoVinculo"
                name="tipoVinculo"
                label="Tipo de vínculo"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.tipoVinculo}
              />
            </Grid>
          </Grid>
          <Typography> {tab} </Typography>
        </Grid>
        {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom disabled>
            Datos de la muestra
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  disabled={true}
                  label="Fecha de muestreo"
                  inputFormat="DD/MM/YYYY"
                  value={selectedRaw.analisis.fechaMuestra}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  disabled={true}
                  label="Fecha de vencimiento"
                  inputFormat="DD/MM/YYYY"
                  value={selectedRaw.analisis.fechaVencimiento}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  disabled={true}
                  label="Fecha de recepción"
                  inputFormat="DD/MM/YYYY"
                  value={selectedRaw.analisis.fechaRecepcion}
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="tipoAnalisis"
                label="Tipo de análisis"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.tipoAnalisis}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="nLote"
                defaultValue={selectedRaw.analisis.nLote}
                label="Numero de lote"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="matriz"
                label="Matriz"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.matriz}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="laboratorio"
                label="Laboratorio"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.laboratorio}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="identificadorMuestra"
                label="Identificador de muestra"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.identificadorMuestra}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                id="entregadoPor"
                label="Muestra entregada por"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                defaultValue={selectedRaw.analisis.entregadoPor}
              />
            </Grid>
            <Typography> {tab} </Typography>
            <Grid item xs={12} md={12}>
              <TextField
                disabled
                id="descMuestra"
                label="Descripción de la muestra"
                autoComplete="cc-name"
                fullWidth
                multiline
                variant="standard"
                defaultValue={selectedRaw.analisis.descMuestra}
              />
            </Grid>
          </Grid>
        </Grid>
        {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

        <Grid item xs={6}>
          <Typography> {tab} </Typography>
          <Typography variant="h6" gutterBottom>
            Datos del análisis
          </Typography>
          <Grid container spacing={3}>
            <Typography> {tab} </Typography>
            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  required
                  label="Fecha de análisis"
                  value={fechaAnalisis}
                  onChange={handleFechaAnalisis}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errorFechaAnalisis}
                      helperText={leyendaFechaAnalisis}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={errorResultado}>
                <InputLabel required id="select-laboratorio">
                  Resultado
                </InputLabel>
                <Select
                  labelId="select-laboratorio"
                  id="id-select-laboratorio"
                  label="Laboratorio"
                  onChange={handleResultado}
                  value={resultado}
                >
                  <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
                  <MenuItem value={"Liberado"}>Liberado</MenuItem>
                </Select>
                <FormHelperText>{leyendaResultado}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                error={errorObservaciones}
                helperText={leyendaObservaciones}
                id="obsMuestraMuestra"
                label="Observaciones"
                value={observaciones}
                fullWidth
                multiline
                variant="standard"
                onChange={handleObservaciones}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
