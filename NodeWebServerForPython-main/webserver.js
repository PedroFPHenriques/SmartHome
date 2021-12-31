var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var Gpio = require('pigpio').Gpio;


 //CONSTANTES

const WebPort = 8080;
greenLED = new Gpio(22, {mode: Gpio.OUTPUT});
blueLED = new Gpio(23, {mode: Gpio.OUTPUT});
redLED = new Gpio(24, {mode: Gpio.OUTPUT});

 
/*************** Web Browser Communication ****************************/

var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)


// Start http webserver
http.listen(WebPort, function() {  // This gets call when the web server is first started.
	console.log('-----------------------------------------------------------------');
	console.log('Server running on Port '+WebPort);
	console.log('-----------------------------------------------------------------');
	} 
);

// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var extname = path.extname(filename);
    if (filename==='./') {
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
var cor_actual
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
	console.log('-----------------------------------------------------------------');
	//envia a cor actual para a socket na conexão
	socket.broadcast.to(socket.id).emit('rgbt', cor_actual);


	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function (data) {
		//console.log('A user disconnected');
		for( var i=0, len=clients.length; i<len; ++i ){
			var c = clients[i];

			if(c.clientId === socket.id){
				clients.splice(i,1);
				console.log("client '" + c.clientId + "' has disconnected");
				console.log(clients.length + ' clients are currently connected');
				console.log('-----------------------------------------------------------------');
				break;
			}
		}
	});
	/**
	* @todo mudar cor ao iniciar socket
    * @todo definir o valor do alpha numa mudança de cor
    * @todo arcoiris rodar cores automaticamente
    */

	socket.on('rgb', function(data) {
		socket.broadcast.emit('rgbt', data);


		if (data.type === "flow"){
			if (data.check === true) {
				var r = 255, g = 0, b = 0;

				setInterval(function () {
					if (r > 0 && b == 0) {
						r--;
						g++;
						blueLED.pwmWrite(b);
					}
					if (g > 0 && r == 0) {
						g--;
						b++;
						redLED.pwmWrite(r);
					}
					if (b > 0 && g == 0) {
						r++;
						b--;
						greenLED.pwmWrite(g);
					}
					console.log("red"+r+"-green"+g+"-blue"+b)
				}, 10);
			}else{
				redLED.pwmWrite(0);
				greenLED.pwmWrite(0);
				blueLED.pwmWrite(0);
			}
		}else{
			if (data.check === true) {
				//Aplicar alpha
				var red = Math.ceil(data.rgbvalue[0] * data.alpha).toString()
				var green = Math.ceil(data.rgbvalue[1] * data.alpha).toString()
				var blue = Math.ceil(data.rgbvalue[2] * data.alpha).toString()

				//variavel guardada para definir o valor rgb na conexao à socket
				cor_actual = data
				console.log(cor_actual)

				//Muda os valores dos GPIO
				redLED.pwmWrite(red);
				greenLED.pwmWrite(green);
				blueLED.pwmWrite(blue);
			}else{
				redLED.pwmWrite(0);
				greenLED.pwmWrite(0);
				blueLED.pwmWrite(0);
			}
		}

	});
});


 



