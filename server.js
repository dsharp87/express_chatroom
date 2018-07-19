var express = require( "express");
var path = require( "path");
var app = express();
var port = 8000;
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
 res.render("index");
})



var server = app.listen(port, function() {
 console.log(`listening on port ${port}`);
})
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    
    socket.on( "send_clicked", function (data){
      console.log("server send clicked"  + data.reason);
      socket.emit( 'server_response', {response:  "sockets are the best!"});
    });

    socket.on("user_joined", (data) => {
        console.log("a user joined", data.username);
        socket.broadcast.emit("user_joined_broadcast", {username: data.username })
    })
  })

        // //  EMIT:
        // socket.emit( 'my_emit_event');
        // //  BROADCAST:
        // socket.broadcast.emit( "my_broadcast_event");
        // //  FULL BROADCAST:
        // io.emit( "my_full_broadcast_event");
