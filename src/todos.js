const toDoForm = document.querySelector(".todos__add");
const toDoInput = toDoForm.querySelector("input");

const pendingList = document.querySelector(".todos__pending");
const finishedList = document.querySelector(".todos__finished");

const pendingSpan = document.querySelector(".ul__pending");
const finishedSpan = document.querySelector(".ul__finished");
const todoDiv = document.querySelector(".center_todos");

const PENDING = "PENDING";
const FINISHED = "FINISHED";
const SHOWING_UL = "showing";

let pendingTasks = [];
let finishedTasks= [];

function checkPendingLi(){
    const pLength = pendingTasks.length;
    if(pLength !== 0){
        pendingSpan.classList.add(SHOWING_UL);
        pendingList.classList.add(SHOWING_UL);
    }else{
        pendingSpan.classList.remove(SHOWING_UL);
        pendingList.classList.remove(SHOWING_UL);
    }
}

function checkFinishedLi(){
    const fLength = finishedTasks.length;
    if(fLength !== 0){
        finishedSpan.classList.add(SHOWING_UL);
        finishedList.classList.add(SHOWING_UL);
    }else{
        finishedSpan.classList.remove(SHOWING_UL);
        finishedList.classList.remove(SHOWING_UL);
    }
}

function ulShowCheck(){
    checkPendingLi();
    checkFinishedLi();
}

function handleFormSubmit(e){
    e.preventDefault();
    const taskObj = getTaskObject(toDoInput.value);
    toDoInput.value = "";
    paintPendingTask(taskObj);
    savePendingTask(taskObj);
    saveState();
}

function addToFinished(task){
    finishedTasks.push(task);
}

function findInPending(taskId){
    return pendingTasks.find(function(task){
        return task.id===taskId;
    });
}

function findInFinished(taskId){
    return finishedTasks.find(function(task){
        return task.id === taskId;
    });
}

function addToPending(task){
    pendingTasks.push(task);
}

function handleBackClick(e){
    const li = e.target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(task);
    paintPendingTask(task);
    saveState();
}

function paintFinishedTask(task){
    const li = document.createElement("li");
    const span = buildGenericSpan(task);
    const delbtn = buildGenericDelbtn();
    const backBtn = document.createElement("i");
    const div = document.createElement("div");
    backBtn.classList.add("far", "fa-check-square");
    backBtn.addEventListener("click",handleBackClick);
    div.append(backBtn,span);
    li.append(div,delbtn);
    li.id = task.id;
    finishedList.append(li);
}

function handleFinishClick(e){
    const li = e.target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(task);
    paintFinishedTask(task);
    saveState();
}

function paintPendingTask(task){
  const li = document.createElement("li");
  const span = buildGenericSpan(task);
  const delbtn = buildGenericDelbtn();
  const div = document.createElement("div");
  const completeBtn = document.createElement("i");
  completeBtn.classList.add("far", "fa-square");
  completeBtn.addEventListener("click", handleFinishClick);
  div.append(completeBtn,span);
  li.append(div,delbtn);
  li.id = task.id;
  pendingList.append(li);
}

function savePendingTask(task){
  pendingTasks.push(task);
}

function loadState(){
    pendingTasks = JSON.parse(localStorage.getItem(PENDING))||[];
    finishedTasks = JSON.parse(localStorage.getItem(FINISHED))||[];    
}

function saveState(){
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED,JSON.stringify(finishedTasks));
}

function restoreState(){
    pendingTasks.forEach(function(task){
        paintPendingTask(task);
    });
    finishedTasks.forEach(function(task){
        paintFinishedTask(task);
    });
}

function getTaskObject(text){
    return{
        id: String(Date.now()),
        text: text
    };
}

function removeFromFinished(taskId){
    finishedTasks = finishedTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromPending(taskId){
    pendingTasks = pendingTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function deleteTask(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromPending(li.id);
    saveState();
}

function buildGenericSpan(task){
    const span = document.createElement("span");
    span.innerText = task.text;
    return span;
}

function buildGenericDelbtn(){
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteTask);
    return deleteBtn;
}

function init(){
    toDoForm.addEventListener("submit",handleFormSubmit);
    loadState();
    restoreState();
    ulShowCheck();
    todoDiv.addEventListener("click", ulShowCheck);
    todoDiv.addEventListener("submit", ulShowCheck);
}

init();