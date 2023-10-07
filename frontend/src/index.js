import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./app";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
