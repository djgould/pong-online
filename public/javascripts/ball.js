function Ball(x, y, radius, socket) {
	this.x = x;
	this.y = y;
	this.dx = 2;
	this.dy = -2;
	this.radius = radius;
	this.socket = socket;
}

Ball.prototype.checkCollisions = function() {
	if(this.x + this.dx > canvas.width - this.radius) {
		if(this.y > p2.y && this.y < p2.y + p2.height) {
			this.dx = -this.dx;
		} else {
			p1.score++;
			this.reset(-1);
			socket.emit('score', {
				p1Score: p1.score,
				p2Score: p2.score,
				dir: -1
			})
		}
	} else if(this.x + this.dx < this.radius) {
		if(this.y > p1.y && this.y < p1.y + p1.height) {
			this.dx = -this.dx;
		} else {
			p2.score++;
			this.reset(1);
			socket.emit('score', {
				p1Score: p1.score,
				p2Score: p2.score,
				dir: 1
			});
		}
}

	if(this.y + this.dy < this.radius) {
		this.dy = -this.dy;
	} else if(this.y + this.dy > canvas.height - this.radius) {
		this.dy = -this.dy;
	}
}

Ball.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;
}

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

Ball.prototype.reset = function(direction) {
	ball.x = canvas.width/2;
	ball.y = canvas.height-30;
	ball.dx = 2 * direction;
}