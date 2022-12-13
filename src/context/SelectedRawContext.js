import React, { createContext, useState } from "react";

const SelectedRawContext = createContext();
const dataAnalisisInit = {
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
};
const SelectedRawProvider = ({ children }) => {
  const [selectedRaw, setSelectedRaw] = useState(dataAnalisisInit);

  return (
    <SelectedRawContext.Provider value={[selectedRaw, setSelectedRaw]}>
      {children}
    </SelectedRawContext.Provider>
  );
};

export { SelectedRawContext };
export default SelectedRawProvider;
