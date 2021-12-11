


/************PROCESS DATA TO/FROM Client****************************/

	
//var socket = io(); //load socket.io-client and connect to the host that serves the page
/*window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
//    alert('Mobile');  
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);
  }else{
//    alert('Desktop');  
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }
  
});*/



/*
//Update gpio feedback when server changes LED state
socket.on('GPIO26', function (data) {  
//  console.log('GPIO26 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('GPIO26').checked = data;
//  console.log('GPIO26: '+data.toString());
});


//Update gpio feedback when server changes LED state
socket.on('GPIO20', function (data) {  
//  console.log('GPIO20 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO20').checked = data;
//  console.log('GPIO20: '+data.toString());
});



//Update gpio feedback when server changes LED state
socket.on('GPIO21', function (data) {  
//  console.log('GPIO21 function called');
 // console.log(data);
  var myJSON = JSON.stringify(data);
 // console.log(myJSON);
  document.getElementById('GPIO21').checked = data;
// console.log('GPIO21: '+data.toString());
});



//Update gpio feedback when server changes LED state
socket.on('GPIO16', function (data) {  
//  console.log('GPIO16 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('GPIO16').checked = data;
//  console.log('GPIO16: '+data.toString());
});

colorPicker.on('color:change', function(color) {
  const cor = [colorPicker.color.rgbString.replace(/[^\d,]/g, '').split(','), colorPicker.color.alpha];
  socket.emit("rgb",cor);  // send GPIO button toggle to node.js server
  console.log(cor[1])
  document.getElementById("owl-item").style.backgroundColor = colorPicker.color.hexString
});*/
/*
function ReportTouchStart(e) {
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "GPIO26") {
 //     console.log("GPIO26 toggle");
      socket.emit("GPIO26T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO20") {
 //     console.log("GPIO20 toggle");
      socket.emit("GPIO20T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO21") {
//      console.log("GPIO21 toggle");
      socket.emit("GPIO21T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO16") {
  //    console.log("GPIO16 toggle");
      socket.emit("GPIO16T");  // send GPIO button toggle to node.js server
    } 
  }
}*/

/*function ReportMouseDown(e) {
  
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "GPIO26") {
 //     console.log("GPIO26 toggle");
      socket.emit("GPIO26T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO20") {
//     console.log("GPIO20 toggle");
      socket.emit("GPIO20T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO21") {
 //     console.log("GPIO21 toggle");
      socket.emit("GPIO21T");  // send GPIO button toggle to node.js server
    } else if (x === "GPIO16") {
 //     console.log("GPIO16 toggle");
      socket.emit("GPIO16T");  // send GPIO button toggle to node.js server
    } 
  }
}
*/
/** function to sense if device is a mobile device ***/
// Reference: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

/*var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};*/


