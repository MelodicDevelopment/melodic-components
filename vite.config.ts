import { defineConfig, UserConfigExport } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteTs from 'vite-plugin-ts';

export default defineConfig((_: UserConfigExport) => {
	return {
		plugins: [tsconfigPaths(), viteTs()]
	};
});
