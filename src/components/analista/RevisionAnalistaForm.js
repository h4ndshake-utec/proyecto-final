import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { SelectedRawContext } from "../../context/SelectedRawContext";
import moment from "moment";

export default function Review() {
  const [selectedRaw] = useContext(SelectedRawContext);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos del análisis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Cliente
          </Typography>
          <Typography gutterBottom>
            {selectedRaw.analisis.nombre} {selectedRaw.analisis.apellido}
          </Typography>
          <Typography gutterBottom>
            Empresa: {selectedRaw.analisis.empresa}
          </Typography>
          <Typography gutterBottom>
            Vínculo: {selectedRaw.analisis.tipoVinculo}
          </Typography>
          <Typography gutterBottom>
            Localidad: {selectedRaw.analisis.localidad}
          </Typography>
        </Grid>
        {/*//////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////*/}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos del análisis
          </Typography>
          <Typography gutterBottom>
            Fecha del análisis:
            {moment(selectedRaw.resultadosAnalisis.fechaAnalisis.toString())
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>

          <Typography gutterBottom>
            Observaciones: {selectedRaw.resultadosAnalisis.observaciones}
          </Typography>
          <Typography gutterBottom>
            Resultado: {selectedRaw.resultadosAnalisis.resultado}
          </Typography>
        </Grid>
         {/*//////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////*/}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos de la Muestra
          </Typography>
          <Typography gutterBottom>
            Identificador de la muestra: {selectedRaw.analisis.identificadorMuestra}
          </Typography>
          <Typography gutterBottom>
            Tipo de análisis: {selectedRaw.analisis.tipoAnalisis}
          </Typography>
          <Typography gutterBottom>
            Entregado por: {selectedRaw.analisis.entregadoPor}
          </Typography>
          <Typography gutterBottom>
            Nùmero de lote: {selectedRaw.analisis.nLote}
          </Typography>
          <Typography gutterBottom>
            Fecha de muestreo:
            {moment(selectedRaw.analisis.fechaMuestra)
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>
          <Typography gutterBottom>
            Fecha de vencimiento:
            {moment(selectedRaw.analisis.fechaVencimiento)
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>
          <Typography gutterBottom>
            Fecha de recepción:
            {moment(selectedRaw.analisis.fechaRecepcion)
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>
          <Typography gutterBottom>
            Matriz: {selectedRaw.analisis.matriz}
          </Typography>
          <Typography gutterBottom>
            Laboratorio: {selectedRaw.analisis.laboratorio}
          </Typography>
          <Typography gutterBottom>
            Estado de muestra: {selectedRaw.analisis.estadoMuestra}
          </Typography>
          <Typography
            gutterBottom
            style={{ wordWrap: "break-word", width: "100%" }}
          >
            Descripción: {selectedRaw.analisis.descMuestra}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
