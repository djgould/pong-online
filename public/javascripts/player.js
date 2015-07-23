function Player(x, y, width, height, id, socket) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;
	this.socket = socket;
	this.score = 0;
}

Player.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

Player.prototype.move = function(up, down) {
	if(up && this.y < canvas.height-this.height) {
		this.y += 5;
		if(this.socket) {
			this.socket.emit('update', {
				playerId: this.id,
				y: this.y,
				bX: ball.x,
				bY: ball.y,
				score: this.score
			});
		}
	}
	else if(down && this.y > 0) {
		this.y -= 5;
		if(this.socket) {
			this.socket.emit('update', {
				playerId: this.id,
				y: this.y,
				bX: ball.x,
				bY: ball.y,
				score: this.score
			});
		}
	}
}

function Opponent(x, y, width, height, id) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;
	this.score = 0;
}

Opponent.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}