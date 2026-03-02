import "@lynx-js/preact-devtools";
import "@lynx-js/react/debug";

import { root } from "@lynx-js/react";

import { App } from "./app";

import "./styles/index.css";

root.render(<App />);

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
}
