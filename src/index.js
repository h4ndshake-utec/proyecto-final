import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DataProvider from "./context/DataContext";
import SelectedRawProvider from "./context/SelectedRawContext";
import ErrorProvider from "./context/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorProvider>
    <DataProvider>
      <SelectedRawProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SelectedRawProvider>
    </DataProvider>
  </ErrorProvider>
);
