/**
 * Front-end Controller
 */
exports.home = function( req, res ) {
    res.render('empty', {
        app: req.app.get('config').APP
    });
};