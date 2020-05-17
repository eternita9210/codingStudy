const body = document.querySelector("body"),
    locationText = document.querySelector(".location_text");
const API_KEY = "hLlKf8_5PodsEsG7-EQY34r7L-RfL04DMVloyNySGcA";
const IMAGEURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&orientation=landscape&query=landscape`;

function saveBackground(url, city, country, name) {

    const savedImage = localStorage.getItem("background");
    if(savedImage !== null) {
        localStorage.removeItem("background");
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    const imageObject = {
        url: url,
        expireDate: expireDate,
        city: city,
        country: country,
        name: name
    };
    localStorage.setItem("background", JSON.stringify(imageObject));
    //저장 시, object > JSON.stringify!!
    //저장내용 불러오기
}

function getBackground() {
    // API URL로 요청하고 반환받아 localStorage에 저장
    // fetch(IMAGEURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(JSON.stringify(myJson));
    //     });
    fetch(IMAGEURL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if (image.urls && image.urls.full && image.location.city && image.location.country && image.location.name) {
                const full = image.urls.full;
                const city = image.location.city;
                const country = image.location.country;
                const name = image.location.name;
                // 저장된 image, city, country, name > localStorage 저장
                saveBackground(full, city, country, name);
            } else {
                // 실패하는 경우 다시 요청
                getBackground();
            }
        })
}

function loadBackground() {
    // 저장된 키값은 변경될 일이 없고, 다시 선언되지 않아야 하므로 const
    const savedImage = localStorage.getItem("background");
    if (savedImage === null) {
        // 로컬스테이지 내에 background 키값을 가진 value 없을 때
        getBackground();
    } else {
        const parsedImageOjbect = JSON.parse(savedImage);
        // 있을 때
        // 현재 날짜 불러오고
        const today = new Date();
        if(today > parsedImageOjbect.expireDate) {
            // 유통기한을 오늘 날짜 + 로 정하고
            // 불러올 때 유통기한이 오늘보다 지나면 다시 요청
            getBackground();
        } else {
            // 유통기한이 남았다면 이미 받아온 것 사용
            body.style.background = `url(${parsedImageOjbect.url})`;
            locationText.innerHTML = 
                `${parsedImageOjbect.name}, ${parsedImageOjbect.city}, ${parsedImageOjbect.country}`
        }
        
    }
}

function init() {
    loadBackground();
}

init();