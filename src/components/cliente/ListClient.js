import React, { useState, useEffect } from "react";
import { getClientes } from "../../api/api";
import ClientForm from "./ClientForm";
import { Dialog } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { Add, Padding } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import NewClientForm from "./NewClientForm";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const tab = "\u00A0";

function ListClient() {
  const [clientes, setClientes] = useState([]);
  const [selectedRaw, setSelectedRaw] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogNewClient, setOpenDialogNewClient] = useState(false);
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

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleDialogNewClient = () => {
    setOpenDialogNewClient((prev) => !prev);
  };

  async function loadClients() {
    try {
      const clientesFromApi = await getClientes();
      await setClientes(clientesFromApi);
      await setIsLoading(false);
    } catch (error) {
      handleAlert({
        status: "error",
        message: "Error al cargar datos de clientes",
      });
      handleClickSlackBar();
    }
  }

  const onRawClick = async (rowData, rowMeta) => {
    const fila = {
      id: rowData[0],
      nombre: rowData[1],
      apellido: rowData[2],
      empresa: rowData[3],
      direccion: rowData[4],
      localidad: rowData[5],
      tipoVinculo: rowData[6],
      telefono: rowData[7],
      correo: rowData[8],
    };

    setSelectedRaw(fila);
    handleDialog();
  };

  useEffect(() => {
    loadClients();
  }, [clientes]);

  useEffect(() => {
    if (alert.message !== "" && alert.message !== undefined) {
      handleClickSlackBar();
    }
  }, [alert]);

  const options = {
    filterType: "textField",
    selectableRows: "none",
    onRowClick: onRawClick,
    tableBodyHeight: "700px",
    tableBodyMaxHeight: "700px",
    rowsPerPageOptions: [10, 30, 70, 100],
    textLabels: {
      body: {
        noMatch: "No existen clientes, presione Nuevo para agregarlo",
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
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "apellido",
      label: "Apellido",
      options: {
        filter: true,
        sort: true,
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
      name: "direccion",
      label: "Dirección",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "localidad",
      label: "Localidad",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipoVinculo",
      label: "Vínculo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "telefono",
      label: "Telefono",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "correo",
      label: "Correo",
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
              severity={alert.status === "error" ? "error" : "success"}
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
          maxWidth="sm"
          open={openDialog}
          onClose={handleDialog}
        >
          <ClientForm
            handleDialog={handleDialog}
            selectedRaw={selectedRaw}
            loadClients={loadClients}
            handleAlert={handleAlert}
          />
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialogNewClient}
          onClose={handleDialogNewClient}
        >
          <NewClientForm
            handleDialog={handleDialogNewClient}
            loadClients={loadClients}
            handleAlert={handleAlert}
          />
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
            title={"Clientes"}
            data={clientes}
            columns={columns}
            options={options}
          />
          <Typography> {tab} </Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            size="medium"
            onClick={handleDialogNewClient}
          >
            Nuevo
          </Button>
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
        </Container>
      </>
    );
  }
}

export default ListClient;
