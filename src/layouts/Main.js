import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "../components/analista/TaskList";
import Page404 from "../pages/Page404";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import CheckoutRecepcionista from "../components/recepcionista/CheckoutRecepcionista";
import Box from "@mui/material/Box";
import ListClients from "../components/cliente/ListClient";
import SearchList from "../components/analista/SearchList";

function Main() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          paddingTop: "100px",
        }}
      >
        <Suspense fallback={<p>"Cargando Datos..."</p>}>
          <Routes>
            <Route
              path="/analista"
              exact
              name="analista"
              element={
                <ProtectedRoute
                  isAllowed={
                    userData.groups.includes("analista") ||
                    userData.groups.includes("camunda-admin")
                  }
                >
                  <TaskList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recepcionista"
              exact
              name="recepcionista"
              element={
                <ProtectedRoute
                  isAllowed={
                    userData.groups.includes("recepcionista") ||
                    userData.groups.includes("camunda-admin")
                  }
                >
                  <CheckoutRecepcionista />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cliente"
              exact
              name="cliente"
              element={
                <ProtectedRoute
                  isAllowed={
                    userData.groups.includes("recepcionista") ||
                    userData.groups.includes("camunda-admin")
                  }
                >
                  <ListClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/busqueda"
              exact
              name="busqueda"
              element={
                <ProtectedRoute
                  isAllowed={
                    userData.groups.includes("analista") ||
                    userData.groups.includes("camunda-admin")
                  }
                >
                  <SearchList />
                </ProtectedRoute>
              }
            />
            <Route path="/home" exact name="home" element={<Home />} />
            <Route path="*" exact name="page404" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Box>
    </>
  );
}

export default Main;
