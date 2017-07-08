/**
{@Ling storage} takes a key value pair. where the key is the room_name
A room_name is unique
a Key-value pair consists of  {room_name : {admin: name, users : [list of users]} }
{@Ling storage} can be migrated to a persistent storage
**/
var storage = {}
var number_of_rooms = 0;

exports.db = {
				storage: storage,
				noOfKeys: number_of_rooms
		 	}