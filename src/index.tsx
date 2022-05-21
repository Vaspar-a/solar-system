import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PlayContextProvider from "./context/PlayContext";

ReactDOM.render(
  <React.StrictMode>
    <PlayContextProvider>
      <App />
    </PlayContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
