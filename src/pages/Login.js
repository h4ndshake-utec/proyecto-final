import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { verificarUser, getGroupsByUser } from "../api/api";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login({ navigate }) {
  const theme = createTheme();
  const [openSlackBar, setOpenSlackBar] = useState(false);
  const [alert, setAlert] = useState({});

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © Laab Project - "}
        <Link color="inherit" href="https://handshake.uy/">
          H4ndshake
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const setUser = (userData) => {
    sessionStorage.setItem(
      "userData",
      JSON.stringify({
        user: userData.user,
        groups: userData.groups,
        auth: userData.auth,
      })
    );
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const datos = new FormData(event.currentTarget);
      const auth = await verificarUser(
        datos.get("user"),
        datos.get("password")
      );
      const group = await getGroupsByUser(datos.get("user"));

      let groups = [];
      group.forEach((e) => {
        groups.push(e.id);
      });

      const userData = {
        user: datos.get("user"),
        groups: groups,
        auth: auth,
      };
      if (auth) {
        setUser(userData);
      } else {
        handleAlert({
          status: "error",
          message: "Usuario o contraseña incorrectos",
        });
        handleClickSlackBar();
      }
      navigate("/home");

    } catch (error) {
      handleAlert({
        status: "error",
        message: "No hay conexión con el sistema",
      });
      handleClickSlackBar();
    }
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

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581091007718-0c50d599bfd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)",
            //"url(https://images.unsplash.com/photo-1630959305606-3123a081dada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contrseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
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
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
