// Canvas Element 가져오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

// HeartObject 클래스 정의
class HeartObject {
    constructor(positionX, positionY, color, speedX, speedY, rotationSpeed, scale) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotationSpeed = rotationSpeed;
        this.scale = scale;
    }

    draw() {
        ctx.save(); // 현재 캔버스 상태 저장
        ctx.translate(this.positionX, this.positionY); // 중심점 이동
        ctx.rotate(this.rotationSpeed * Math.PI / 180); // 회전
        ctx.scale(this.scale, this.scale); // 크기 조절

        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.bezierCurveTo(10, -30, 30, -30, 40, -20); // 오른쪽 윗부분
        ctx.bezierCurveTo(60, -10, 60, 10, 40, 30); // 오른쪽 아랫부분
        ctx.lineTo(0, 80); // 아랫부분
        ctx.lineTo(-40, 30); // 왼쪽 아랫부분
        ctx.bezierCurveTo(-60, 10, -60, -10, -40, -20); // 왼쪽 윗부분
        ctx.bezierCurveTo(-30, -30, -10, -30, 0, -20); // 다시 오른쪽 윗부분
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore(); // 이전 캔버스 상태 복원
    }

    update() {
        // 위치 업데이트
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        // Canvas 경계에 닿으면 이동 방향을 반대로 변경
        if (this.positionX + 60 * this.scale > canvas.width || this.positionX - 60 * this.scale < 0) {
            this.speedX = -this.speedX;
        }
        if (this.positionY + 80 * this.scale > canvas.height || this.positionY - 20 * this.scale < 0) {
            this.speedY = -this.speedY;
        }

        // 회전 업데이트
        this.rotationSpeed += 1;
    }
}

var hearts = [];

// 마우스 이벤트 리스너 추가
canvas.addEventListener('mousemove', function(event) {
    createFollowingHeart(event.clientX - canvas.getBoundingClientRect().left, event.clientY - canvas.getBoundingClientRect().top);
});

// 새로운 하트 생성 함수
function createFollowingHeart(mouseX, mouseY) {
    var color = getRandomColor(); // 랜덤한 색상
    var speedX = Math.random() * 4 - 2; // x 방향 속도
    var speedY = Math.random() * 4 - 2; // y 방향 속도
    var rotationSpeed = Math.random() * 4 - 2; // 회전 속도
    var scale = Math.random() * 0.5 + 0.5; // 크기

    var heart = new HeartObject(mouseX, mouseY, color, speedX, speedY, rotationSpeed, scale);
    hearts.push(heart);
}

// 랜덤한 색상 반환 함수
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 clear하여 이전 프레임의 그림을 지웁니다.

    // 하트 그리고 위치 업데이트
    for (var i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
    }

    // 최대 100개의 하트만 유지하도록 배열 제한
    if (hearts.length > 100) {
        hearts.splice(0, hearts.length - 100);
    }

    requestAnimationFrame(draw);
}

draw();
