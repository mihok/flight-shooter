function Input() {

    this.mouse = {
        x: 0,
        y: 0
    };

    var self = this;

    document.addEventListener('mousemove', function (event) {
        // here we are converting the mouse position value received
        // to a normalized value varying between -1 and 1;
        // this is the formula for the horizontal axis:

        var tx = -1 + (event.clientX / Engine.WIDTH)*2;

        // for the vertical axis, we need to inverse the formula
        // because the 2D y-axis goes the opposite direction of the 3D y-axis

        var ty = 1 - (event.clientY / Engine.HEIGHT)*2;

        self.mouse = {
          x: tx,
          y: ty
        };

    }, false);
}

var Input = new Input();
