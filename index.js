// fetch all the html elements
const boxes = document.querySelectorAll(".box");
const gameInformation = document.querySelector(".game-info");
const newgameBtn = document.querySelector(".btn");

// initialization
let currentPlayer;
// game grid means game rows and columns
let gameGrid;
// these are all winning positions of tic-tac-toe game
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    //Game grid pe karna padega boxes ko
    gameGrid = ["","","","","","","","",""];
    // for showing in UI. UI pr empty bhi karna padega boxes ko ***
    boxes.forEach((box,index) => {
        box.innerText = "";
        // at first pointer events all because, the user can click any of the
        // boxes and all the boxes will show cursor pointer
        boxes[index].style.pointerEvents = "all";
        // hum sab ii boxes ko pehle se pointer events null kar diya tha. So humko pehle
        // jaisa karna padega. At first, empty boxes will show cursor pointer
        // This line is also for removing green background color.
        box.classList = `box BOX${index+1}`;
    })
    newgameBtn.classList.remove("active");
    gameInformation.innerText = `Current player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if (currentPlayer==="X") {
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    // isko hum UI pa show bhi karenge
    gameInformation.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((positions) => {
        //check all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[positions[0]] !== "" && gameGrid[positions[1]] !== "" && 
            gameGrid[positions[2]] !== "") && (gameGrid[positions[0]] === gameGrid[positions[1]]) && 
            (gameGrid[positions[1]] === gameGrid[positions[2]]) )
        {
            //check if winner is X or 0
            if (gameGrid[positions[0]] === "X") {
                answer = "X";
            }
            else{
                answer = "0";
            }

            //disable pointer events because -> if anyone X or 0 is win the
            // match, then remaining box ko hum click nehi karne denge, that means 
            // the game is not continued.
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X or O who is a winner. So we reflect with green
            // background color in the UI
            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");
        }
    })

    //it means we have a winner
    if (answer !== "") {
        gameInformation.innerText = `Winner Player - ${answer}`;
        newgameBtn.classList.add("active");
        return;
    }
    
    //If there is no Winner Found, let's check whether there is tie
    let boxFillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            boxFillCount++;
        }
    });

    //board is filled, game is TIE. 
    // 9 because there is 9 boxes in the game
    if (boxFillCount === 9) {
        gameInformation.innerText = "Game Tied !";
        newgameBtn.classList.add("active");
    }
}

function handleClick(index){
    if (gameGrid[index] === "") {
        // it means the boxes value are reflected in ui
        boxes[index].innerText = currentPlayer;
        // it means the gameGrid value in our code is changed  ***
        gameGrid[index] = currentPlayer;
        // Agar ek box mai click ho gaye aur 0/X aa gaya, the usi box keliye
        // mai pointer events none kar diya.
        boxes[index].style.pointerEvents = "none";
        // turn ko swap karo that means -> X ka bari khatam ho chuka toh 0 and vice-versa
        swapTurn();
        // check karo koi jeet toh nehi gaya
        checkGameOver();
    }
}
// jab bhi box mai click karta toh kuch ho nehi raha. Agar hona chatah hu
// toh mujhe eventListner lagana padega
boxes.forEach((box, index) => {
    // index refers to mai konsi box mai click kia
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

// when we click the new game button, then the
newgameBtn.addEventListener("click",initGame);
