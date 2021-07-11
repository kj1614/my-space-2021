const quote = document.querySelector(".quote_div");

const qouteLi = [
    "love what you have.",
    "It ain't over till it's over.",
    "Life is not fair, get used to it.",
    "Do not be afraid to give up the good to go for the great.",
    "Tough times never last, but tough people do."
]

const QUOTE_NUMBER = qouteLi.length;

function genRandom(){
    const number = Math.floor(Math.random()*QUOTE_NUMBER);
    return number;
}

function paintQuote(qtNumber){
    const span = document.createElement("span");
    span.innerText = qouteLi[qtNumber];
    quote.append(span);
}

function init(){
    const randomNumber = genRandom();
    paintQuote(randomNumber);
}

init();