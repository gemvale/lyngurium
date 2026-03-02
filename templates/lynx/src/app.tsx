import * as React from "@lynx-js/react";
import { keyframes, style } from "lyngurium";

import Arrow from "./assets/arrow.png";
import LynxLogo from "./assets/lynx-logo.png";
import ReactLynxLogo from "./assets/react-logo.png";

type AppProps = {
    onRender?: () => void;
};

const App = (props: AppProps): React.JSX.Element => {
    const [alterLogo, setAlterLogo] = React.useState<boolean>(false);

    React.useEffect((): void => {
        console.info("Hello, ReactLynx");
    }, []);

    props.onRender?.();

    const onTap = React.useCallback((): void => {
        "background only";
        setAlterLogo((prev: boolean): boolean => !prev);
    }, []);

    return (
        <view>
            <view className={background} />
            <view className={app}>
                <view className={banner}>
                    <view
                        className={logo}
                        bindtap={onTap}
                    >
                        {alterLogo ? (
                            <image
                                src={ReactLynxLogo}
                                className={logoReact}
                            />
                        ) : (
                            <image
                                src={LynxLogo}
                                className={logoLynx}
                            />
                        )}
                    </view>
                    <text className={title}>{"React"}</text>
                    <text className={subtitle}>{"on Lynx"}</text>
                </view>
                <view className={content}>
                    <image
                        src={Arrow}
                        className={arrow}
                    />
                    <text className={description}>
                        {"Tap the logo and have fun!"}
                    </text>
                    <text className={hint}>
                        {"Edit"}
                        <text className={hintText}>{" src/app.tsx "}</text>
                        {"to see updates!"}
                    </text>
                </view>
                <view className={blank} />
            </view>
        </view>
    );
};

const background: string = style({
    position: "fixed",
    background:
        "radial-gradient(71.43% 62.3% at 46.43% 36.43%, rgba(18, 229, 229, 0) 15%, rgba(239, 155, 255, 0.3) 56.35%, #ff6448 100%)",
    boxShadow: "0px 12.93px 28.74px 0px #ffd28db2 inset",
    borderRadius: "50%",
    width: "200vw",
    height: "200vw",
    top: "-60vw",
    left: "-14.27vw",
    transform: "rotate(15.25deg)",
});

const app: string = style({
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const banner: string = style({
    flex: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
});

const logo: string = style({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
});

const logoSpin: string = keyframes({
    from: {
        transform: "rotate(0deg)",
    },
    to: {
        transform: "rotate(360deg)",
    },
});

const logoReact: string = style({
    width: "100px",
    height: "100px",
    animationName: logoSpin,
    animationIterationCount: "infinite",
    animationDuration: "20s",
    animationTimingFunction: "linear",
});

const logoShake: string = keyframes({
    "0%": {
        transform: "scale(1)",
    },
    "50%": {
        transform: "scale(0.9)",
    },
    "100%": {
        transform: "scale(1)",
    },
});

const logoLynx: string = style({
    width: "100px",
    height: "100px",
    animationName: logoShake,
    animationIterationCount: "infinite",
    animationDuration: ".5s",
    animationTimingFunction: "linear",
});

const content: string = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const arrow: string = style({
    width: "24px",
    height: "24px",
});

const title: string = style({
    fontSize: "36px",
    fontWeight: "700",
});

const subtitle: string = style({
    fontStyle: "italic",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px",
});

const description: string = style({
    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.85)",
    margin: "15rpx",
});

const hint: string = style({
    fontSize: "12px",
    margin: "5px",
    color: "rgba(255, 255, 255, 0.65)",
});

const hintText: string = style({
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.85)",
});

const blank: string = style({
    flex: 1,
});

export { App };
