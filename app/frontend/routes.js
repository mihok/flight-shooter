/**
* Front-end routes
*/

module.exports = function( app ) {

    var frontend = require('./controllers/frontend');

    app.get('/', frontend.home);
};