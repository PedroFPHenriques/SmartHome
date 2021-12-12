var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var Gpio = require('pigpio').Gpio;


/* CONSTANTES */

const WebPort = 8080;

greenLED = new Gpio(22, {mode: Gpio.OUTPUT});
blueLED = new Gpio(23, {mode: Gpio.OUTPUT});
redLED = new Gpio(24, {mode: Gpio.OUTPUT});

 
/*************** Web Browser Communication ****************************/

var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)


// Start http webserver
http.listen(WebPort, function() {  // This gets call when the web server is first started.
	console.log('Server running on Port '+WebPort);
	} 
);

// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='./') {
      console.log('retrieving default index.html file');
      filename= './index.html';
    }
    
    // Initial content type
    var contentType = 'text/html';
    
    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }
    
    fs.readFile(__dirname + '/public/' + filename, function(err, content) {
	if(err) {
	    console.log('File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/404.html', function(err, content) {
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		return res.end(content,'utf'); //display 404 on error
	    });
	}
	else {
	    // Success
	    res.writeHead(200, {'Content-Type': contentType}); 
	    return res.end(content,'utf8');
	}
      
    });
}



	/****** io.socket is the websocket connection to the client's browser********/

var clients =[];

io.sockets.on('connection', function (socket) {// WebSocket Connection
	console.log('A new client has connected.');
	//console.log(socket.id); // writes client ID to the console
	//clients.push(socket.id);
	var clientInfo = {};
	clientInfo.clientId = socket.id;
	clientInfo.logIn = false;
	clients.push(clientInfo);
	console.log(clientInfo);
	console.log(clients.length + ' clients are currently connected');

	// this gets called whenever client presses a button that needs to be sent to WebServer
	socket.on('msg', function(data) {
		//io.emit('FB', data); // Push new data to all web clients
	});


	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function (data) {
		//console.log('A user disconnected');
		for( var i=0, len=clients.length; i<len; ++i ){
			var c = clients[i];

			if(c.clientId === socket.id){
				clients.splice(i,1);
				console.log("client '" + c.clientId + "' has disconnected");
				console.log(clients.length + ' clients are currently connected');
				break;
			}
		}
	});

	socket.on('rgb', function(data) {
		io.emit('rgbt', data);
		if (data.check === true){
			var red = data.rgbvalue[0]
			var green = data.rgbvalue[1]
			var blue = data.rgbvalue[2]

			//Aplicar alpha
			red = Math.ceil(data.rgbvalue[0]*data.alpha).toString()
			green = Math.ceil(data.rgbvalue[1]*data.alpha).toString()
			blue = Math.ceil(data.rgbvalue[2]*data.alpha).toString()

			redLED.pwmWrite(red);
			greenLED.pwmWrite(green);
			blueLED.pwmWrite(blue);
		}else{
			redLED.pwmWrite(0);
			greenLED.pwmWrite(0);
			blueLED.pwmWrite(0);
		}
	});

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
});


 



