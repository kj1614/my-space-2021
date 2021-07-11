const mottoForm = document.querySelector(".center_motto form");
const mottoInput = mottoForm.querySelector("input");
const motto = document.querySelector(".motto_title");
const remotto = motto.querySelector(".remotto");
const mottoText = motto.querySelector(".motto__text");


const MOTTO_LS = "currentMotto";
const MOTTO_SHOWING_CN = "showing";

function reMotto(){
    localStorage.removeItem(MOTTO_LS);
    resetPaintMotto();
}

function saveMotto(text){
    localStorage.setItem(MOTTO_LS, text);
}

function askForMotto(){
    mottoForm.classList.add(MOTTO_SHOWING_CN);
    mottoForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = mottoInput.value;
    paintMotto(currentValue);
    saveMotto(currentValue);
}

function resetPaintMotto(){
    motto.classList.remove(MOTTO_SHOWING_CN);
    mottoForm.classList.add(MOTTO_SHOWING_CN);
}

function paintMotto(text){
    mottoText.innerText = `${text}`;
    mottoForm.classList.remove(MOTTO_SHOWING_CN);
    motto.classList.add(MOTTO_SHOWING_CN);
}

function loadMotto(){
    const currentMotto = localStorage.getItem(MOTTO_LS);
    if(currentMotto === null){
        askForMotto();
    }else{
        paintMotto(currentMotto);
    }
}

function init(){
    loadMotto();
    remotto.addEventListener("click",reMotto);
}

init();