function Bullet() {
    // Bullet
    this.mesh;
    this.timeToLive = 4;
    this.time = 0;
    this.speed = 500;
}

Bullet.prototype.draw = function() {
    this.mesh = new THREE.Object3D();
    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    var geom = new THREE.BoxGeometry(5,5,5);

    // create a material; a simple white material will do the trick
    var mat = new THREE.MeshPhongMaterial({
      color: Engine.colors.white,
    });

    // create the mesh by cloning the geometry
    var m = new THREE.Mesh(geom, mat);
    this.mesh.add(m);
};


Bullet.prototype.update = function( dt ) {
    var matrix = new THREE.Matrix4();
    matrix.extractRotation( this.mesh.matrix );

    var direction = new THREE.Vector3( 1, 0, 0 );
    direction = matrix.multiplyVector3( direction );

    this.mesh.position.x += direction.x * this.speed * dt;
    this.mesh.position.y = this.mesh.position.y;
    this.mesh.position.z += direction.z * this.speed * dt;

    this.time += dt;

    if ( this.time  > this.timeToLive ) {
        //Destroy.
        Engine.currentScene.remove(this.mesh);
    }
};
