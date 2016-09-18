var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'); // We dont want xmen to think our app is in our config folder

module.exports = {
    'development': {
        'DB': 'mongodb://localhost/flighter',   // MongoDB connection
        'PORT': process.env.PORT || 3000,       // Port to run XMEN on
        'SECRET': 'flight-shooter',             // Provide a project secret
        'APP_ROOT': rootPath + '/app',          // Define a custom app path
        'STATIC_ROOT': rootPath + '/public',    // Define a custom static file path
        'PUBLIC_URL': 'http://localhost:8000',  // Public URL
        'INSTALLED_APPS': [                     // Apps to be registered
            'frontend',
            'player'
        ]
    }
};