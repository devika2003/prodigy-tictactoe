console.log("welcome ");
let turnaudio=new Audio("ding.mp3");
let gameover=new Audio("gameover.mp3");
let turn="x";
let isgameover=false;


const changeTurn = ()=>{
    return turn === "x"?"0":"x"
}

const checkWin= ()=>{
    let boxtext=document.getElementsByClassName('boxtext');
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&  boxtext[e[0]].innerText !=='' ){
            document.querySelector('.info').innerText=boxtext[e[0]].innerText + " won ";
            isgameover=true;
            gameover.play();
            animateWinLine(e);
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="150px"
            let boxes = document.getElementsByClassName("box");
            Array.from(boxes).forEach((box) => {
                box.classList.add("disable-hover");
            });

            setTimeout(() => {
                // Re-enable hover effect after animation completes
                Array.from(boxes).forEach((box) => {
                    box.classList.remove("disable-hover");
                });
            }, 2000);
        }
        
    })
}
const animateWinLine = (winningCombo) => {
    let winBoxes = winningCombo.map((index) => document.querySelector(`.box:nth-child(${index + 1})`));
    winBoxes.forEach((box) => box.classList.add("winning-box"));
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener("click",()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText=turn;
            turn=changeTurn();
            turnaudio.play();
            
            checkWin();
            if(!isgameover)
            document.getElementsByClassName("info")[0].innerText ="turn for "+ turn;
        }
    })
})
reset.addEventListener('click',()=>{
    let boxtexts=document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText ="";
    });
    turn='x';
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText ="turn for "+ turn;
     document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px"
     let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((box) => {
        box.classList.remove("winning-box");
    });
     
})