import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			"$convex/*": "src/convex/_generated/*",
			"$types": "src/app.d.ts"
		},
	}
};

export default config;
