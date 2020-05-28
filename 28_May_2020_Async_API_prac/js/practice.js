const body = document.querySelector(".bodywrapper");

function requestAPI() {
    const URL = "https://dapi.kakao.com/v3/search/book";
    const target = "target=title";
    const query = "query='JAVA'";

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "KakaoAK 10b61cc7b083067886d7c41cfbc11f24");

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    const myRequest = new Request(`${URL}?${target}&${query}`, myInit);

    // fetch(myRequest)
    //     .then(function (response) {
    //         return response.json();
    //     }).then(function (myJson) {
    //         const finalData = JSON.stringify(myJson);
    //         //console.log(myJson);
    //         localStorage.setItem("myData", finalData);
    //         drawOnBody(finalData);
    //     });
    fetch(myRequest)
        .then(response => response.json())
        .then(json => {
            const finalData = JSON.stringify(json);
            localStorage.setItem("myData", finalData);
            drawOnBody(finalData);
        });
}

function drawOnBody(data) {
    const finalJsonData = JSON.parse(data);
    for (var i = 0; i < finalJsonData.documents.length; i++) {
        body.innerHTML += finalJsonData.documents[i].title + "<br>";
    }
}

function loadSearch() {
    const myData = localStorage.getItem("myData");
    if (myData === null) {
        //API 요청
        console.log("값 없음");
        requestAPI();
    } else {
        //body에 기록
        console.log("값 있음");
        drawOnBody(myData);
    }
}

function init() {
    loadSearch();

    // 옛날 버전
    var arr = [1,2,3];
    var pow = arr.map(function (x) {
        return x * 3;
    });
    console.log(pow);

    // 최근 버전(화살표 함수)
    const arr2 = [1,2,3];
    const pow2 = arr2.map(x => x*3);
    console.log(pow2);

    const student = {
        name:"yeon",
        age:28
    }

    const student2 = {
        name:"weiin",
        age:16
    }

    // Object에 sayhello라는 함수를 직접 올림
    Object.prototype.sayhello = function() {
        //console.log(`Hello, my name is ${student.name}.
        //I am ${student.age} years old.`);
        console.log(`Hello, my name is ${this.name}. I am ${this.age} years old.`);
    }

    function sayHello() {
        console.log(`Hello, my name is ${this.name}. I am ${this.age} years old.`)
    }

    sayhello();
    sayHello(); //이 함수의 경우, this를 알 수 없기 떄문에 빈 칸 또는 undefined
    // this를 쓰기 위해서는 this에 들어갈 값들이 있는 변수가 필요
    student.sayhello();
    student2.sayhello();

    function sayHello2(name, age) {
        console.log(`Hello, my name is ${name}. I am ${age} years old.`);
    }

    sayHello2(student2.name, student2.age);

    
    setInterval(getSeconds, 1000);
    

}

function getSeconds() {
    const date = new Date();
    const seconds = date.getSeconds();
    const time = document.createElement("div");
    time.className = "currentTime";
    time.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`
    body.appendChild(time);
}

init();