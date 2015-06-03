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
		"innerHeight":  { type: "f", value: 2.0 },
		"stepSizeX": { type: "f", value: 1.0 },
		"stepSizeY": { type: "f", value: 1.0 }

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
		"// diffuse = mosaic image",
		"uniform sampler2D tDiffuse;",
		"// tOverlay = target image",
		"uniform sampler2D tOverlay;",

		"uniform float innerWidth;",
		"uniform float innerHeight;",

		"uniform float stepSizeX;",
		"uniform float stepSizeY;",

		"vec2 shift = vec2(1.0 / innerWidth, 1.0 / innerHeight);",
		"highp float stepX = stepSizeX / innerWidth;",
		"highp float stepY = stepSizeY / innerHeight;",
		"varying vec2 vUv;",

		"vec3 CalculateIntensity(vec2 pos, float stepX, float stepY){",
			"highp vec3 sum = vec3(0.0,0.0,0.0);",
			"highp float sumX = 0., sumY = 0., sumZ = 0.;",
			"highp vec3 intensityDifference;",

			"vec3 d_i00 = texture2D(tDiffuse, pos).rgb;",
			"vec3 d_i01 = texture2D(tDiffuse, pos + vec2(1.0 * stepX, 0.0)).rgb;",
			"vec3 d_i02 = texture2D(tDiffuse, pos + vec2(2.0 * stepX, 0.0)).rgb;",
			"vec3 d_i10 = texture2D(tDiffuse, pos + vec2(0.0, 1.0 * stepY)).rgb;",
			"vec3 d_i11 = texture2D(tDiffuse, pos + vec2(1.0* stepX, 1.0 * stepY)).rgb;",
			"vec3 d_i12 = texture2D(tDiffuse, pos + vec2(2.0* stepX, 1.0 * stepY)).rgb;",
			"vec3 d_i20 = texture2D(tDiffuse, pos + vec2(0.0, 2.0 * stepY)).rgb;",
			"vec3 d_i21 = texture2D(tDiffuse, pos + vec2(1.0* stepX, 2.0 * stepY)).rgb;",
			"vec3 d_i22 = texture2D(tDiffuse, pos + vec2(2.0* stepX, 2.0 * stepY)).rgb;",

			"vec3 t_i00 = texture2D(tOverlay, pos).rgb;",
			"vec3 t_i01 = texture2D(tOverlay, pos + vec2(1.0 * stepX, 0.0)).rgb;",
			"vec3 t_i02 = texture2D(tOverlay, pos + vec2(2.0 * stepX, 0.0)).rgb;",
			"vec3 t_i10 = texture2D(tOverlay, pos + vec2(0.0, 1.0 * stepY)).rgb;",
			"vec3 t_i11 = texture2D(tOverlay, pos + vec2(1.0 * stepX, 1.0 * stepY)).rgb;",
			"vec3 t_i12 = texture2D(tOverlay, pos + vec2(2.0 * stepX, 1.0 * stepY)).rgb;",
			"vec3 t_i20 = texture2D(tOverlay, pos + vec2(0.0, 2.0 * stepY)).rgb;",
			"vec3 t_i21 = texture2D(tOverlay, pos + vec2(1.0 * stepX, 2.0 * stepY)).rgb;",
			"vec3 t_i22 = texture2D(tOverlay, pos + vec2(2.0 * stepX, 2.0 * stepY)).rgb;",
	
			"vec3 diffuseIntensity = 0.11111111 * (d_i00 + d_i01 + d_i02 + d_i10 + d_i11 + d_i12 + d_i20 + d_i21 + d_i22);",
			"vec3 OverlayIntensity = 0.11111111 * (t_i00 + t_i01 + t_i02 + t_i10 + t_i11 + t_i12 + t_i20 + t_i21 + t_i22);",
			"intensityDifference = abs(diffuseIntensity - OverlayIntensity);",
			"return intensityDifference;",		
		"}",

		"void main() {",
			"highp vec3 sum = vec3(0.0,0.0,0.0);",

			"gl_FragColor =  vec4(1.0,1.0,1.0,1.0);",
			"if (fract(gl_FragCoord.x / (3.0 * stepSizeX)) < 0.2 && fract(gl_FragCoord.y / (3.0 * stepSizeY)) < 0.2) {",
				"sum = CalculateIntensity(vUv, stepX, stepY); //texture2D(tDiffuse, vUv).rgb; //",
				"gl_FragColor = vec4(sum,1.0);",
			"} ",			
		"}"

	].join("\n")

};