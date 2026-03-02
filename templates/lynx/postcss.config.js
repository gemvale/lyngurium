/** @type {import("@lyngurium/postcss").PluginOptions} */
const lynguriumConfig = {
    emit: true,
};

/** @type {import("postcss-load-config").Config} */
export default {
    plugins: {
        "@lyngurium/postcss": lynguriumConfig,
    },
};
