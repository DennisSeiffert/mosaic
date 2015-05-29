/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.MapShader = {

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

		"vec2 shift = vec2(1.0 / innerWidth, 1.0 / innerHeight);",

		"varying vec2 vUv;",

		"void main() {",
			"vec4 texel = texture2D( tDiffuse, vUv );",
			"vec4 texel1 = texture2D( tOverlay, vUv );",
			"vec3 sum;",
			"vec3 rgbDiffuse;",
			"vec3 rgbOverlay;",

			"//gl_FragColor =  texel;",
			"if (mod(floor(vUv.x * innerWidth), 20.00000) < 1.0 && mod(floor(vUv.y * innerHeight), 20.00000) < 1.0) {",
				"for (float i=0.0; i<10.0; i+=1.0) {",
					"for (float j=0.0; j<10.0; j+=1.0) {",
						"rgbDiffuse = texture2D(tDiffuse, vUv + vec2(shift.x * i, shift.y * j) ).rgb;",
						"rgbOverlay = texture2D(tOverlay, vUv + vec2(shift.x * i, shift.y * j) ).rgb;",					
						"sum += abs(rgbDiffuse - rgbOverlay);",
					"}",
				"}",
				"gl_FragColor = vec4(((sum * vec3(1.0/100.0,1.0/100.0,1.0/100.0)) * 1.0 / 3.0,0.0,0.0,1.0);",
			"} else {",
				"gl_FragColor = vec4(1.0,1.0,1.0,1.0); // texture2D(tDiffuse, vUv);",
			"}",			
		"}"

	].join("\n")

};
