var globals = require("../../globals");
var io = require(globals.vars.app).io;
var storeHandler = require(globals.vars.store).db;

var MSGTYPES = {DRAW:"DRAW",
		DRAWREQUEST:"DREQ", 
		NEW:"NEWRM", 
		COMMENT:"CMT",
		GETHISTORY:"GETHIST",
		JOINRM:"JOIN"
	}

var EVENTS = {COMMENT:"comment",
			DRAWING:"drawing",
			JOINRM:"join_room",
			CREATERM:"create_room"}

var getDrawingHistoryForNewClients = function (socket_id, room) {
	 /* body... */ 
	  io.sockets.socket(storeHandler.storage[room_name].admin).emit("ToBeAgreedUpon", {type:DRAWREQUEST, msg: "Think"});
	  //io.
}

var sendErrorPage = function (argument) {
	// body... 
}

var broadCastMsg = function ( socket_id, room_name, event, msgType, msg) {
	// We have to agree on how to call getDrawing
	socket_id.broadcast.to(room_name).emit(event, { type:msgType, msg: msg });
}

var sendComments = function (socket_id, comment) {
	// We have to agree on how to call getDrawing
	broadCastMsg(socket_id, getRoomName(socket_id),EVENTS.COMMENT,MSGTYPES.COMMENT,comment); 
}

var sendDrawing = function (socket_id,draw_parameters) {
	/* body... */ 
    broadCastMsg(socket_id, getRoomName(socket_id),EVENTS.DRAWING,MSGTYPES.DRAW,draw_parameters);
	//return draw_parameters;
}

var createRoom = function (socket_id, password, room_name) {
	if(!checkRoom(room_name)){
		storeHandler.storage[room_name] = {admin:socket_id, users:[socket_id]}
	}else{
		sendErrorPage()
	}
	socket_id.emit("room_created",{type:MSGTYPES.NEW,msg:"Room Created"})
}

var joinRoom = function (socket_id, room_name) {
	/* body... */
	if(checkRoom(room_name)){
		storeHandler.storage[room_name].users.push(room_name);
		broadCastMsg(socket_id, room_name ,EVENTS.JOINRM ,MSGTYPES.JOINRM,"New User Joined");
		socket.join(room_name, function(){
				console.log('Joined default room');
				});
	}else {
		createRoom(socket_id,null, room_name);
	}

}

var getRoomName = function (socket_id) {
	var room_name = socket_id.rooms[Object.keys(socket_id.rooms)[0]];//returns name of room
	return room_name
}

var checkRoom = function (room_name) {
	 return room_name in storeHandler.storage;
}

var onDisconnect = function (socket_id, room_name) {
	 /* body... */ 
	 socket_id.leave(room_name);
	 if(storeHandler.storage[room_name].admin == socket_id){
	 	promoteSomeoneInRoom(room_name);
	 }
	 var index = storeHandler.storage[room_name].users.indexOf(socket_id)
	 if (index > 0){ 
	 	storeHandler.storage[room_name].users.splice(index, 1);
	 }
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
			socket.on('join_room', function () {
				/* body... */
				joinRoom(socket, data)
			})
			
			socket.on(EVENTS.COMMENT, function(data){ 
					sendComments(socket, data);
				});
				
			socket.on(EVENTS.DRAWING, function(data){
					sendDrawing(socket, data);
					/*socket.to('default room').emit('drawing', data);
					socket.emit('drawing', data);*/
				});

			socket.on(EVENTS.CREATERM, function (data) {
					createRoom(socket, data.password || null, data.room_name);
				});
			 
		});
	},
	createRoom: createRoom,
	joinRoom: joinRoom
};
