var XMEN = require('xmenio'),
    Socket = require('socket.io'),
    config = require('./config/config.js');

// XMEN.assemble(config); //This initializes the XMEN app

XMEN.loadConfig(config);
// XMEN.loadDB();
XMEN.loadExpress();
XMEN.loadHTTP();

var io = Socket(XMEN.server);
var players = [];

io.on('connection', function (client) {
  console.log('NEW CONNECTION', client);

  // client.join('world');

  // client.on('connection', function () {
  //   client.emit('new player');
  // });

  // client.on('disconnect', function () {
  //   client.emit('remove player');
  // });

  client.on('move player', function (data) {
    client.broadcast.emit('move player', { id: this.id, x: data.x, y: data.y, z: data.z });
  });

  client.on('new player', function (data) {
    // TODO: Create new player object

    // Emit new player to world
    client.broadcast.emit('new player', { id: this.id, x: data.x, y: data.y, z: data.z });

    // Forloop over current players send to new player
    for (var i = 0; i < players.length; i++) {
      client.emit('new player', players[i]);
    }

    // Add new player to player list
    players.push({ id: this.id, x: data.x, y: data.y, z: data.z });
  });

  // client.on('remove player', function (data) {
  //   client.emit('remove player', { id: data.id });
  // });
})

XMEN.initExpress();
XMEN.initCoreApps();
XMEN.initApps( XMEN.config.APP_ROOT, XMEN.installedApps );
XMEN.initAppViewPaths();