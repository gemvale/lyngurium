import * as React from "react";
import * as DOM from "react-dom/client";

import { App } from "./app";

import "@lynx-js/web-core/index.css";
import "@lynx-js/web-elements/index.css";
import "@lynx-js/web-core";
import "@lynx-js/web-elements/all";

import "./styles/index.css";

const root = document.getElementById("root");

if (!root) throw new Error("Failed to find root element");

DOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
