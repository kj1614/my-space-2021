const clockTitle = document.querySelector(".js-clock");

function get12Time(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const ampmHours = hours % 12;
    const zeroAmPm = ampmHours ? ampmHours : 12;
    clockTitle.innerText = 
    `${zeroAmPm < 10 ? `0${zeroAmPm}` : zeroAmPm}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
}

function get24Time(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = 
    `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}

function overBtn(){
    const time = document.querySelector(".left_time");
    const classlist = time.classList;
    if(classlist.contains("12hours")){
        clockTitle.innerText = "24HOURS";
    }else{
        clockTitle.innerText = "12HOURS";
    }
}

function changeTime(){
    const time = document.querySelector(".left_time");
    const classlist = time.classList;
    if(classlist.contains("12hours")){
        classlist.replace("12hours", "24hours");
    }else{
        classlist.replace("24hours", "12hours");
    }
}

function set12or24(){
    const time = document.querySelector(".left_time");
    const classlist = time.classList;
    if(classlist.contains("12hours")){
        get12Time();
    }else{
        get24Time();
    }
}

function init(){
    set12or24();
    setInterval(set12or24, 1000);
    clockTitle.addEventListener("mouseover",overBtn);
    clockTitle.addEventListener("click", changeTime);
}

init();