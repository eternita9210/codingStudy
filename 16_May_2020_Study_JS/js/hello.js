const nameContainer = document.querySelector(".js-name");

function drawName(name) {
    nameContainer.innerHTML = "";
    const drawName = document.createElement("span");
    drawName.className = "name_text";
    drawName.innerHTML = `Hello! ${name}!`;
    nameContainer.appendChild(drawName);
}

function handleSubmit(event) {
    event.preventDefault(); //이벤트 버블링 막기
    const form = event.target;
    const input = form.querySelector("input");
    const name = input.value; // input 입력값의 value 받아오기
    localStorage.setItem("username", name);
    drawName(name);
}

function drawInput() {
    // 이름 입력창
    const input = document.createElement("input");
    input.type = "text";
    input.class = "input_name";
    input.placeholder = "Type your name here!";
    
    const form = document.createElement("form");

    form.addEventListener("submit", handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);
}

function checkName() {
    // 페이지 입장 시, myName 값이 있는지 없는지 확인
    // 입력된 이름은 local stroage 저장 예정
    const name = localStorage.getItem("username");
    if(name === null) {
        // 처음 입장
        // 이름 입력 > username으로 local에 저장 
        drawInput();
        // > innerHTML 노출
    } else {
        // 이름 존재
        // username 키값으로 저장된 이름을 innHTML로 노출
        drawName(name)
    }
}

function init() {
    checkName();
}

init();