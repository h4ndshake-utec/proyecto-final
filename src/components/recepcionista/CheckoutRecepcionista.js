import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchClient from "./SearchClient";
import AnalisisForm from "./MuestraForm";
import RevisionForm from "./RevisionMuestraForm";
import { DataContext } from "../../context/DataContext";
import { ErrorContext } from "../../context/ErrorContext";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  startProcess,
  getTaskByIdProcessInstance,
  completeTaskById,
} from "../../api/api";

const steps = ["Elegir cliente", "Datos de la muestra", "Revisión del ingreso"];
const theme = createTheme();

export default function CheckoutRecepcionista() {
  const [activeStep, setActiveStep] = useState(0);
  const [dataAnalisis, setdataAnalisis] = useContext(DataContext);
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});
  const [buttomSiguiente, setButtomSiguiente] = useState(false);
  const [enviar, setEnviar, sinErrores, setSinErrores] =
    useContext(ErrorContext);

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

  const handleNext = (event) => {
    setEnviar(true);
  };

  const handleBack = () => {
    setEnviar(false);
    setSinErrores(false);
    setActiveStep(activeStep - 1);
  };

  const handleNuevaMuestra = () => {
    setActiveStep(0);
  };

  const handleFinalizar = async () => {
    dataAnalisis.analisis.fechaRecepcion = new Date();
    setdataAnalisis(dataAnalisis);

    const dataSendToCamunda = {
      variables: {
        datosAnalisis: {
          value: JSON.stringify(dataAnalisis),
          type: "String",
        },
      },
    };
    try {
      const idProcess = await startProcess(dataSendToCamunda);
      const idTask = await getTaskByIdProcessInstance(idProcess);
      await completeTaskById(idTask);
      await setdataAnalisis({
        cliente: {
          nombre: "",
          apellido: "",
          empresa: "",
          localidad: "",
          tipoVinculo: "",
          direccion: "",
          telefono: "",
          correo: "",
        },
        analisis: {
          tipoAnalisis: "",
          nLote: "",
          fechaMuestra: null,
          fechaVencimiento: null,
          matriz: "",
          laboratorio: "",
          descMuestra: "",
          estadoMuestra: "",
          identificadorMuestra: "",
          entregadoPor: "",
          fechaRecepcion: null,
        },
      });
      handleAlert({
        status: "success",
        message: "Muestra ingresada con éxito",
      });
      handleClickSlackBar();
      await setActiveStep(activeStep + 1);
    } catch (error) {
      handleAlert({ status: "error", message: "Error al ingresar muestra" });
      handleClickSlackBar();
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SearchClient setButtomSiguiente={setButtomSiguiente} />;
      case 1:
        return <AnalisisForm />;
      case 2:
        return <RevisionForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    if (sinErrores) {
      setActiveStep(activeStep + 1);
      setEnviar(false)
      setSinErrores(false)
    }
  }, [sinErrores]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Nueva muestra
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom color="primary">
                  Muestra ingresada para analizar con exito!
                </Typography>
                <Typography variant="subtitle1">
                  Recuerda llevar la muestra al laboratorio enseguida.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={handleNuevaMuestra}
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Ingresar Nueva Muestra
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Volver
                    </Button>
                  )}

                  <Button
                    disabled={buttomSiguiente}
                    type="submit"
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleFinalizar
                        : handleNext
                    }
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
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
}
