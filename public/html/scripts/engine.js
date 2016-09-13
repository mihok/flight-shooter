function Engine() {

    this.currentScene;
    this.camera;
    this.renderer;
    this.time;

    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    this.colors = {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xF5986E,
        brownDark: 0x23190f,
        blue: 0x68c3c0,
    };

    return this;
}


Engine.prototype.init = function() {

    //Create the camera and the renderer.
    this.camera = new THREE.PerspectiveCamera(70, this.WIDTH / this.HEIGHT, 1, 1000);
    this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    this.renderer.setSize( this.WIDTH, this.HEIGHT );
    this.renderer.shadowMap.enabled = true;

    document.body.appendChild( this.renderer.domElement );
};


Engine.prototype.loadScene = function( scene ) {
    console.log('Loading new scene:', scene.name);
    this.currentScene = new scene(this);

    console.log('Scene loaded');
    console.log('Starting engine loop');
    console.log(this);
    this.loop();

};


Engine.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));

    var now = new Date().getTime(),
        dt = (now - (this.time || now) )/ 1000;

    this.time = now;

    //Update everything in current scene.
    this.currentScene.update( dt );

    //Render everything
    this.renderer.render(this.currentScene, this.camera);
}
