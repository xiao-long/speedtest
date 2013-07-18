
/**
 * Module dependencies.
 */

var express = require('express')
, app = express()
, api = require('./server/controllers/api/applications')
, main = require('./server/controllers/main')
, server = require('http').createServer(app)
, path = require('path');

//var ;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir:'./tmp_uploads'}));
    app.use(express.methodOverride());
    app.use(express.cookieParser('89AF7B3B-E79E-2709-1FFD-7E6630F0F292'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({
        src: __dirname + ''
    }));
    app.use(express.static(path.join(__dirname, './')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

main.init(app);
api.init(app);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});



