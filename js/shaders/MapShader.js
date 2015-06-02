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
		"// diffuse = mosaic image",
		"uniform sampler2D tDiffuse;",
		"// tOverlay = target image",
		"uniform sampler2D tOverlay;",

		"uniform float innerWidth;",

		"uniform float innerHeight;",

		"vec2 shift = vec2(1.0 / innerWidth, 1.0 / innerHeight);",
		"highp float stepX = 1.0 / innerWidth;",
		"highp float stepY = 1.0 / innerHeight;",
		"varying vec2 vUv;",

		"vec3 CalculateIntensity(vec2 pos){",
			"highp vec3 sum = vec3(0.0,0.0,0.0);",
			"highp float sumX = 0., sumY = 0., sumZ = 0.;",
			"highp vec3 intensityDifference;",
			"vec3 rgbDiffuse;",
			"vec3 rgbOverlay;",
			"for (float index=0.; index<100.; ++index) {",
						"float j = floor(index / 10.);",
						"float i =  j; //index - j * 10.; //mod(index / 10.);",
						"rgbDiffuse = texture2D(tDiffuse, pos + vec2(stepX * i, stepY * j)).rgb;",
						"rgbOverlay = texture2D(tOverlay, pos + vec2(stepX * i, stepY * j)).rgb;",					
						"//gl_FragColor = vec4(abs(rgbDiffuse - rgbOverlay), 1.0);",
						"//gl_FragColor = vec4(rgbOverlay,1.0);",
						"intensityDifference = abs(rgbDiffuse - rgbOverlay);",						
						"float tempX = intensityDifference.x + sum.x;",
						"sumX = tempX;",
						"float tempY = intensityDifference.y + sum.y;",
						"sumY = tempY;",
						"float tempZ = intensityDifference.z + sum.z;",
						"sumZ = tempZ;",
			"}",
			"return vec3(sumX, sumY, sumZ);",
		"}",

		"void main() {",
			"highp vec3 sum = vec3(0.0,0.0,0.0);",
			"highp vec3 intensityDifference;",
			"vec3 rgbDiffuse;",
			"vec3 rgbOverlay;",

			"gl_FragColor =  vec4(1.0,1.0,1.0,1.0);",
			"if (fract(gl_FragCoord.x / 20.0) < 0.05 && fract(gl_FragCoord.y / 20.0) < 0.05) {",
				"sum = CalculateIntensity(vUv);",
				"//for (float i=0.0; i<10.0; i+=1.0) {",
					"//for (float j=0.0; j<10.0; j+=1.0) {",
						"//rgbDiffuse = texture2D(tDiffuse, vUv + vec2(stepX * i, stepY * j)).rgb;",
						"//rgbOverlay = texture2D(tOverlay, vUv + vec2(stepX * i, stepY * j)).rgb;",					
						"//gl_FragColor = vec4(abs(rgbDiffuse - rgbOverlay), 1.0);",
						"//gl_FragColor = vec4(rgbOverlay,1.0);",
						"//intensityDifference = abs(rgbDiffuse - rgbOverlay);",						
						"//float sumX = intensityDifference.x + ",
						"//sum = vec3(intensityDifference.x + sum.x, intensityDifference.y, intensityDifference.z);",					
					"//}",
				"//}",
				"gl_FragColor = vec4(sum,1.0);",
				"//gl_FragColor =  vec4(0.0,0.0,0.0,1.0);",
			"} ",			
		"}"

	].join("\n")

};