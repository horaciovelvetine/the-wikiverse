import "./assets/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Wikiverse } from "../_v1/app/wikiverse";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wikiverse />
  </StrictMode>
);
