import React, { useState } from "react";
import { Dialog } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Container } from "@mui/system";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import IconButton from "@mui/material/IconButton";
import { getProccessByDates, getHistoryVarableInstance } from "../../api/api";
import {
  cambiarFechaInicio,
  cambiarFechaFin,
} from "../../utils/changeDateForCamunda";
import ViewAnalisisForm from "./ViewAnalisisForm";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const tab = "\u00A0";

export default function TaskList() {
  const [listaAnalisis, setListaAnalisis] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [raw, setRaw] = useState({});
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});

  const [errorFechaInicio, setErrorFechaInicio] = useState(false);
  const [leyendaFechaInicio, setLeyendaFechaInicio] = useState("");
  const [errorFechaFin, setErrorFechaFin] = useState(false);
  const [leyendaFechaFin, setLeyendaFechaFin] = useState("");

  const handleErrorFields = () => {
    let error = false;

    if (fechaInicio === null) {
      setErrorFechaInicio(true);
      setLeyendaFechaInicio("Campo obligatorio");
      error = true;
    } else {
      setErrorFechaInicio(false);
      setLeyendaFechaInicio("");
    }

    if (fechaFin === null) {
      setErrorFechaFin(true);
      setLeyendaFechaFin("Campo obligatorio");
      error = true;
    } else {
      setErrorFechaFin(false);
      setLeyendaFechaFin("");
    }

    if (fechaFin !== null && fechaInicio !== null) {
      if (fechaInicio > fechaFin) {
        setErrorFechaFin(true);
        setLeyendaFechaFin("Debe ser mayor a la fecha de inicio");
        setErrorFechaInicio(true);
        setLeyendaFechaInicio("Debe ser menor a la fecha de fin");
        error = true;
      } else {
        setErrorFechaFin(false);
        setLeyendaFechaFin("");
        setErrorFechaInicio(false);
        setLeyendaFechaInicio("");
      }
    }

    return error;
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

  async function loadAnalisis() {
    try {
      const analisisPorFecha = await getProccessByDates(
        cambiarFechaInicio(fechaInicio),
        cambiarFechaFin(fechaFin)
      );

      //Se cargan variables a tareas
      for (let i = 0; i < analisisPorFecha.length; i++) {
        const variables = await getHistoryVarableInstance(
          analisisPorFecha[i].id
        );

        await variables.forEach((analisis) => {
          if (analisis.name === "ResultadosDelAnalisis") {
            analisisPorFecha[i] = {
              id: analisisPorFecha[i].id,
              ...JSON.parse(analisis.value).analisis,
              ...JSON.parse(analisis.value).resultadosAnalisis,
            };
          }
        });
      }

      await setListaAnalisis(analisisPorFecha);
    } catch (error) {
      handleAlert({
        status: "error",
        message: "Error al cargar datos de análisis",
      });
      handleClickSlackBar();
    }
  }

  const onRawClick = (rowData, rowMeta) => {
    setRaw(listaAnalisis[rowMeta.dataIndex]);
    handleDialog();
  };

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleSearch = async () => {
    if (handleErrorFields() !== true) {
      loadAnalisis();
    }
  };

  const handelFechaInicio = (newValue) => {
    setFechaInicio(newValue);
  };

  const handleFechaFin = (newValue) => {
    setFechaFin(newValue);
  };

  const options = {
    filterType: "textField",
    selectableRows: "none",
    onRowClick: onRawClick,
    tableBodyHeight: "700px",
    tableBodyMaxHeight: "700px",
    rowsPerPageOptions: [10, 30, 70, 100],
    textLabels: {
      body: {
        noMatch: "No hay análisis pendientes",
      },
      pagination: {
        next: "Página siguiente",
        previous: "Página anterior",
        rowsPerPage: "Filas por páginas:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Limpiar ",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
    },
  };

  const columns = [
    {
      name: "fechaRecepcion",
      label: "Fecha de recepción",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).utc().format("DD/MM/YYYY");
        },
      },
    },
    {
      name: "empresa",
      label: "Empresa",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipoAnalisis",
      label: "Tipo de análisis",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "laboratorio",
      label: "Laboratorio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "descMuestra",
      label: "Descripción de la muestra",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "fechaAnalisis",
      label: "Fecha de análisis",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).utc().format("DD/MM/YYYY");
        },
      },
    },
    {
      name: "resultado",
      label: "Resultado",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "observaciones",
      label: "Observaciones",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Container sx={{ mb: 4, marginTop: "50px" }}>
            <Typography variant="h5" gutterBottom={true} alignItems="stretch">
              Buscar análisis
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Desde"
                value={fechaInicio}
                onChange={handelFechaInicio}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    error={errorFechaInicio}
                    helperText={leyendaFechaInicio}
                  />
                )}
                sx={{ padding: 2 }}
              />
            </LocalizationProvider>
            <Typography style={{ display: "inline-block" }}>
              {tab}
              {tab}
              {tab}
              {tab}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Hasta"
                value={fechaFin}
                onChange={handleFechaFin}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    error={errorFechaFin}
                    helperText={leyendaFechaFin}
                  />
                )}
              />
            </LocalizationProvider>
            <Typography style={{ display: "inline-block" }}>
              {tab}
              {tab}
            </Typography>
            <IconButton onClick={handleSearch}>
              <SearchIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Container>
          <Container
            sx={{
              mb: 4,
              marginTop: "50px",
              "& .css-1w1rijm-MuiButtonBase-root-MuiButton-root": {
                "text-transform": "none",
              },
            }}
          >
            <MUIDataTable
              data={listaAnalisis}
              columns={columns}
              options={options}
            />
          </Container>
        </Paper>
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
        <Dialog
          fullWidth
          maxWidth="lg"
          open={openDialog}
          onClose={handleDialog}
        >
          {<ViewAnalisisForm handleDialog={handleDialog} raw={raw} />}
        </Dialog>
      </Container>

      <></>
    </>
  );
}
