import React from "react";
import logo from "../images/logo.png";
import '../styles/Home.css'

function Bienvenida() {
  return (
    <>
      <section
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} className="App-logo" alt="logo" style={{width: "300px",
    height: "300px", opacity: 0.4}}/>
      </section>
      
    </>
  );
}

export default Bienvenida;
