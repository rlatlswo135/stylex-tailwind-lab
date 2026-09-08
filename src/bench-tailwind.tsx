import { createRoot } from "react-dom/client";
import { Benchmark } from "./benchmark";
import { StudyCard } from "./tailwind/study-card";
import "./bench.css";
import "./bench-tailwind.css";
createRoot(document.getElementById("root")!).render(
  <Benchmark library="tailwind" Card={StudyCard} />,
);
