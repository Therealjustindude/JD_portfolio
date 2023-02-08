export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.jpeg"]),
	mimeTypes: {".jpeg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-a670c038.js","imports":["_app/immutable/start-a670c038.js","_app/immutable/chunks/index-af5367ce.js","_app/immutable/chunks/index-8c781af9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
