import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import TaskIcon from "@mui/icons-material/Task";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const tab = "\u00A0";

function Drawer({ navigate }) {
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClick = (path) => navigate(path);

  const handleLogOut = () => {
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => handleClick("home")}
            component="h6"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            LaabProject
          </Typography>
          <Typography>({userData.user})</Typography>
          <Typography>
            {" "}
            {tab} {tab} {tab}{" "}
          </Typography>

          <Button variant="outlined" color="inherit" onClick={handleLogOut}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {userData.groups.includes("recepcionista") ||
          userData.groups.includes("camunda-admin") ? (
            <>
              <ListItemButton onClick={() => handleClick("cliente")}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItemButton>
            </>
          ) : (
            <></>
          )}
          {userData.groups.includes("recepcionista") ||
          userData.groups.includes("camunda-admin") ? (
            <>
              <ListItemButton onClick={() => handleClick("recepcionista")}>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Ingresar muestra" />
              </ListItemButton>
            </>
          ) : (
            <></>
          )}

          {userData.groups.includes("analista") ||
          userData.groups.includes("camunda-admin") ? (
            <>
              <ListItemButton onClick={() => handleClick("analista")}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Análisis pendientes" />
              </ListItemButton>
            </>
          ) : (
            <></>
          )}
          {userData.groups.includes("analista") ||
          userData.groups.includes("camunda-admin") ||
          userData.groups.includes("facturador") ? (
            <>
              <ListItemButton onClick={() => handleClick("busqueda")}>
                <ListItemIcon>
                  <ManageSearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar análisis" />
              </ListItemButton>
            </>
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Drawer;
