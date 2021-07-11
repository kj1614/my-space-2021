const nameForm = document.querySelector(".js-askName");
const nameInput = nameForm.querySelector("input");
const rename = document.querySelector("div div .rename");
const owner = document.querySelector("div div h1");
const title =document.querySelector("title");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function reName(){
    localStorage.removeItem(USER_LS);
    resetPaint();
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    paintOwner(currentValue);
    paintTitle(currentValue);
    saveName(currentValue);
}

function resetPaint(){
    owner.innerText = `My SPACE `;
    title.innerText = `My SPACE `;
    rename.classList.remove(SHOWING_CN);
    nameForm.classList.add(SHOWING_CN);
}

function paintOwner(text){
    owner.innerText = `${text}'s SPACE`;
    nameForm.classList.remove(SHOWING_CN);
    rename.classList.add(SHOWING_CN);
}

function paintTitle(text){
    title.innerText = `${text}'s SPACE`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintOwner(currentUser);
        paintTitle(currentUser);
    }
}

function init(){
    loadName();
    rename.addEventListener("click",reName)
}

init();