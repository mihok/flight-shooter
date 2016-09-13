function onload() {
    window.Engine = new Engine();

    Engine.init();
    Engine.loadScene(MainScene);
}

window.addEventListener('load', onload, false);
