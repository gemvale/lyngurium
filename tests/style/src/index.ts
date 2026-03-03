import { style } from "lyngurium";

import "./index.css";

const container: string = style({
    backgroundColor: "red",
    "@media screen and (max-width: 768px)": {
        backgroundColor: "cyan",
    },
    "@supports (hover: hover)": {
        backgroundColor: "yellow",
    },
    "&:active": {
        backgroundColor: "red",
    },
    "#child": {
        color: "white",
    },
    ".child": {
        color: "white",
    },
});

export { container };
