function Player(){
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
        addPosition,checkWin
    }
}

const GameModule = (function (){
    const player1 = Player();
    const player2 = Player();

    //Elements
    const container = document.querySelector(".container");
    const CurrentPlayer = document.querySelector(".turn");
    const board = document.querySelector(".playBoard");
    
    let isPlayerOneTurn = true;

    board.addEventListener("click", addPosition)

    function addPosition(e){
        if(e.target.nodeName === "DIV" && e.target.textContent==""){
            const element = e.target;
            const locationNumber = element.id;
            if(isPlayerOneTurn){
                player1.addPosition(locationNumber);
                element.textContent="X";
                CurrentPlayer.textContent="Player 2 turn";
                if(player1.checkWin()){
                    CurrentPlayer.textContent="Player 1 Wins";
                    board.removeEventListener("click",addPosition)
                }
                
                isPlayerOneTurn=false;
            }else{
                player2.addPosition(locationNumber);
                element.textContent="O";
                CurrentPlayer.textContent="Player 1 turn"
                if(player2.checkWin()){
                    CurrentPlayer.textContent="Player 2 Wins";
                    board.removeEventListener("click",addPosition)
                }
                isPlayerOneTurn=true;
            }

        }
    }

})();