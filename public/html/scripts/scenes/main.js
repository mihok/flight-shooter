function MainScene( Game ) {

    var self = new THREE.Scene();
    var hemisphereLight;
    var shadowLight;
    var terrain;

    self.gameObjects = [];

    // Add a fog effect to the scene.
    self.fog = new THREE.Fog(0xf7d9aa, 1000, 8000);

    //Create lights.
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;


    // Add lights to scene
    self.add(hemisphereLight);
    self.add(shadowLight);

    self.update = function( dt ) {
        for ( var i = 0, gameObject; gameObject = self.gameObjects[i]; i++ ) {
            gameObject.update( dt );
        }
    }

    //Draw the terrain.
    var terrain = new THREE.Object3D();
    var terrainGeometry = new THREE.BoxGeometry(10000, 1, 10000);
    var terrainMaterial = new THREE.MeshPhongMaterial({color: Engine.colors.brown, shading: THREE.FlatShading});
    var terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.add(terrainMesh);

    self.add(terrain);

    var sky = new Sky();
    sky.draw(self);


    var airplane = new Airplane();
    airplane.draw(self);

    self.gameObjects.push(airplane);

    return self;
}
