import React, { useState } from "react";

function App() {


  const handleSubmit = e => {
    e.preventDefault();

    const data = {};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:8080/engine-rest/process-definition/key/ProcesoLaboratorio/start", requestOptions)
      .then(response => response.json())
      .then(res => console.log(res));
      alert('Nuevo proceso de analisis inciado');
  };

  return (
      <div className="container">
        <h1></h1>
        <img src="https://i.ibb.co/0JdLMhV/09-Isotipo-1.png"/>  <div><p></p></div>
        <h2>Laab Project</h2> <div><p></p></div> 
        <h6>Para validar la arquitectura, iniciaremos el proceso de negocio del cliente, usando una API REST</h6>
        <form>
          <button type="submit" onClick={handleSubmit}>
          Iniciar Proceso
          </button>
                     <p> Presiona el boton para iniciar el proceso de análisis</p>
        </form>
      </div>
  );
}

export default App;