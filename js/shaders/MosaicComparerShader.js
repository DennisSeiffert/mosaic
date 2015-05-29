/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.MosaicComparerShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tOverlay": { type: "t", value: null },
		"opacity":  { type: "f", value: 1.0 },
		"innerWidth":  { type: "f", value: 2.0 },
		"innerHeight":  { type: "f", value: 2.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"uniform sampler2D tOverlay;",

		"uniform float innerWidth;",

		"uniform float innerHeight;",

		"varying vec2 vUv;",

		"void main() {",
			"vec4 bestMatch;",
			"vec3 rgbDiffuse;",
			"vec3 rgbOverlay;",
			"float pictureId;",


			"if (mod(vUv.x * innerWidth, 20.00000) < 1.0 && mod(vUv.y * innerHeight, 20.00000) < 1.0) {",
				"rgbDiffuse = texture2D(tDiffuse, vUv ).rgb;",
				"rgbOverlay = texture2D(tOverlay, vUv ).rgb;",
				"if (min(rgbDiffuse.r, rgbOverlay.r) == rgbDiffuse.r) {",
					"pictureId = rgbDiffuse.g;",
				"} else {",
					"pictureId = rgbOverlay.g;",
				"}",
				"bestMatch = vec4(min(rgbDiffuse.r, rgbOverlay.r), pictureId, 0.0, 1.0);",
				"gl_FragColor = bestMatch;",
			"} else {",
				"gl_FragColor = vec4(1.0,1.0,1.0,1.0);",
			"}",			
		"}"
	].join("\n")

};		


	// "vec2 mappedDataCount;",
	// 		"vec2 worldCoordinates;",
	// 		"vec2 steps;",

	// 		"mappedDataCount = vec2(innerWidth / 20.0, innerHeight / 20.0);",
	// 		"steps = vec2(1.0 / 20.0, 1.0 / 20.0);",

	// 		"if (vUv.x <= mappedDataCount.x && vUv.y <= mappedDataCount.y) {",
	// 			"worldCoordinates = vec2(vUv.x * steps.x, vUv.y * steps.y);",
	// 			"rgbDiffuse = texture2D(tDiffuse, worldCoordinates).rgb;",
	// 			"rgbOverlay = texture2D(tOverlay, worldCoordinates ).rgb;",
	// 			"if (min(rgbDiffuse.r, rgbOverlay.r) == rgbDiffuse.r) {",
	// 				"pictureId = rgbDiffuse.g;",
	// 			"} else {",
	// 				"pictureId = rgbOverlay.g;",
	// 			"}",
	// 			"bestMatch = vec4(min(rgbDiffuse.r, rgbOverlay.r), pictureId, 0.0, 1.0);",
	// 			"gl_FragColor = bestMatch;",
	// 		"} else {",
	// 			"gl_FragColor = vec4(1.0,1.0,1.0,1.0);",
	// 		"}",	