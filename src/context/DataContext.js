import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataAnalisis, setdataAnalisis] = useState({
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
      fechaRecepcion: null
    },
  });

  return (
    <DataContext.Provider value={[dataAnalisis, setdataAnalisis]}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
