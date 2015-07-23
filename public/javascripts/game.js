require(['socket.io/socket.io.js']);

var canvas = document.getElementById('pongCanvas');
var ctx = canvas.getContext('2d');
var UiPlayers = document.getElementById('players');
var UiWaiting = document.getElementById('waiting');

var players = [];
var p1;
var p2;
var socket = io();
var playerCount;
var ball;
var selfId;
var gameState;
var objectFiles = [
	'./javascripts/keys',
	'./javascripts/player',
	'./javascripts/ball'
]

require(objectFiles, function() {

	function init() {
		socket.on('count', function(data) {
			playerCount = data['playerCount']
			UiPlayers.innerHTML = 'Players: ' + data['playerCount'];
		});

		socket.on('connected', function(data) {
			selfId = data['playerId'];
			p1 = new Player(0, canvas.height/2, 10, 75, selfId, socket);
			p2 = new Opponent(canvas.width - 10, canvas.height/2, 10, 75);
			ball = new Ball(canvas.width/2, canvas.height-30, 10, socket);

			waitForChallenger();
		});

		socket.on('updated', function(data) {
			p2.y = data['y'];
		});

		socket.on('scored', function(data) {
			console.log('scored!');
			p1.score = data['p2Score'];
			p2.score = data['p1Score'];
			ball.reset(data['dir']*-1);
		})
	}

	function waitForChallenger() {
		console.log(playerCount);
		if(playerCount >= 2) {
			setInterval(draw, 10);
		} else {
			console.log(playerCount);
			UiWaiting.innerHTML = "Waiting for Challenger";

			setTimeout(function() {
				waitForChallenger();
			}, 300);

		}
	}

	function drawScore() {
	    ctx.font = "16px Arial";
	    ctx.fillStyle = "#0095DD";
	    ctx.fillText(p1.score + " | " + p2.score, canvas.width/2, 20);
	}


	function update() {
		ball.checkCollisions();
		ball.move();
		p1.move(sPressed, wPressed);
		//p2.move(downPressed, upPressed);
	}

	function restart() {
		p1.score = 0;
		p2.score = 0;
		ball.reset(1);
	}

	function checkScore() {
		if(p1.score >= 7) {
			alert("Player 1 wins!");
			restart();
		} else if(p2.score >= 7) {
			alert("Player 2 wins!");
			restart();
		}
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ball.draw();
		p1.draw();
		p2.draw();
		drawScore();
		update();
		checkScore();
	}


	init();
});