var scores = document.getElementById('scores');
var speed = document.getElementById('speed');
var gameOver = document.getElementById('gameOver');
var gameOverMes = document.getElementById('gameOverMes');

////////////////////////////////////////////////////////
// СОБЫТИЯ НАЖАТИЯ КЛАВИШ
////////////////////////////////////////////////////////

function handler(event) {
	var keys = {
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40
	};

	switch(event.keyCode) {
		case keys.LEFT:  s.move('left')
		break;
		case keys.UP:  s.move('up')
		break;
		case keys.RIGHT:  s.move('right')
		break;
		case keys.DOWN:  s.move('down')
		break;
	}
}

window.addEventListener('keydown', handler, false);
window.addEventListener('keypress', handler, false);
window.addEventListener('keyup', handler, false);


////////////////////////////////////////////////////////
// ЗВУК
////////////////////////////////////////////////////////


function amam() {
	var amamSound = new Audio(); // Создаём новый элемент Audio
	amamSound.src = '../sounds/amam.mp3'; // Указываем путь к звуку "клика"
	amamSound.autoplay = true; // Автоматически запускаем
}




////////////////////////////////////////////////////////
// ИГРА
////////////////////////////////////////////////////////

var game = {
	points: 0,
	levelPoints: 0,
	level: 1,

	// Метод повышения уровня
	levelUp: function(){
		if (this.levelPoints === 5) {
			this.level += 1;
			this.levelPoints = 0;
			clearInterval(world.timerS);
			world.snakeSpeed = world.snakeSpeed * 0.8;
			world.tikS();
		};
	},

	gameOver: function(){
		clearInterval(world.timerS);
		clearInterval(world.timerP);
		gameOver.style.display = "block"
		gameOverMes.innerHTML = "<h2>Вы проиграли</h2> <h2>Набрано очков: "+ game.points + "</h2> <h2>Уровень: " + game.level + "</h2>" + "<button class='but-reload' onclick='location.reload()'> Начать заново </button>"

	}
}





////////////////////////////////////////////////////////
// МИР
////////////////////////////////////////////////////////

var world = {
	canvas: document.getElementById('canvas'),
	ctx: canvas.getContext('2d'),
	slot: 20,
	snakeSpeed: 300,
	width: 500,
	height: 600,

	clear: function(){
		this.ctx.clearRect(0, 0, 500, 600);
	},

	tikS: function(){
		this.timerS = setInterval(this.stepS, this.snakeSpeed);
	},

	stepS: function(){
		s.generation();
		s.crash();
		s.collisions();
		game.levelUp();
		scores.innerHTML = "<h2>Очки: " + game.points, + "</h2>";
		speed.innerHTML = "<h2>Уровень: " + game.level, + "</h2>";
		s.changeStatus();
	},

	tikP: function(){
		this.timerP = setInterval(this.stepP, 2000);
	},

	stepP: function(){
		p.generation();
	}
};

// Функция сложения векторов
var sumVec = function(vec1, vec2){
	var a = vec1[0] + vec2[0];
	var b = vec1[1] + vec2[1];
	var vec3 = [a, b];
	return vec3;
};

var minusVec = function(vec1, vec2){
	var a = vec1[0] + vec2[0];
	var b = vec1[1] + vec2[1];
	var vec3 = [a, b];
	return vec3;
};


////////////////////////////////////////////////////////
// ПОИНТЫ
////////////////////////////////////////////////////////

// Функция генерации случайных чисел
var random = function(min, max){
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.floor(rand/20)*20;  
}

// Функция генерации случайных координат
var randomVec = function(){
	var a = random(20, world.width-20);
	var b = random(20, world.height-20);
	var vec = [a, b];
	return vec;
}

// Прототип системы поинтов
var Points = function(){
	this.slots = [[-20,20]];
	this.length = this.slots.length;
	this.interval = 2000;
};

// Метод отрисовки поинтов
Points.prototype.draw = function(){
	for(var i = 0; i <= this.slots.length - 1; i++){
		if (this.slots[i]) {
			var slot = this.slots[i];
			world.ctx.fillRect(slot[0], slot[1], world.slot, world.slot);
		};
	}
};

// Метод генерации поинтов
Points.prototype.generation = function(){
	if(this.slots && this.slots.length > 5){this.slots.pop()};
	var newSlot = randomVec();
	this.slots.unshift(newSlot);
};



////////////////////////////////////////////////////////
// ЗМЕЙКА
////////////////////////////////////////////////////////


// Внешний вид змейки

// Голова (x, y коодринаты, размер, радиус)
var headLeft = function(x, y, s, r){
	world.ctx.beginPath();
	world.ctx.arc(x+r, y+r, r, 1 * Math.PI, 1.5 * Math.PI, false);
	world.ctx.lineTo(x+s, y);
	world.ctx.lineTo(x+s, y+s);
	world.ctx.arc(x+r, y+s-r, r, 0.5 * Math.PI, 1 * Math.PI, false);
	world.ctx.closePath()
	world.ctx.fillStyle = '#80a55c'
	world.ctx.fill()
}

var headRight = function(x, y, s, r){
	world.ctx.beginPath();
	world.ctx.moveTo(x, y);
	world.ctx.lineTo(x+s-r, y);
	world.ctx.arc(x+s-r, y+r, r, 1.5 * Math.PI, 2 * Math.PI, false);
	world.ctx.arc(x+s-r, y+s-r, r, 2 * Math.PI, 0.5 * Math.PI, false);
	world.ctx.lineTo(x, y+s);
	world.ctx.closePath()
	world.ctx.fillStyle = '#80a55c'
	world.ctx.fill()
}

