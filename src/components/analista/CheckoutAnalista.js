import React, { useContext, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AnalistaForm from "./AnalistaForm";
import RevisionAnalistaForm from "./RevisionAnalistaForm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SelectedRawContext } from "../../context/SelectedRawContext";
import { completeTaskById } from "../../api/api";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ErrorContext } from "../../context/ErrorContext";

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AnalistaForm />;
    case 1:
      return <RevisionAnalistaForm />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout(props) {
  const [selectedRaw, setSelectedRaw] = useContext(SelectedRawContext);

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Datos del análisis", "Revisión del ingreso"];
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});
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

  const handleNext = () => {
    setEnviar(true);
  };

  const handleBack = () => {
    setEnviar(false);
    setSinErrores(false);
    setActiveStep(activeStep - 1);
  };

  const handleFinalizar = async () => {
    const idTask = selectedRaw.analisis.idTask;
    delete selectedRaw.analisis["idTask"];
    const dataSendToCamunda = {
      variables: {
        ResultadosDelAnalisis: {
          value: JSON.stringify(selectedRaw),
          type: "String",
        },
      },
    };

    try {
      await completeTaskById(idTask, dataSendToCamunda);
    await setSelectedRaw({
      analisis: {
        nombre: "",
        apellido: "",
        empresa: "",
        localidad: "",
        tipoVinculo: "",
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
      resultadosAnalisis: {
        fechaAnalisis: null,
        observaciones: "",
        resultado: "",
      },
    });
    await setActiveStep(activeStep + 1);
    props.loadTasks();
    handleAlert({
      status: "success",
      message: "Análisis ingresada con éxito",
    });
    handleClickSlackBar();
    } catch (error) {
      handleAlert({ status: "error", message: "Error al ingresar análisis" });
      handleClickSlackBar();
    }
    
  };

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

        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Nuevo análisis
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
                  Datos cargados con exito!
                </Typography>
                <Typography variant="subtitle1">
                  Se enviará un correo al cliente con el informe de resultados
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={props.handleDialog}
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Volver a lista de tareas
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}

                <Grid container>
                  <Grid item xs={12} md={9}>
                    {activeStep !== 0 && (
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Volver
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={props.handleDialog}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant={"contained"}
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
                  </Grid>
                </Grid>
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