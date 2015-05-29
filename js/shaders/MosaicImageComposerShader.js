/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.MosaicImageComposerShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tOverlay": { type: "t", value: null },
		"opacity":  { type: "f", value: 1.0 },
		"innerWidth":  { type: "f", value: 2.0 },
		"innerHeight":  { type: "f", value: 2.0 },
		"overlayPictureId" : {type: "f", values: 0.0}
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

		"uniform float overlayPictureId;",

		"varying vec2 vUv;",

		"void main() {",
			"vec4 bestMatch;",
			"vec3 mosaicMapData;",
			"vec4 rgbOverlay;",
			"vec2 sizeScaling = vec2(1.0 / innerWidth, 1.0 / innerHeight);",
			"vec2 maxMosaicImagesPerAxis = vec2(floor(innerWidth / 20.0), floor(innerHeight / 20.0));",

			"vec2 currentMosaicMapPosition = vec2(floor(vUv.x * innerWidth / 20.0) / maxMosaicImagesPerAxis.x, floor(vUv.y * innerHeight / 20.0) / maxMosaicImagesPerAxis.y);",
			"mosaicMapData = texture2D(tDiffuse, currentMosaicMapPosition ).rgb;",
			"bestMatch = texture2D(tDiffuse, vUv );",
			"if (mosaicMapData.g < vUv.x ) {",
				"vec2 scaledOverlayCoor = vec2((vUv - currentMosaicMapPosition).x * innerWidth / 20.0, (vUv - currentMosaicMapPosition).y * innerHeight / 20.0);",
				"rgbOverlay = texture2D(tOverlay, vUv);",
				"bestMatch = vec4(rgbOverlay.r, rgbOverlay.g, rgbOverlay.b, 1.0);",				
			"}",				
			"//gl_FragColor = vec4(mosaicMapData.r, mosaicMapData.g, mosaicMapData.b, 1.0);",
			"gl_FragColor = vec4(bestMatch.r, bestMatch.g, bestMatch.b, 1.0);",
		"}"
	].join("\n")

};			