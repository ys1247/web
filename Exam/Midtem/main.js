const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas의 크기를 2배로 설정하여 레티나 디스플레이를 고려
const width = canvas.clientWidth * 2;
const height = canvas.clientHeight * 2;
canvas.width = width;
canvas.height = height;

let isGameStarted = false; // 게임 시작 여부를 추적하는 변수
let heartX = 0; // 하트의 x 좌표
let heartY = 0; // 하트의 y 좌표

// 별 그리기 함수
function drawStar() {
    const starPoints = [
        { x: 25, y: 0 },
        { x: 30.5, y: 14 },
        { x: 49, y: 14 },
        { x: 34, y: 22.8 },
        { x: 39.5, y: 36.4 },
        { x: 25, y: 28 },
        { x: 10.5, y: 36.4 },
        { x: 16, y: 22.8 },
        { x: 1, y: 14 },
        { x: 19.5, y: 14 }
    ];

    // 별의 중심 좌표 계산
    const centerX = (width - 50) / 2; // 별의 크기는 50x50으로 가정
    const centerY = (height - 50) / 2;

    ctx.beginPath();
    for (const point of starPoints) {
        ctx.lineTo(centerX + point.x * 2, centerY + point.y * 2);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgb(250, 202, 15)'; // 색상을 RGB 값 (250, 202, 15)로 고정
    ctx.fill();

    // 테두리 그리기
    ctx.strokeStyle = 'black'; // 검은색 테두리
    ctx.lineWidth = 2; // 테두리 두께 설정
    ctx.stroke();
}

// 게임 화면 그리기 함수
function drawGameScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 clear
    drawStar(); // 별 그리기 함수 호출
    drawHeart(heartX, heartY); // 하트 그리기 함수 호출
    drawEnemies(); // 적군 그리기 함수 호출
}

// 시작 버튼 생성
const startButton = document.createElement('button');
startButton.textContent = '시작';
document.body.appendChild(startButton);
startButton.style.position = 'absolute';
startButton.style.top = 'calc(50% + 30px)'; // 타이틀 화면보다 아래에 위치
startButton.style.left = '50%';
startButton.style.transform = 'translate(-50%, -50%)';
startButton.style.color = 'black'; //  텍스트색 설정
startButton.style.fontSize = '24px'; // 텍스트 크기 설정
startButton.style.width = '180px'; // 버튼의 가로 크기를 180px로 설정
startButton.style.height = '60px'; // 버튼의 세로 크기를 60px로 설정

// 시작 버튼에 마우스 이벤트 리스너 추가
startButton.addEventListener('mouseover', function() {
    startButton.style.backgroundColor = 'orange'; // 마우스를 가져갔을 때 배경색 변경
});

// 시작 버튼 클릭 이벤트 핸들러
startButton.addEventListener('click', function() {
    // 클릭시 버튼 색상 변경
    startButton.style.backgroundColor = 'blue';

    // 1초 뒤에 게임 시작
    setTimeout(() => {
        handleStartButtonClick();
    }, 1000);

    // 클릭 이벤트 제거
    startButton.removeEventListener('click', handleClick);
});

// 시작 버튼에 대한 클릭 이벤트 핸들러 정의
function handleClick() {
    // 클릭시 버튼 색상 변경
    startButton.style.backgroundColor = 'blue';

    // 1초 뒤에 게임 시작
    setTimeout(() => {
        handleStartButtonClick();
    }, 1000);

    // 클릭 이벤트 제거
    startButton.removeEventListener('click', handleClick);
}

// 시작 버튼에 클릭 이벤트 핸들러 등록
startButton.addEventListener('click', handleClick);

// 적(적군) 객체 생성 및 관리
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2; // 적의 이동 속도
        this.size = 20; // 적의 크기
    }

    // 적 그리기 메서드
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // 적의 움직임 업데이트 메서드
    update() {
        const dx = canvas.width / 2 - this.x;
        const dy = canvas.height / 2 - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const velocityX = (dx / distance) * this.speed;
        const velocityY = (dy / distance) * this.speed;
        this.x += velocityX;
        this.y += velocityY;
    }
}

// 적군 배열
let enemies = [];

// 적군 생성 함수
function createEnemies() {
    const margin = 20; // 화면 바깥 여백 설정
    const numberOfEnemies = Math.floor(Math.random() * 11) + 5; // 5에서 15 사이의 랜덤한 적의 개수 생성
    for (let i = 0; i < numberOfEnemies; i++) {
        let x, y;
        // x 좌표와 y 좌표를 화면 바깥으로 설정
        if (Math.random() < 0.5) {
            // x 좌표 설정
            x = Math.random() < 0.5 ? -margin : width + margin;
            // y 좌표 랜덤 설정
            y = Math.random() * (height + 2 * margin) - margin;
        } else {
            // y 좌표 설정
            y = Math.random() < 0.5 ? -margin : height + margin;
            // x 좌표 랜덤 설정
            x = Math.random() * (width + 2 * margin) - margin;
        }
        const enemy = new Enemy(x, y);
        enemies.push(enemy);
    }
}

// 적군 그리기 함수
function drawEnemies() {
    enemies.forEach(enemy => {
        enemy.draw();
    });
}

// 적군 업데이트 함수
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.update();
    });
}

// 시작 버튼 클릭 이벤트 핸들러
function handleStartButtonClick() {
    if (!isGameStarted) {
        isGameStarted = true;
        startButton.style.display = 'none';
        setInterval(function() {
            createEnemies(); // 1초마다 적 생성
        }, 1000);
        requestAnimationFrame(gameLoop);
    }
}

// 게임 루프
function gameLoop() {
    if (isGameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameScreen();
        updateEnemies();
        requestAnimationFrame(gameLoop);
    }
}

// 페이지 로드 시 타이틀 화면 그리기
drawTitleScreen();

// 타이틀 화면 그리기 함수
function drawTitleScreen() {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '50px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    const WIDTH = canvas.width / 2;
    const HEIGHT = canvas.height / 2;
    ctx.fillText('게임 만들기 너무 힘들어요', WIDTH, HEIGHT - 100);
    ctx.fillText('교수님 살려주세요.', WIDTH, HEIGHT - 20);
}

// 랜덤 위치에 하트 그리기 함수
function drawRandomHeart() {
    heartX = Math.random() * canvas.width;
    heartY = Math.random() * canvas.height;
}

// 하트 그리기 함수
function drawHeart(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.bezierCurveTo(x + 10, y - 30, x + 30, y - 30, x + 40, y - 20); // 오른쪽 윗부분
    ctx.bezierCurveTo(x + 60, y - 10, x + 60, y + 10, x + 40, y + 30); // 오른쪽 아랫부분
    ctx.lineTo(x, y + 80); // 아랫부분
    ctx.lineTo(x - 40, y + 30); // 왼쪽 아랫부분
    ctx.bezierCurveTo(x - 60, y + 10, x - 60, y - 10, x - 40, y - 20); // 왼쪽 윗부분
    ctx.bezierCurveTo(x - 30, y - 30, x - 10, y - 30, x, y - 20); // 다시 오른쪽 윗부분
    ctx.closePath();
    ctx.fillStyle = 'red'; // 색상을 빨간색으로 고정
    ctx.fill();
}

// F5 키 이벤트 처리
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 116) { // F5 키 코드는 116입니다.
        event.preventDefault(); // 기본 동작을 막음 (페이지 새로고침 방지)
        drawRandomHeart(); // 랜덤 위치에 하트 그리기 함수 호출
    }
});
