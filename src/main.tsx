import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./bench.css";
import "./tailwind.css";
if (import.meta.env.DEV) void import("virtual:stylex:runtime");
createRoot(document.getElementById("root")!).render(<App />);
