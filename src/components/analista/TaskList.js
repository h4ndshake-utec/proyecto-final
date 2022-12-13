import React, { useState, useEffect, useContext } from "react";
import { getTasksGroup, getVariablesTask } from "../../api/api";
import { Dialog } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Container } from "@mui/system";
import CheckoutAnalista from "./CheckoutAnalista";
import { SelectedRawContext } from "../../context/SelectedRawContext";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function TaskList() {
  useEffect(() => {
    loadTasks();
  }, []);

  const [selectedRaw, setSelectedRaw] = useContext(SelectedRawContext);
  const [taskList, setTaskList] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});

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

  async function loadTasks() {
    try {
      //llamada tareas de un grupo
      const tasks = await getTasksGroup();

      //Se cargan variables a tareas
      for (let i = 0; i < tasks.length; i++) {
        const variables = await getVariablesTask(tasks[i].id);
        const variableJson = await JSON.parse(variables.datosAnalisis.value);

        tasks[i] = {
          idTask: tasks[i].id,
          ...variableJson.cliente,
          ...variableJson.analisis,
        };
      }

      await setTaskList(tasks);
      await setIsLoading(false);
    } catch (error) {
      handleAlert({
        status: "error",
        message: "Error al cargar datos de análisis",
      });
      handleClickSlackBar();
    }
  }

  const onRawClick = (rowData, rowMeta) => {
    selectedRaw.analisis = taskList[rowMeta.dataIndex];
    setSelectedRaw(selectedRaw);
    handleDialog();
  };

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  //Opciones de filtros => ["dropdown","checkbox","multiselect","textField","custom"]
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
      label: "Fecha de recepcion",
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
  ];

  if (isLoading) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="lg"
          open={openDialog}
          onClose={handleDialog}
        >
          <CheckoutAnalista handleDialog={handleDialog} loadTasks={loadTasks} />
        </Dialog>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            mb: 4,
            marginTop: "100px",
            "& .css-1w1rijm-MuiButtonBase-root-MuiButton-root": {
              "text-transform": "none",
            },
          }}
        >
          <MUIDataTable
            title={"Muestras para analizar"}
            data={taskList}
            columns={columns}
            options={options}
          />
        </Container>
      </>
    );
  }
}

export default TaskList;
