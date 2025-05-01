    // Игровые переменные
    let gameRunning = false;
    let ballX = 0;
    let ballY = 0;
    let ballSpeedX = 2;
    let ballSpeedY = -2;
    let playerX = 120;
    let score = 0;
    let blocks = [];
    
    // Элементы игры
    const gameWidget = document.getElementById('game-widget');
    const gameLauncher = document.getElementById('game-launcher');
    const closeButton = document.getElementById('close-game');
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const ball = document.getElementById('ball');
    const gameScore = document.getElementById('game-score');
    const gameStart = document.getElementById('game-start');
    
    // Обработчики событий
    gameLauncher.addEventListener('click', function() {
        gameWidget.style.display = 'block';
        gameLauncher.style.display = 'none';
    });
    
    closeButton.addEventListener('click', function() {
        gameWidget.style.display = 'none';
        gameLauncher.style.display = 'flex';
        resetGame();
    });
    
    // Движение платформы
    gameContainer.addEventListener('mousemove', function(e) {
        if (!gameRunning) return;
        const rect = gameContainer.getBoundingClientRect();
        playerX = e.clientX - rect.left - 30;
        if (playerX < 0) playerX = 0;
        if (playerX > 240) playerX = 240;
        player.style.left = playerX + 'px';
    });
    
    // Создание блоков
    function createBlocks() {
        // Удаляем старые блоки
        document.querySelectorAll('.block').forEach(block => block.remove());
        blocks = [];
        
        const rows = 3;
        const cols = 5;
        const blockWidth = 50;
        const blockHeight = 15;
        const gap = 5;
        const offsetTop = 30;
        const offsetLeft = 15;
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const block = document.createElement('div');
                block.className = 'block';
                block.style.position = 'absolute';
                block.style.left = (offsetLeft + c * (blockWidth + gap)) + 'px';
                block.style.top = (offsetTop + r * (blockHeight + gap)) + 'px';
                block.style.width = blockWidth + 'px';
                block.style.height = blockHeight + 'px';
                block.style.backgroundColor = ['#FF5722', '#FFC107', '#9C27B0'][r];
                block.style.borderRadius = '3px';
                gameContainer.appendChild(block);
                
                blocks.push({
                    element: block,
                    x: offsetLeft + c * (blockWidth + gap),
                    y: offsetTop + r * (blockHeight + gap),
                    width: blockWidth,
                    height: blockHeight,
                    active: true
                });
            }
        }
    }
    
    // Запуск игры
    function startMiniGame() {
        gameStart.style.display = 'none';
        ball.style.display = 'block';
        gameRunning = true;
        score = 0;
        gameScore.textContent = 'Score: 0';
        
        createBlocks();
        resetBall();
        gameLoop();
    }
    
    // Сброс мяча
    function resetBall() {
        ballX = playerX + 30 - 6;
        ballY = 350;
        ballSpeedX = 2 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = -2;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }
    
    // Сброс игры
    function resetGame() {
        gameRunning = false;
        gameStart.style.display = 'block';
        ball.style.display = 'none';
        document.querySelectorAll('.block').forEach(block => block.remove());
    }
    
    // Игровой цикл
    function gameLoop() {
        if (!gameRunning) return;
        
        // Движение мяча
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        
        // Столкновение со стенами
        if (ballX <= 0 || ballX >= 288) ballSpeedX = -ballSpeedX;
        if (ballY <= 0) ballSpeedY = -ballSpeedY;
        
        // Проигрыш
        if (ballY > 370) {
            resetGame();
            return;
        }
        
        // Столкновение с платформой
        if (ballY + 12 >= 355 && ballY + 12 <= 370 && 
            ballX + 12 >= playerX && ballX <= playerX + 60) {
            ballSpeedY = -ballSpeedY;
            const hitPosition = (ballX + 6) - (playerX + 30);
            ballSpeedX = hitPosition * 0.1;
        }
        
        // Столкновение с блоками
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (!block.active) continue;
            
            if (ballX + 12 >= block.x && ballX <= block.x + block.width &&
                ballY + 12 >= block.y && ballY <= block.y + block.height) {
                
                block.active = false;
                block.element.style.display = 'none';
                score += 10;
                gameScore.textContent = 'Score: ' + score;
                
                // Определяем сторону столкновения
                const ballCenterX = ballX + 6;
                const ballCenterY = ballY + 6;
                const blockCenterX = block.x + block.width / 2;
                const blockCenterY = block.y + block.height / 2;
                
                const dx = ballCenterX - blockCenterX;
                const dy = ballCenterY - blockCenterY;
                const width = block.width / 2 + 6;
                const height = block.height / 2 + 6;
                const crossWidth = width * dy;
                const crossHeight = height * dx;
                
                if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                    if (crossWidth > crossHeight) {
                        ballSpeedY = -ballSpeedY;
                    } else {
                        ballSpeedX = -ballSpeedX;
                    }
                }
                
                break;
            }
        }
        
        // Проверка победы
        if (blocks.every(block => !block.active)) {
            gameScore.textContent = 'Победа! Score: ' + score;
            resetGame();
            return;
        }
        
        requestAnimationFrame(gameLoop);
    }

    