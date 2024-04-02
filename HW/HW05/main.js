// Canvas 요소 가져오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

// 회전 속도 설정
var earthOrbitSpeed = -Math.PI / 200; // 지구의 태양 주위 공전 속도 (시계 반대 방향)
var earthRotationSpeed = -Math.PI / 150; // 지구의 자전 속도 (시계 반대 방향)
var sunOrbitSpeed = -Math.PI / 100; // 태양의 중심 주위 공전 속도 (시계 반대 방향)
var moonOrbitSpeed = Math.PI / 80; // 달의 달 중심 주위 공전 속도 (시계 방향)
var moonRotationSpeed = Math.PI / 100; // 달의 지구 중심 주위 공전 속도 (시계 방향)

// 각 오브젝트의 초기 각도 설정
var earthOrbitAngle = 0; // 지구의 태양 주위 공전 초기 각도
var earthRotationAngle = 0; // 지구의 자전 초기 각도
var sunOrbitAngle = 0; // 태양의 중심 주위 공전 초기 각도
var moonOrbitAngle = 0; // 달의 달 중심 주위 공전 초기 각도
var moonRotationAngle = 0; // 달의 지구 중심 주위 공전 초기 각도

// 애니메이션 시작
draw();

// 애니메이션 함수 정의
function draw() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 태양 그리기
    ctx.fillStyle = "orange";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);

    // 지구 그리기
    var earthX = canvas.width / 2 + Math.cos(sunOrbitAngle) * 300;
    var earthY = canvas.height / 2 + Math.sin(sunOrbitAngle) * 300;
    ctx.save();
    ctx.translate(earthX, earthY);
    ctx.rotate(earthRotationAngle);
    ctx.fillStyle = "blue";
    ctx.fillRect(-25, -25, 75, 75);
    ctx.restore();

    // 달 그리기
    var moonX = earthX + Math.cos(moonOrbitAngle) * 100;
    var moonY = earthY + Math.sin(moonOrbitAngle) * 100;
    ctx.save();
    ctx.translate(moonX, moonY);
    ctx.rotate(moonRotationAngle);
    ctx.fillStyle = "gray";
    ctx.fillRect(-10, -10, 30, 30);
    ctx.restore();

    // 회전 속도 업데이트
    updateRotation();

    // 다음 프레임 요청
    requestAnimationFrame(draw);
}

// 회전 속도 갱신 함수
function updateRotation() {
    earthOrbitAngle -= earthOrbitSpeed;
    earthRotationAngle += earthRotationSpeed;
    sunOrbitAngle += sunOrbitSpeed;
    moonOrbitAngle += moonOrbitSpeed;
    moonRotationAngle += moonRotationSpeed;
}