var headUp = function(x, y, s, r){
	world.ctx.beginPath();
	world.ctx.arc(x+r, y+r, r, 1 * Math.PI, 1.5 * Math.PI, false);
	world.ctx.arc(x+s-r, y+r, r, 1.5 * Math.PI, 2 * Math.PI, false);
	world.ctx.lineTo(x+s, y+s);
	world.ctx.lineTo(x, y+s);
	world.ctx.closePath()
	world.ctx.fillStyle = '#80a55c'
	world.ctx.fill()
}

var headDown = function(x, y, s, r){
	world.ctx.beginPath();
	world.ctx.lineTo(x, y);
	world.ctx.lineTo(x+s, y);
	world.ctx.arc(x+s-r, y+s-r, r, 2 * Math.PI, 0.5 * Math.PI, false);
	world.ctx.arc(x+r, y+s-r, r, 0.5 * Math.PI, 1 * Math.PI, false);
	world.ctx.closePath()
	world.ctx.fillStyle = '#80a55c'
	world.ctx.fill()
}

// Туловище (x, y коодринаты, размер, радиус)
var box = function(x, y, s, r){
	world.ctx.beginPath();
	world.ctx.arc(x+r, y+r, r, 1 * Math.PI, 1.5 * Math.PI, false);
	world.ctx.arc(x+s-r, y+r, r, 1.5 * Math.PI, 2 * Math.PI, false);
	world.ctx.arc(x+s-r, y+s-r, r, 2 * Math.PI, 0.5 * Math.PI, false);
	world.ctx.arc(x+r, y+s-r, r, 0.5 * Math.PI, 1 * Math.PI, false);
	world.ctx.closePath()
	world.ctx.fillStyle = 'black'
	world.ctx.fill()
}

////////////////////////////////////////////////////////////////

// Прототип змейки
var Snake = function(){
	this.slots = [[60, 200],[40, 200],[20, 200]];
	this.length = this.slots.length;
	this.vec = [20, 0];
	this.status = 'right';
};

// Метод генерации слотов змейки
Snake.prototype.generation = function(){
	this.slots.pop();
	var newSlot = sumVec(this.slots[0], this.vec);
	this.slots.unshift(newSlot);
};

// Метод отрисовки змейки
Snake.prototype.draw = function(){

	// Отображение толовища
	for (var i = 1; i <= this.slots.length - 1; i++){
		var slot = this.slots[i];
		box(slot[0]+1, slot[1]+1, 18, 5);
	}
	
	// Отображение головы
	var headSlot = this.slots[0];
	if (this.status === 'left') {headLeft(headSlot[0]+1, headSlot[1]+1, 18, 5)};
	if (this.status === 'right') {headRight(headSlot[0]+1, headSlot[1]+1, 18, 5)};
	if (this.status === 'up') {headUp(headSlot[0]+1, headSlot[1]+1, 18, 5)};
	if (this.status === 'down') {headDown(headSlot[0]+1, headSlot[1]+1, 18, 5)};

};

// Метод движения (принимает направление)
Snake.prototype.move = function(direction){
	if (direction === 'left' && this.status != 'right') {this.vec = [-20, 0]; this.nextStatus = 'left'};
	if (direction === 'right' && this.status != 'left') {this.vec = [20, 0]; this.nextStatus = 'right'};
	if (direction === 'up' && this.status != 'down') {this.vec = [0, -20]; this.nextStatus = 'up'};
	if (direction === 'down' && this.status != 'up') {this.vec = [0, 20]; this.nextStatus = 'down'};
};

// Метод изменения статуса на следующем тике
Snake.prototype.changeStatus = function(){
	if(this.nextStatus === 'left'){ this.status = 'left' };
	if(this.nextStatus === 'right'){ this.status = 'right' };
	if(this.nextStatus === 'up'){ this.status = 'up' };
	if(this.nextStatus === 'down'){ this.status = 'down' };
};

// Метод проверки, нет ли пересечения змейки поинтами
Snake.prototype.collisions = function(){
	for (var i = 0; i <= p.slots.length - 1; i++) {
		var s1 = this.slots[0];
		if (p.slots[i]) {
			var s2 = p.slots[i];
			if (s1[0] === s2[0] && s1[1] === s2[1]) {
				p.slots.splice(i, 1);
				this.omnomnom();
			};
		};
	};
}

// Метод проверки, нет ли пересечения змейки с самой собой
Snake.prototype.crash = function(){
	for (var i = 1; i <= this.slots.length - 1; i++) {
		var s1 = this.slots[0];
		var s2 = this.slots[i];
		if (s1[0] === s2[0] && s1[1] === s2[1]) {
			game.gameOver();
		};
	};
}

// Метод при съедании поинта
Snake.prototype.omnomnom = function(){
	var lastSlot = this.slots[this.slots.length-1]
	newSlot = minusVec(lastSlot, this.vec);
	this.slots.push(newSlot);
	game.points += 1;
	game.levelPoints += 1;
	amam();
}


// Метод проверки на нахождение в пределах экрана и телепортации
Snake.prototype.teleport = function(){
	var head = this.slots[0];
	if (head[0] < 0) {head[0] = world.width - world.slot};
	if (head[0] > world.width - world.slot) {head[0] = 0};
	if (head[1] < 0) {head[1] = world.height - world.slot};
	if (head[1] > world.height - world.slot) {head[1] = 0};
}



////////////////////////////////////////////////////////
// ИНИЦИАЛИЗАЦИЯ
////////////////////////////////////////////////////////

var s = new Snake();
var p = new Points();

world.tikS();
world.tikP();

var render = function(){
	requestAnimationFrame(render);
	world.clear();
	s.draw();
	p.draw();
	s.teleport();
}

render()