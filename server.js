var XMEN = require('xmenio'),

    Socket = require('socket.io'),
    io,

    config = require('./config/config.js'),

    players = [],
    playerById = function playerById (id) {
      var player = false;

      for (var i = 0; i < players.length; i++) {
        if (players[i].session.id == id) {
          player = players[i];
          break;
        }
      }

      return player;
    },
    player = require('./app/player'),
    Player = player.models.Player,
    PlayerSession = player.models.Session,

    // TODO: Dont do this, use the player's login info
    playerNames = ['Bob', 'Alice', 'Gerry', 'Larry', 'Sarah'];

// XMEN.assemble(config); //This initializes the XMEN app

XMEN.loadConfig(config);
// XMEN.loadDB();
XMEN.loadExpress();
XMEN.loadHTTP();

io = Socket(XMEN.server);

io.on('connection', function (client) {
  console.log('NEW CONNECTION', client);

  // client.on('connection', function () {
  //   client.emit('new player');
  // });

  // client.on('disconnect', function () {
  //   client.emit('remove player');
  // });

  client.on('move player', function (data) {
    var movePlayer = playerById(this.id);

    if (!movePlayer) {
        console.error('ERROR', 'Player not found: ' + this.id);
        return;
    };

    movePlayer.session.position.x = data.x;
    movePlayer.session.position.y = data.y;
    movePlayer.session.position.z = data.z;

    this.broadcast.emit( 'move player', Object.assign( {}, { id: movePlayer.session.id }, movePlayer.session.position ) );
  });

  client.on('new player', function (data) {
    var newPlayer = new Player({
      username: playerNames[ Math.floor(Math.random() * plyerNames.length) ],
      session: new PlayerSession({
        id: this.id,
        position: {
          x: data.x,
          y: data.y,
          z: data.z
        }
      })
    });

    // Emit new player to world
    this.broadcast.emit( 'new player', Object.assign( {}, { id: newPlayer.session.id }, newPlayer.session.position ) );

    // Forloop over current players send to new player
    for (var i = 0; i < players.length; i++) {
      this.emit( 'new player', Object.assign( {}, { id: players[i].session.id }, players[i].session.position ) );
    }

    // Add new player to player list
    players.push(newPlayer);
  });

  // client.on('remove player', function (data) {
  //   client.emit('remove player', { id: data.id });
  // });
})

XMEN.initExpress();
XMEN.initCoreApps();
XMEN.initApps( XMEN.config.APP_ROOT, XMEN.installedApps );
XMEN.initAppViewPaths();