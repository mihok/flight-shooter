function Airplane() {

    this.mesh;
    this.propellerSpeed = 20;
    var self = this;
    window.onkeyup = function() {
        self.fireBullet();
    };
}

Airplane.prototype.draw = function( scene ) {

    this.plane = new THREE.Object3D();
    this.mesh = new THREE.Object3D();

    // Create the cabin
    var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
    var matCockpit = new THREE.MeshPhongMaterial({color:Engine.colors.red, shading:THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Create the engine
    var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
    var matEngine = new THREE.MeshPhongMaterial({color:Engine.colors.white, shading:THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Create the tail
    var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
    var matTailPlane = new THREE.MeshPhongMaterial({color:Engine.colors.red, shading:THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35,25,0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Create the wing
    var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
    var matSideWing = new THREE.MeshPhongMaterial({color:Engine.colors.red, shading:THREE.FlatShading});
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // propeller
    var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
    var matPropeller = new THREE.MeshPhongMaterial({color:Engine.colors.brown, shading:THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
    var matBlade = new THREE.MeshPhongMaterial({color:Engine.colors.brownDark, shading:THREE.FlatShading});

    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);

    this.mesh.scale.set(0.25, 0.25, 0.25);
    this.mesh.position.y = 50;
    this.mesh.rotation.x = 0;
    this.mesh.rotation.y = 0;
    this.mesh.rotation.z = 0;

    Engine.camera.position.x = this.mesh.position.x - 200;
    Engine.camera.position.y = this.mesh.position.y + 50;
    Engine.camera.position.z = this.mesh.position.z;

    this.plane.add(this.mesh);
    this.plane.add(Engine.camera);

    Engine.camera.lookAt(this.mesh.position);

    scene.add(this.plane);
}

Airplane.prototype.update = function( dt ) {
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( this.plane.matrix );

    var direction = new THREE.Vector3( 1, 0, Input.mouse.x );
    direction = matrix.multiplyVector3( direction );

    this.plane.position.x += direction.x;
    this.plane.position.y = this.plane.position.y;
    this.plane.position.z += direction.z;

    // this.mesh.rotateX(Input.mouse.x * dt);
    this.plane.rotateY((Input.mouse.x * -1) * dt);

    var maxX = 0.52;
    var minX = -0.52;
    var rotateX = this.mesh.rotation.x;
    if ( rotateX < maxX && Input.mouse.x > 0) {
        this.mesh.rotateX((Input.mouse.x) * 5 * dt);
    } else if ( rotateX > minX && Input.mouse.x < 0) {
        this.mesh.rotateX((Input.mouse.x) * 5 * dt);
    }

    this.propeller.rotation.x += (this.propellerSpeed * dt);
};

Airplane.prototype.fireBullet = function() {
    var newBullet = new Bullet();

    newBullet.draw(Engine.currentScene);
    Engine.currentScene.add(newBullet.mesh);

    newBullet.mesh.position.x = this.plane.position.x + 10;
    newBullet.mesh.position.y = this.mesh.position.y;
    newBullet.mesh.position.z = this.plane.position.z;

    newBullet.mesh.rotation.set(
        this.plane.rotation.x,
        this.plane.rotation.y,
        this.plane.rotation.z
    );


    Engine.currentScene.gameObjects.push(newBullet);
};
