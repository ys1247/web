const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas의 크기를 2배로 설정하여 레티나 디스플레이를 고려
const width = canvas.clientWidth * 2;
const height = canvas.clientHeight * 2;
canvas.width = width;
canvas.height = height;

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

// 별 그리기 함수 호출
drawStar();

// 랜덤 위치에 하트 그리기 함수
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

// 페이지를 새로 고칠 때마다 랜덤 위치에 하트 그리기
function drawRandomHeart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 clear하여 이전 프레임의 그림을 지웁니다.
    drawStar(); // 별 그리기 함수 호출

    const randomX = Math.random() * width;
    const randomY = Math.random() * height;
    drawHeart(randomX, randomY); // 랜덤 위치에 하트 그리기 함수 호출
}

// F5 키 이벤트 리스너 정의
function handleF5Event(event) {
    if (event.keyCode === 116) { // F5 키 코드
        drawRandomHeart();
        event.preventDefault(); // F5 키의 기본 동작을 막음
    }
}

// 페이지 로드 시 한 번 호출
drawRandomHeart();

// F5 키 이벤트 리스너 등록
document.addEventListener('keydown', handleF5Event);

