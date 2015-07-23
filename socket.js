module.exports = function(server) {
	var io = require('socket.io')(server);

	var playerCount = 0;
	var id = 0;

	io.on('connection', function (socket) {
		playerCount++;
		id++;
		setTimeout(function() {
			console.log('connection!');
			socket.emit('connected', { playerId: id });
			io.emit('count', { playerCount: playerCount });
		}, 1500);

		socket.on('disconnect', function() {
			playerCount--;
			console.log(playerCount);
			io.emit('count', { playerCount: playerCount });
		});

		socket.on('update', function(data) {
			socket.broadcast.emit('updated', data);
		});

		socket.on('score', function(data) {
			socket.broadcast.emit('scored', data)
		})
	});
};