// 캔버스 요소와 2D 드로잉 컨텍스트 가져오기
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 캔버스의 중심 좌표 계산
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// 삼각형의 크기 정의
const triangleSize = 250;

// 회전 각도와 색상 토글 플래그 초기화
let angle = 0;
let isBlue = false;

// 캔버스에 삼각형을 그리는 함수
function drawTriangle() {
    // 캔버스를 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 현재 캔버스 상태 저장
    ctx.save();
    
    // 캔버스 원점을 캔버스 중심으로 이동
    ctx.translate(centerX, centerY);
    
    // 지정된 각도만큼 캔버스 회전
    ctx.rotate(angle);

    // 삼각형 경로 시작
    ctx.beginPath();
    // 삼각형의 위쪽 꼭짓점으로 이동
    ctx.moveTo(0, -triangleSize);
    // 오른쪽 아래 꼭짓점까지 선 그리기
    ctx.lineTo(triangleSize * Math.sin(Math.PI / 3), triangleSize * Math.cos(Math.PI / 3));
    // 왼쪽 아래 꼭짓점까지 선 그리기
    ctx.lineTo(-triangleSize * Math.sin(Math.PI / 3), triangleSize * Math.cos(Math.PI / 3));
    // 삼각형 경로 닫기
    ctx.closePath();

    // 채우기 색상 설정
    ctx.fillStyle = isBlue ? 'blue' : 'green';
    // 삼각형 채우기
    ctx.fill();

    // 이전에 저장한 캔버스 상태 복원
    ctx.restore();
}

// 애니메이션 함수
function animate() {
    // 각도 증가
    angle += 0.01;
    // 삼각형 그리기
    drawTriangle();
    // 다음 애니메이션 프레임 요청
    requestAnimationFrame(animate);
}

// 삼각형 내부 클릭 확인 함수
function isInsideTriangle(x, y) {
    // 삼각형의 꼭짓점 좌표 정의
    const p0 = { x: 0, y: -triangleSize };
    const p1 = { x: triangleSize * Math.sin(Math.PI / 3), y: triangleSize * Math.cos(Math.PI / 3) };
    const p2 = { x: -triangleSize * Math.sin(Math.PI / 3), y: triangleSize * Math.cos(Math.PI / 3) };

    // 클릭 좌표를 삼각형 좌표계로 변환
    const transformedX = (x - centerX) * Math.cos(-angle) - (y - centerY) * Math.sin(-angle);
    const transformedY = (x - centerX) * Math.sin(-angle) + (y - centerY) * Math.cos(-angle);

    // 변환된 클릭 좌표
    const dX = transformedX;
    const dY = transformedY;

    // 삼각형 원래의 넓이 계산
    const areaOrig = Math.abs((p0.x * (p1.y - p2.y) + p1.x * (p2.y - p0.y) + p2.x * (p0.y - p1.y)) / 2);
    // 각 부분 삼각형의 넓이 계산
    const area1 = Math.abs((dX * (p1.y - p2.y) + p1.x * (p2.y - dY) + p2.x * (dY - p1.y)) / 2);
    const area2 = Math.abs((p0.x * (dY - p2.y) + dX * (p2.y - p0.y) + p2.x * (p0.y - dY)) / 2);
    const area3 = Math.abs((p0.x * (p1.y - dY) + p1.x * (dY - p0.y) + dX * (p0.y - p1.y)) / 2);

    // 삼각형 내부에 있는지 여부 반환
    return areaOrig === area1 + area2 + area3;
}

// 캔버스 클릭 이벤트 리스너 추가
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 클릭이 삼각형 내부에 있는지 확인하고 색상 토글
    if (isInsideTriangle(x, y)) {
        isBlue = !isBlue;
    }
});

// 애니메이션 시작
animate();
