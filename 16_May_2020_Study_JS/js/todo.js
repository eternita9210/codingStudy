const form = document.querySelector(".js-to-do"),
    input = document.querySelector(".js-add-to-do"),
    list = document.querySelector(".js-list");

function addToDo(inputValue) {
    // 목록 추가 메소드
    const toDo = document.createElement("li");
    toDo.className = "toDo";
    // 입력된 할 일 div 생성

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText =" ❌ ";
    deleteBtn.className ="toDo__button";
    // 할 일 목록 삭제 버튼 생성
    deleteBtn.addEventListener("click", clickDelete);
    // 삭제 기능

    const label = document.createElement("label");
    label.innerText = inputValue;

    //ul -> li -> label
    toDo.appendChild(label);
    toDo.appendChild(deleteBtn);
    list.appendChild(toDo);
}

function clickDelete(event){
    // list 목록 삭제
    //alert("삭제됨");
    alert(event.target.parentElement.parentElement);
}

function onSubmit(oziraper) {
    // to do list 목록 입력 메소드
    oziraper.preventDefault();
    if (input.value === "") {
        // 아무것도 입력하지 않은체 보내면
        alert("할 일이 입력되지 않았습니다.");
    } else {
        addToDo(input.value);
        // 입력된 TEXT를 할 일로 추가
        localStorage.setItem("toDos", input.value);
        // 입력된 text 할 일을 localstorage에 추가
        input.value = "";
        // 입력된 text를 할 일로 추가했으면, input 공간을 다시 비움
    }
};


function loadToDos() {
    // to do list 호출
    const loadedToDos = localStorage.getItem("toDos");

    if (loadedToDos !== null) {
        // ul 태그 안에 그려주기
        list.innerHTML = loadedToDos;
    } else {
        // 내용이 없을 경우 '할 일 없음'이라고 노출
        list.innerHTML = '할 일 없음';
    }
}

function init() {
    // 로컬 스토리지에 저장된 to do list 호출
    loadToDos();
}

form.addEventListener("submit", onSubmit);
// function 안에 있으면, 특정 조건이 되어야만 호출이 되기 때문에 function 밖에 작성
// > 항상 변화가 있을때마다 반응
// addEventListener ( 행동 ex) click, submit, onmousedown, onmouseup, onchange, )
init(); 