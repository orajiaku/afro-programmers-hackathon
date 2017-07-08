var globals = require("../../globals");
var storeHandler = require(globals.vars.store);



var getDrawingHistoryForNewClients = function (socket_id, room,) {
	 /* body... */ 
}

var getDrawing = function (socket_id, draw_parameters) {
	/* body... */
}

var broadCastDrawing = function (draw_parameters, socket_id, room) {
	// body... 
}

var createRoom = function (socket_id, password, room_name) {
	/* body... */
}

var joinRoom = function (socket_id, room_name) {
	/* body... */
}

var checkRoom = function (room_name) {
	/* body... */
	
}

var onDisconnect = function (socket_id) {
	 /* body... */ 
}

var promoteSomeoneInRoom = function () {
	/* body... */
}

var getFrontPage = function (req, res) {
	// body... 
}