import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import "dayjs/locale/es";

const tab = "\u00A0";

export default function Review(props) {
  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom disabled>
                Datos del Cliente
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    defaultValue={props.raw.nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    defaultValue={props.raw.apellido}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="localidad"
                    name="localidad"
                    label="Localidad"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    defaultValue={props.raw.localidad}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="empresa"
                    name="empresa"
                    label="Empresa"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    defaultValue={props.raw.empresa}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="idTipoVinculo"
                    name="tipoVinculo"
                    label="Tipo de Vínculo"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    defaultValue={props.raw.tipoVinculo}
                  />
                </Grid>
              </Grid>
              <Typography> {tab} </Typography>
              <Typography> {tab} </Typography>
            </Grid>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 2, background: "grey" }}
            />
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <Grid item xs={6}>
              <Typography> {tab} </Typography>
              <Typography variant="h6" gutterBottom disabled>
                Datos de la muestra
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="fechaMuestra"
                    label="Fecha de muestreo"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.fechaMuestra.split("T")[0]}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="fechaVencimiento"
                    label="Fecha de vencimiento"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.fechaVencimiento.split("T")[0]}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="tipoAnalisis"
                    label="Tipo de análisis"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.tipoAnalisis}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="nLote"
                    defaultValue={props.raw.nLote}
                    label="Numero de lote"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="matriz"
                    label="Matriz"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.matriz}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="laboratorio"
                    label="Laboratorio"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.laboratorio}
                  />
                </Grid>
                <Typography> {tab} </Typography>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="descMuestra"
                    label="Descripción de la muestra"
                    autoComplete="cc-name"
                    fullWidth
                    multiline
                    variant="outlined"
                    defaultValue={props.raw.descMuestra}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Typography> {tab} </Typography>
            <Typography> {tab} </Typography>
            <Divider variant="middle" />
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 2, background: "grey" }}
            />
            <Grid item xs={6}>
              <Typography> {tab} </Typography>
              <Typography variant="h6" gutterBottom>
                Datos del análisis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="fechaAnalisis"
                    label="Fecha de Aánisis"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.fechaAnalisis.split("T")[0]}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="matriz"
                    label="Matriz"
                    fullWidth
                    autoComplete="cc-name"
                    variant="outlined"
                    defaultValue={props.raw.resultado}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="observaciones"
                    label="Observaciones"
                    autoComplete="cc-name"
                    fullWidth
                    multiline
                    variant="outlined"
                    defaultValue={props.raw.observaciones}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
