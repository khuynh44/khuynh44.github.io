
const speed = 100;
var snake =[{x: 12, y:11}]
var food = {};
var velocity = {x: 1, y: 0};
var canvas = document.getElementById("canvas");
document.addEventListener("keydown", moveSnake);
document.addEventListener("keydown", startGame);
document.addEventListener("keydown", pauseGame);
var gameOver = true;
var paused = false;
var clock;

function startGame(action) {
    let key = action.keyCode
    var x = 0
    var y = 0
    if(!gameOver) {
         return;
    }
    gameOver = false
    randomizeFood()
    switch (key) {
        case 37:
            x = 1
            velocity.x = -1
            break
        case 38:
            y = 1
            break
        case 39:
            x = -1
            break
        case 40:
            y = -1
            break
        default:
            x = -1
    }
    for(let i = 0; i < 2; i++) {
        snake.push({x:(snake[i].x + x), y:(snake[i].y + y)})
    }
    clock = setInterval(runGame, speed);
}

function pauseGame(action) {
        if (action.keyCode == 32 && !paused) {
            paused = true
            clearInterval(clock);
        } else if (paused) {
            paused = false
            clock = setInterval(runGame, speed);
        }
}

function runGame() {
    timer()
    drawElements()
}

function timer() {
    var head = snake[0];
    for (i = snake.length - 2; i >=0; i--) {
        snake[i+1] = {...snake[i]};
    }
    head.x += velocity.x;
    head.y += velocity.y;
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            endGame();
        }
    }
    if (head.x == 22) {
        head.x = 1
    } else if (head.x == 0) {
        head.x = 21
    }
    if (head.y == 22) {
        head.y = 1
    } else if (head.y == 0) {
        head.y = 21
    }
    if (head.x == food.x && head.y == food.y) {
        snake.push(snake[0]);
        randomizeFood();
    }    
}

function drawElements() {
    canvas.innerHTML = '';
    snake.forEach((part) => {
        const square = document.createElement("div");
        square.style.gridRowStart = part.y;
        square.style.gridColumnStart = part.x;
        square.classList.add('snake');
        canvas.appendChild(square)
    })
    const foodSquare = document.createElement("div");
    foodSquare.style.gridRowStart = food.y
    foodSquare.style.gridColumnStart = food.x
    foodSquare.classList.add("food");
    canvas.appendChild(foodSquare);
}

function moveSnake(action) {
    var currentVelocity = velocity;
    var key = action.keyCode
    if (currentVelocity.x == 0) {
        if (key == 37) {
            velocity = {x: -1, y: 0}
        } else if (key == 39) {
            velocity = {x:1, y: 0}
        }
    } else {
        if (key == 38) {
            velocity = {x: 0, y: -1}
        } else if (key == 40) {
            velocity = {x: 0, y: 1}
        }
    }
}

function randomizeFood() {
    food.x = Math.floor(Math.random()*21 + 1);
    food.y = Math.floor(Math.random()*21 + 1);
    for(let i = 0; i < snake.length; i++) {
        let temp = snake[i];
        if (temp.x == food.x && temp.y == food.y) {
            food.x = Math.floor(Math.random()*21 + 1);
            food.y = Math.floor(Math.random()*21 + 1);
            i = 0;
        }
    }
}

function endGame() {
    clearInterval(clock);
    gameOver = true;
    alert("You lost. Press ok to restart.")
    snake =[{x: 12, y:11}]
    velocity = {x: 1, y: 0}
}

