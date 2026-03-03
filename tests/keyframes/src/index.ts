import { keyframes } from "lyngurium";

import "./index.css";

const fadeIn: string = keyframes({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
});

const spin: string = keyframes({
    from: {
        transform: "rotate(0deg)",
    },
    to: {
        transform: "rotate(360deg)",
    },
});

export { fadeIn, spin };
