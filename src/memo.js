const newMemo = document.querySelector(".memo_new");
const uploadMemo = document.querySelector(".memo_upload");
const deleteMemo = document.querySelector(".memo_delete");
const contentsWrite = document.querySelector(".contents_write");
const contentsLetter = document.querySelector(".contents_letter");
const alertDelete = document.querySelector(".alert_delete");
const alertUpload = document.querySelector(".alert_upload");
const deleteYes = document.querySelector(".del_yes");
const deleteNo = document.querySelector(".del_no");
const alertOff = document.querySelector(".alert_upload div")
const nextFront = document.querySelector(".next_front");
const nextBack = document.querySelector(".next_back");

const M_SHOWING = "showing";
const MEMO = "MEMO";

let memoList = [];

function handleNextBack(){
    const memoZero = memoList[0];
    memoList = memoList.filter(function(memo){
        return memo !== memoZero
    })
    memoList.push(memoZero);
    paintMemo(memoList[0]);
}

function handleNextFront(){
    const memoEnd = memoList[memoList.length-1];
    memoList = memoList.filter(function(memo){
        return memo !== memoEnd
    })
    memoList.unshift(memoEnd);
    paintMemo(memoList[0]);
}

function handleNoClick(){
    alertDelete.classList.remove(M_SHOWING);
}

function removeFromFinished(taskId){
    finishedTasks = finishedTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function deleteThisMemo(){
    const memoNow = contentsLetter.innerText;
    memoList = memoList.filter(function(memo){
        return memo !== memoNow;
    });
    memoList = memoList.filter(function(memo){
        return memo !== null;
    })
    saveMemo();
    if(memoList.length === 0){
        paintMemo("");
    }else{
        paintMemo(memoList[0]);
    }
}

function handleYesClick(e){
    deleteThisMemo(e);
    alertDelete.classList.remove(M_SHOWING);
}

function handleAlertOff(){
    alertUpload.classList.remove(M_SHOWING);
}

function handleDeleteMemo(){
    if(contentsLetter.classList.contains(M_SHOWING)){
        alertDelete.classList.add(M_SHOWING);
        deleteYes.addEventListener("click", handleYesClick);
        deleteNo.addEventListener("click", handleNoClick);
    }
    else{
       contentsLetter.classList.add(M_SHOWING);
       contentsWrite.classList.remove(M_SHOWING);
       uploadMemo.classList.remove(M_SHOWING);
       newMemo.classList.add(M_SHOWING);
    }
}

function handleUploadClick(){
    const contents = contentsWrite.value
    if(contents === ""){
        alertUpload.classList.add(M_SHOWING);
        alertOff.addEventListener("click",handleAlertOff);
    }else{
        memoList.unshift(contents);
        uploadMemo.classList.remove(M_SHOWING);
        newMemo.classList.add(M_SHOWING);
        paintMemoList(contents);
        saveMemo();
    }
}

function handleNewClick(){
    contentsWrite.classList.add(M_SHOWING);
    contentsLetter.classList.remove(M_SHOWING);
    uploadMemo.classList.add(M_SHOWING);
    newMemo.classList.remove(M_SHOWING);
}

function paintMemo(memo){
    if(memo === undefined){

    }else{
    contentsLetter.innerText = memo;
    }
}

function paintMemoList(memo){
    paintMemo(memo);
    contentsWrite.classList.remove(M_SHOWING);
    contentsLetter.classList.add(M_SHOWING);
}

function loadMemo(){
    memoList = JSON.parse(localStorage.getItem(MEMO))||[];
}

function restoreMemo(){
    const memo = memoList[0];
    paintMemoList(memo);
}

function saveMemo(){
    localStorage.setItem(MEMO, JSON.stringify(memoList));
}

function init(){
    loadMemo();
    restoreMemo();
    newMemo.classList.add(M_SHOWING);
    newMemo.addEventListener("click",handleNewClick);
    uploadMemo.addEventListener("click",handleUploadClick);
    deleteMemo.addEventListener("click", handleDeleteMemo);
    nextFront.addEventListener("click", handleNextFront);
    nextBack.addEventListener("click",handleNextBack);
}

init();