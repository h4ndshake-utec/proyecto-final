import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { DataContext } from "../../context/DataContext";
import moment from "moment";

export default function RevisionForm() {
  const [dataAnalisis] = useContext(DataContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de la solicitud de análisis
      </Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Cliente
          </Typography>
          <Typography gutterBottom>
            {dataAnalisis.cliente.nombre} {dataAnalisis.cliente.apellido}
          </Typography>
          <Typography gutterBottom>
            Empresa: {dataAnalisis.cliente.empresa}
          </Typography>
          <Typography gutterBottom>
            Vínculo: {dataAnalisis.cliente.tipoVinculo}
          </Typography>
          <Typography gutterBottom>
            Localidad: {dataAnalisis.cliente.localidad}
          </Typography>
        </Grid>

        <Grid item container direction="column">
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles
          </Typography>

          <Typography gutterBottom>
            Tipo de análisis: {dataAnalisis.analisis.tipoAnalisis}
          </Typography>
          <Typography gutterBottom>
            Nùmero de lote: {dataAnalisis.analisis.nLote}
          </Typography>
          <Typography gutterBottom>
            Identificador de la muestra:{" "}
            {dataAnalisis.analisis.identificadorMuestra}
          </Typography>
          <Typography gutterBottom>
            Muestra entregada por: {dataAnalisis.analisis.entregadoPor}
          </Typography>
          <Typography gutterBottom>
            Fecha de muestreo:
            {moment(dataAnalisis.analisis.fechaMuestra.toString())
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>
          <Typography gutterBottom>
            Fecha de vencimiento:
            {moment(dataAnalisis.analisis.fechaVencimiento.toString())
              .utc()
              .format("DD/MM/YYYY")}
          </Typography>

          <Typography gutterBottom>
            Matriz: {dataAnalisis.analisis.matriz}
          </Typography>
          <Typography gutterBottom>
            Laboratorio: {dataAnalisis.analisis.laboratorio}
          </Typography>
          <Typography gutterBottom>
            Estado de muestra: {dataAnalisis.analisis.estadoMuestra}
          </Typography>
          <Typography
            gutterBottom
            style={{ wordWrap: "break-word", width: "100%" }}
          >
            Descripción: {dataAnalisis.analisis.descMuestra}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
