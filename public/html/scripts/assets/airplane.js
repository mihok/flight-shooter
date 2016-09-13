function Airplane() {

    this.mesh;
    this.propellerSpeed = 20;

    document.addEventListener('mouseup', this.fireBullet);
}

Airplane.prototype.draw = function( scene ) {

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
    this.mesh.rotation.y = 1.5708;
    this.mesh.rotation.z = 0;

    scene.add(this.mesh);
}

Airplane.prototype.update = function( dt ) {

    //Set rotation based on mouse
    this.mesh.rotateX(Input.mouse.x * 5 * dt);

    this.mesh.position.y = this.mesh.position.y;
    this.mesh.position.x += (Input.mouse.x * 10 * dt);
    this.mesh.position.z -= (10 * dt);


    this.propeller.rotation.x += (this.propellerSpeed * dt);


    Engine.camera.position.x = this.mesh.position.x;
    Engine.camera.position.z = this.mesh.position.z + 200;
};
