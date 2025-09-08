import "./assets/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Wikiverse } from "./app/wikiverse";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wikiverse />
  </StrictMode>
);
