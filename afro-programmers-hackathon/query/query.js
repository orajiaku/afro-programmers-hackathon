var globals = require("../../globals");
var io = require(globals.vars.app).io;
var storeHandler = require(globals.vars.store).db;

var MSGTYPES = {DRAW:"DRAW",DRAWREQUEST:"DREQ", NEW:"NEWRM"}

var getDrawingHistoryForNewClients = function (socket_id, room) {
	 /* body... */ 
	  io.sockets.socket(storeHandler.storage[room_name].admin).emit("ToBeAgreedUpon", {type:DRAWREQUEST, msg: "Think"});
}

var sendErrorPage = function (argument) {
	// body... 
}

var getDrawing = function (socket_id) {
	/* body... */
	var draw_parameters = null;
	socket_id.on('ToBeAgreedUpon', function(data) {
		draw_parameters = data;
    })
	return draw_parameters;
}

var broadCastDrawing = function (draw_parameters, socket_id, room_name) {
	// We have to agree on how to call getDrawing

	socket_id.broadcast.to(room_name).emit('ToBeAgreedUpon', { type:MSGTYPES.DRAW, 
					msg: draw_parameters });
}

var createRoom = function (socket_id, password, room_name) {
	if(!checkRoom(room_name)){
		storeHandler.storage[room_name] = {admin:socket_id, users:[socket_id]}
	}else{
		sendErrorPage()
	}
	socket_id.emit("ToBeAgreedUpon",{type:MSGTYPES.NEW,msg:""})
}

var joinRoom = function (socket_id, room_name) {
	/* body... */
}

var checkRoom = function (room_name) {
	 return room_name in storeHandler.storage;
}

var onDisconnect = function (socket_id) {
	 /* body... */ 
}

var promoteSomeoneInRoom = function (room_name) {
	/* body... */
	if(checkRoom(room_name)){
		var numOfUsers = storeHandler.storage[room_name].users.length;
		var random =  Math.floor(Math.random()* numOfUsers + min) - 1;
		storeHandler.storage[room_name].admin = storeHandler.storage[room_name].users[random];
	}
}

var getFrontPage = function (req, res) {
	// body... 
}

module.exports = {
	init: function(){
		console.log('Initializing Socket IO');

		io.on('connection', function(socket){
			console.log('Endpoint connected');

			socket.join('default room', function(){
				console.log('Joined default room');

				socket.on('comment', function(data){
					socket.to('default room').emit('comment', data);
					socket.emit('comment', data);
				});
				
				socket.on('drawing', function(data){
					socket.to('default room').emit('drawing', data);
					socket.emit('drawing', data);
				});
			})
		});
	},
	createRoom: createRoom,
	joinRoom: joinRoom
};
