#!/usr/bin/env node

// This is a simple example sharejs server which hosts the sharejs
// examples in examples/.
// 
// It demonstrates a few techniques to get different application behaviour.

require('coffee-script'); 
var configPort=require("../../ConfigPorts.js");
var connect = require('connect'),
	sharejs = require('../src'),
	hat = require('hat').rack(32, 36);

var argv = require('optimist').
	usage("Usage: $0 [-p portnum]").
	default('p', 8089).
	alias('p', 'port').
	argv;
var isValidUser=function(id,session){console.log('Llegoa console.log id: '+id+'  session: '+session);
	var file=fs.readFileSync(matchFile,"utf8");
        var users=file.split(';');
        for(var i in users){
		var ses=users[i].split(':');
                if(ses[0]==id){
			if(ses[1]==session && ses[1]!='*.*')
				return true;
			else 
				return false;
		}

  	}
       return false;
};
var server = connect(
	connect.favicon(),
	connect.static(__dirname + '/../examples'),
	connect.router(function (app) {
		var renderer = require('../examples/_static');
		app.get('/static/:docName', function(req, res, next) {
			var docName;
			docName = req.params.docName;
			renderer(docName, server.model, res, next);
		});

		var wiki = require('../examples/_wiki');
		app.get('/wiki/?', function(req, res, next) {
			res.writeHead(301, {location: '/wiki/Main'});
			res.end();
		});

		app.get('/wiki/:docName', function(req, res, next) {
			var docName;
			docName = req.params.docName;
			wiki(docName, server.model, res, next);
		});

		app.get('/pad/?', function(req, res, next) {
			var docName;
			docName = hat();
			res.writeHead(303, {location: '/pad/pad.html#' + docName});
			res.write('');
			res.end();
		});

		app.get('/?', function(req, res, next) {
			res.writeHead(302, {location: '/index.html'});
			res.end();
		});
	})
);

var options = {
  db: {type: 'none'},
  auth: function(client, action) {
		// This auth handler rejects any ops bound for docs starting with 'readonly'.
    console.log('action: '+JSON.stringify(action));
    if (action.name === 'submit op' && action.docName.match(/^readonly/)) {
      action.reject();
    } else {
      action.accept();
    }
  }
};


// Lets try and enable redis persistance if redis is installed...
/**try {
  require('redis');
  options.db = {type: 'redis'};
} catch (e) {}
**/
console.log("ShareJS example server v" + sharejs.version);
console.log("Options: ", options);

var port = configPort.otServerPort;//argv.p;

// Attach the sharejs REST and Socket.io interfaces to the server
var nserver=sharejs.server.attach(server, options);

server.listen(port);
console.log("Demos running at http://localhost:" + configPort.notificationServerPort);

process.title = 'sharejsServer'
process.on('uncaughtException', function (err) {
  console.error('An error has occurred. Please file a ticket here: https://github.com/josephg/ShareJS/issues');
  console.error('Version ' + sharejs.version + ': ' + err.stack);
});
