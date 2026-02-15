import { createRequire } from "module";

const require = createRequire(import.meta.url);

let vitePreprocess;
try {
	// Try to load the Astro Svelte preprocess helper. If optional native
	// rollup binaries fail to install on some environments, this import may
	// throw — fall back to a noop preprocess to avoid crashing the dev server.
	vitePreprocess = require("@astrojs/svelte").vitePreprocess;
} catch (err) {
	// eslint-disable-next-line no-console
	console.warn("@astrojs/svelte vitePreprocess not available, using noop preprocess.", err?.message ?? err);
	vitePreprocess = () => ({});
}

export default {
	preprocess: vitePreprocess(),
};
