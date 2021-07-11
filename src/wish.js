const wishSelect = document.querySelector(".wish__select");

const wishForm = document.querySelector(".wish__add");
const wishInput = wishForm.querySelector("input");
const haveList = document.querySelector(".wish_have_li");
const doList = document.querySelector(".wish_do_li");
const changeList = document.querySelector(".wish_change_li");
const madeList = document.querySelector(".wish_made_li");
//const wantsTasks = document.querySelector(".wish__wants");

const WHAVE = "have";
const WDO = "do";
const WCHANGE = "change";
const WMADE = "made";

const WISH_LIS = "wish_lis"

let haveTasks = [],
    doTasks = [],
    changeTasks = [],
    madeTasks = [];

function getWishObject(text, Select){
    return{
        id:String(Date.now()),
        text,
        class:Select
    };
}

function removeFromHave(taskId){
    haveTasks = haveTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromDo(taskId){
    doTasks = doTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromChange(taskId){
    changeTasks = changeTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromMade(taskId){
    madeTasks = madeTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function deleteWish(e){
    const li = e.target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    removeFromHave(li.id);
    removeFromDo(li.id);
    removeFromChange(li.id);
    removeFromMade(li.id);
    saveWish();
}

function buildWishLi(task){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const div = document.createElement("div");
    span.innerText = task.text;
    deleteBtn.innerText = "❌"
    deleteBtn.addEventListener("click", deleteWish);
    div.append(deleteBtn);
    li.append(span, div);
    li.id = task.id;
    li.classList.add(task.class);
    li.classList.add(WISH_LIS);
    return li;
}

function findInWants(taskId, taskClass){
    if(taskClass.includes(WHAVE)){
        return haveTasks.find(function(task){
            return task.id===taskId;
        });
    }else if(taskClass.includes(WDO)){
        return doTasks.find(function(task){
            return task.id===taskId;
        });
    }else if(taskClass.includes(WCHANGE)){
        return changeTasks.find(function(task){
            return task.id===taskId;
        });
    }else{}
}

function addToMade(task){
    madeTasks.unshift(task);
}

function findInMade(taskId){
    return madeTasks.find(function(task){
        return task.id === taskId;
    });
}

function addToWants(task, taskClass){
    if(taskClass === WHAVE){
        haveTasks.push(task);
    }else if(taskClass === WDO){
        doTasks.push(task);
    }else if(taskClass === WCHANGE){
        changeTasks.push(task);
    }else{}
}

function handleUndoClick(e){
    const li = e.target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    const taskId = findInMade(li.id);
    const taskClass = taskId.class
    removeFromMade(li.id);
    addToWants(taskId, taskClass);
    paintWantTask(taskId);
    saveWish();
}

function paintMadeTask(task){
    const wishLi = buildWishLi(task);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⬅";
    backBtn.addEventListener("click",handleUndoClick)
    wishLi.querySelector("div").append(backBtn);
    madeList.append(wishLi);
}

function handleMadeClick(e){
    const li = e.target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    const task = findInWants(li.id, li.classList.value);
    removeFromHave(li.id);
    removeFromDo(li.id);
    removeFromChange(li.id);
    addToMade(task);
    paintMadeTask(task);
    saveWish();
}

function appendWantTask(task){
    const wishLi = buildWishLi(task);
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.addEventListener("click", handleMadeClick);
    wishLi.querySelector("div").append(completeBtn);
    return wishLi;
}

function paintWantTask(task){
    const wishLi = appendWantTask(task)
    if(wishLi.classList.contains(WHAVE)){
        haveList.append(wishLi);
    } else if(wishLi.classList.contains(WDO)){
        doList.append(wishLi);
    } else if(wishLi.classList.contains(WCHANGE)){
        changeList.append(wishLi);
    } else{}
}

function saveWantTask(task){
    if(task.class === WHAVE){
        haveTasks.push(task);
    } else if(task.class === WDO){
        doTasks.push(task);
    } else if(task.class === WCHANGE){
        changeTasks.push(task);
    } else{}
}

function saveWish(){
    localStorage.setItem(WHAVE, JSON.stringify(haveTasks));
    localStorage.setItem(WDO, JSON.stringify(doTasks));
    localStorage.setItem(WCHANGE, JSON.stringify(changeTasks));
    localStorage.setItem(WMADE, JSON.stringify(madeTasks));
}

function handleWishSubmit(e){
    e.preventDefault();
    const taskObj = getWishObject(wishInput.value, wishSelect.value);
    wishInput.value = "";
    wishSelect.value = "";
    paintWantTask(taskObj);
    saveWantTask(taskObj);
    saveWish();
}

function restoreWish(){
    haveTasks.forEach(function(task){
        paintWantTask(task);
    });
    doTasks.forEach(function(task){
        paintWantTask(task);
    });
    changeTasks.forEach(function(task){
        paintWantTask(task);
    });
    madeTasks.forEach(function(task){
        paintMadeTask(task);
    });
}

function loadWish(){
    haveTasks = JSON.parse(localStorage.getItem(WHAVE))||[];
    doTasks = JSON.parse(localStorage.getItem(WDO))||[];
    changeTasks = JSON.parse(localStorage.getItem(WCHANGE))||[];
    madeTasks = JSON.parse(localStorage.getItem(WMADE))||[];
}

function init(){
    wishForm.addEventListener("submit", handleWishSubmit)
    loadWish();
    restoreWish();
}

init();