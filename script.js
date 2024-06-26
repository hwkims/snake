const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.createElement('div');
scoreElement.className = 'core';
document.body.appendChild(scoreElement);

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 40) * 10,
    y: Math.floor(Math.random() * 40) * 10
};

let direction = 'right';
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x, food.y, 10, 10);

    scoreElement.textContent = `Score: ${score}`;
}

function update() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = {...snake[i - 1] };
    }

    switch (direction) {
        case 'up':
            snake[0].y -= 10;
            break;
        case 'down':
            snake[0].y += 10;
            break;
        case 'left':
            snake[0].x -= 10;
            break;
        case 'right':
            snake[0].x += 10;
            break;
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 40) * 10,
            y: Math.floor(Math.random() * 40) * 10
        };
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            alert(`Game Over! Your score is ${score}`);
            location.reload();
        }
    }

    if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y <0 || snake[0].y > canvas.height - 10) {
        alert(`Game Over! Your score is ${score}`);
        location.reload();
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction!== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction!== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction!== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction!== 'left') direction = 'right';
            break;
    }
});

document.getElementById('up-button').addEventListener('click', () => {
    if (direction!== 'down') direction = 'up';
});

document.getElementById('down-button').addEventListener('click', () => {
    if (direction!== 'up') direction = 'down';
});

document.getElementById('left-button').addEventListener('click', () => {
    if (direction!== 'right') direction = 'left';
});

document.getElementById('right-button').addEventListener('click', () => {
    if (direction!== 'left') direction = 'right';
});

setInterval(() => {
    update();
    draw();
}, 100);