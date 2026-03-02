import type * as React from "react";

const App = (): React.JSX.Element => {
    return (
        // @ts-expect-error
        <lynx-view
            style={{
                height: "100vh",
                width: "100vw",
            }}
            url="/main.web.bundle"
        />
    );
};

export { App };
