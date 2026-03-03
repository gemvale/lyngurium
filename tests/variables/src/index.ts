import { variables } from "lyngurium";

import "./index.css";

const themeBlue = "page[data-theme='blue']";

type Colors = {
    bg: string;
    font: string;
};

const colors: Colors = variables({
    bg: {
        default: "#fff",
        [themeBlue]: "#007acc",
    },
    font: {
        default: "#000",
        [themeBlue]: "#eee",
    },
});

export type { Colors };
export { colors };
