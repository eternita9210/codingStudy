// 페이지 중앙 시계 기능
const clockContainer = document.querySelector(".js-clock .clock__text");

function getTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    // 백틱 : `` >  ${}를 사용해서 변수명과 문자열을 결합할 때 사용
    const now = 
    `${hours < 10 ? `0${hours}`:hours}:${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;

    clockContainer.innerHTML = now;
}

function init(){
    // 시간 알아내기
        getTime();
        setInterval(getTime, 1000);
    
}

init();