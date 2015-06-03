/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MosaicPass = function ( shader, overlayPictureId, overlayTexture, innerWidth, innerHeight, stepSizeX, stepSizeY) {

	this.textureID = "tDiffuse";

	this.overlayID = "tOverlay";

	this.overlayTexture = overlayTexture;

	this.innerWidth = innerWidth;

	this.innerHeight = innerHeight;

	this.stepSizeX = stepSizeX;

	this.stepSizeY = stepSizeY;

	this.overlayPictureId = overlayPictureId;

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;


	this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
	this.scene  = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );

};

THREE.MosaicPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.uniforms[ this.textureID ].value = readBuffer;

		if(this.uniforms[ this.overlayID ]){
			this.uniforms[ this.overlayID ].value = this.overlayTexture;
		}

		this.uniforms[ "innerWidth" ].value = this.innerWidth;

		this.uniforms[ "innerHeight" ].value = this.innerHeight;

		this.uniforms[ "stepSizeX" ].value = this.stepSizeX;

		this.uniforms[ "stepSizeY" ].value = this.stepSizeY;

		if(this.uniforms[ "overlayPictureId" ]){
			this.uniforms[ "overlayPictureId" ].value = this.overlayPictureId;
		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

};
