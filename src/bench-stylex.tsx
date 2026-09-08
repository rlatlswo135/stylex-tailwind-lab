import { createRoot } from "react-dom/client";
import { Benchmark } from "./benchmark";
import { StudyCard } from "./stylex/study-card";
import "./bench.css";
if (import.meta.env.DEV) void import("virtual:stylex:runtime");
createRoot(document.getElementById("root")!).render(
  <Benchmark library="stylex" Card={StudyCard} />,
);
