import React, { createContext, useState } from "react";

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [enviar, setEnviar] = useState(false);
  const [sinErrores, setSinErrores] = useState(false);

  return (
    <ErrorContext.Provider
      value={[enviar, setEnviar, sinErrores, setSinErrores]}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext };
export default ErrorProvider;
