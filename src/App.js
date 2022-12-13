import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import DrawerLayout from "./layouts/Drawer";
import Main from "./layouts/Main";
//import Footer from "./layouts/Footer";

function App() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData === null) {
    return <Login navigate={navigate} />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerLayout navigate={navigate} />
        <Main />
      </Box>
    </>
  );
}

export default App;
