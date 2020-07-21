const WEATHER_API_KEY = "17cd68dba3faee486cd5a6968adc36bd";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHER_API_URL = "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}";

const sunriseContainer = document.querySelector(".js-weather .sunrise__text"),
weatherContainer = document.querySelector(".js-weather .weather__text");

function getWeather(crd) {
    // 위치 기반 날씨 조회
    const WEATHER_API_URL = `${WEATHER_API}lat=${crd.latitude}&lon=${crd.longitude}&appid=${WEATHER_API_KEY}&units=metric `;

    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(json => {
                const currentTemp = json.main.temp;
                const Mycountry = json.sys.country;

                // 타임 스탬프를 -> 현재시간으로 반환
                const sunriseTime = new Date(json.sys.sunrise * 1000);

                // 현재 시간을 -> 타임스탬프로 반환
                const practiceTimestamp = new Date().getTime() / 1000;
                //console.log(Math.floor(practiceTimestamp));

                const sunriseHours = sunriseTime.getHours();
                const sunriseMinutes = sunriseTime.getMinutes();
                const sunrise = `${sunriseHours}시 ${sunriseMinutes}분`;

                // 그냥 하면 1589574087 이지랄로 나와서 바꿔줘야함

                //console.log(`현재 기온은 : ${currentTemp}, 나는 지금 ${Mycountry} 에 있고, 일출 시간은 ${sunrise} 입니다.`);

                weatherContainer.innerText = `현재 기온 : ${currentTemp}`;
                sunriseContainer.innerText = `${Mycountry}, sunrise : ${sunrise}`;

            }

        );
}

function getPosition() {
    // 위치 조회 메소드
    function success(pos) {
        // 성공
        const crd = {
            // 배열로 만들어서 넣어주기
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };
         //console.log(pos);
         //console.log('Your current position is:');
         //console.log('Latitude : ' + crd.latitude);
         //console.log('Longitude: ' + crd.longitude);

        localStorage.setItem("coords", JSON.stringify(crd));
        // 날씨정보를 불러와야 함
        getWeather(crd);
        // 위도 경도 던져주기  parsedMyLocation == crd

    };

    function error(err) {
        // 실패
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    // 브라우저(사용자) 위치 확인
    navigator.geolocation.getCurrentPosition(success, error);

}


function loadWeather() {
    const myLocation = localStorage.getItem("coords");

    if (myLocation !== null) {
        // 날씨 정보를 불러와서 담기(json 파싱)
        const parsedMyLocation = JSON.parse(myLocation);
        // parsedMyLocation 안에 위도, 경도가 들어가있으므로 그대로 던져주기
        getWeather(parsedMyLocation);
    } else {
        // 내 위치정보가 없다면 위치 조회부터 진행
        getPosition();
    }

}

function init() {
    // 현재 날씨 호출
    loadWeather();
}
init(); 