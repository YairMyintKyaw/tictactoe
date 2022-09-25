function Player(name){
    let position = [];
    function addPosition(newPosition){
        position.push(+newPosition);
    }
    function checkWin(){
        if(checkPosition(1,2,3)  ||
            checkPosition(4,5,6) ||
            checkPosition(7,8,9) ||
            checkPosition(1,4,7) ||
            checkPosition(2,5,8) ||
            checkPosition(3,6,9) ||
            checkPosition(1,5,9) ||
            checkPosition(3,5,7)
        ) return true;
    }
    function checkElement(element){
        return position.includes(element);
    }
    function checkPosition(locationOne,locationTwo,locationThree){
        return checkElement(locationOne)&&checkElement(locationTwo)&&checkElement(locationThree)
    }
    return{
        addPosition,checkWin,name
    }
}

const page1 = (function(){
    //container 2
    const container = document.querySelector(".container2");
    const player1NameInput = document.querySelector("#player1");
    const player2NameInput = document.querySelector("#player2");
    const startButton = document.querySelector(".container2 button");
    const form = document.querySelector("form");
    let playerOneName;
    let playerTwoName;
    function showPage(){
        container.style.display="flex";
    }

    function hidePage(){
        container.style.display="none";
    }

    startButton.addEventListener("click", startTheGame);

    function startTheGame(){
        let player1Value = player1NameInput.value;
        let player2Value = player2NameInput.value;

        if(form.checkValidity() && 
            player1Value.trim().length!==0 && 
            player2Value.trim().length!==0 ){
            
            hidePage();
            // document.querySelector(".container2").style.display="flex";
            page2.startGame();
        }
    }

    return{
        showPage,player1NameInput,player2NameInput
    }
})();

const page2 = (function (){
    let player1; 
    let player2;

    function startGame(){
        player1=Player(page1.player1NameInput.value);
        player2=Player(page1.player2NameInput.value);
        container.style.display="flex";
        CurrentPlayer.textContent=player1.name+" turn"
    }

    //Elements
    //container 1
    const container = document.querySelector(".container1");
    const CurrentPlayer = document.querySelector(".turn");
    const board = document.querySelector(".playBoard");
    const button = document.querySelector(".container1 button")
    
    let isPlayerOneTurn = true;

    board.addEventListener("click", addPosition)
    button.addEventListener("click",restartTheGame);

    function addPosition(e){
        if(e.target.nodeName === "DIV" && e.target.textContent==""){
            
            const element = e.target;
            const locationNumber = element.id;
            if(isPlayerOneTurn){
                player1.addPosition(locationNumber);
                element.textContent="X";
                CurrentPlayer.textContent=`${player2.name} turn`;
                if(player1.checkWin()){
                    CurrentPlayer.textContent=`${player1.name} Wins`;
                    board.removeEventListener("click",addPosition)
                }
                
                isPlayerOneTurn=false;
            }else{
                player2.addPosition(locationNumber);
                element.textContent="O";
                CurrentPlayer.textContent=`${player1.name} turn`
                if(player2.checkWin()){
                    CurrentPlayer.textContent=`${player2.name} Wins`;
                    board.removeEventListener("click",addPosition)
                }
                isPlayerOneTurn=true;
            }
            if(isDraw()){
                CurrentPlayer.textContent="It is draw"
                board.removeEventListener("click",addPosition)
            }
        }
    }

    function isDraw(){
        let isDraw=true;
        for(let i=1;i<=9;i++){
            const element = document.querySelector(`.playBoard>div:nth-child(${i})`);
            if(element.textContent===""){
                isDraw=false;
            }
        }
        return isDraw;
    }

    function restartTheGame(){
        endGame();
        page1.showPage();
        for(let i=1;i<=9;i++){
            const element = document.querySelector(`.playBoard>div:nth-child(${i})`);
            element.innerHTML="";
        }
        board.removeEventListener("click",addPosition)
        board.addEventListener("click",addPosition)
    }

    

    function endGame(){
        container.style.display="none";
    }
    return{
        startGame
    }
})();

