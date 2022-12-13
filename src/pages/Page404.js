import {CssBaseline, Typography } from "@material-ui/core";
import React from "react";
import { Container} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();


function PagePrueba() {
  return (

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      
        
            <img src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png" alt="error404" style={{width: "500px",
    height: "500px", opacity: 0.7}}/>
        </Container>

        <Typography component="h1" variant="h4" align="center" color='primary'style={{opacity: 0.7}}>
              Ups! Algo salió mal...
            </Typography>
            <Typography component="h6" variant="h6" align="center" color='primary'style={{opacity: 0.5}}>
              No se pudo encontrar el sitio que deseas acceder
            </Typography>
      </ThemeProvider>

  );
}

export default PagePrueba;
