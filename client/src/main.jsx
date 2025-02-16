import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ActionsProvider from "./context/ActionsProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ActionsProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ActionsProvider>
);
