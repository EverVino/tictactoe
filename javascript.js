const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    
    const reiniciarBoard = () => {

        for (let i=0;i< board.length;i++){
            board[i] = "";
        }
    }

    return {board, reiniciarBoard};
})();

console.log(gameBoard.board)

const player = (symbol) => {
    const moves = [];
    const sim = symbol;
    return {moves, sim};
}

const gamePlay = (() => {
    const player1 = player("X");
    const player2 = player("O");
    const mensaje = document.querySelector(".mensaje h1")
    mensaje.textContent = "Turno del jugador X"
    let counter = true;
    let winner = false;

    let posWinners = [
        ["0","1","2"],
        ["3","4","5"],
        ["6","7","8"],
        ["0","3","6"],
        ["1","4","7"],
        ["2","5","8"],
        ["0","4","8"],
        ["2","4","6"]
    ]

    const verifyWinner = () => {

        for(let i=0; i<posWinners.length; i++) {
            console.log(posWinners[i])
            
            if(posWinners[i].every(val => player1.moves.includes(val))) {
                winner = true 
                return player1.sim
            }
            if(posWinners[i].every(val => player2.moves.includes(val))){
                winner = true 
                return player2.sim
            }
        }
        
        if(player1.moves.length + player2.moves.length == 9) {
            return "EMPATE"
        }

        return false 
    }

    const playGame = (e) => {
        
        if (e.target.textContent != "") {
            console.log("No puede realizar su mov aquí")
            return 
        }

        if (winner) {
            console.log(`Juego terminado`)
            if (!counter) {
                alert("Ganador X")
            }
            else {
                alert("Ganador O")
            }
            return 
        }

        move = e.target.dataset.pos;
       
        if (counter){
            player1.moves.push(move);
            e.target.textContent = player1.sim
            gameBoard.board[move] = player1.sim
            mensaje.textContent = "Turno del jugador O"
        }
        else {
            player2.moves.push(move)
            e.target.textContent = player2.sim
            gameBoard.board[move] = player2.sim
            mensaje.textContent = "Turno del jugador X"
            
        }
        counter = !counter;
        console.log(gameBoard.board)
        
        win = verifyWinner()
        console.log(win)

        if (win != false) {
            if(win == "EMPATE"){
                alert("Juego empatado")
            }
            else {
                alert(`Ganador ${win}`)
            }
        }

    }

    const reinitGamePlay = () => {
        counter = true;
        player1.moves.length = 0;
        player2.moves.length = 0;
        winner = false;
    }

    return {playGame, reinitGamePlay}
})();

const cargarTablero = (gameBoard) => {
    container = document.querySelector(".container")

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    for(let i = 0; i < gameBoard.board.length; i ++){

        boton = document.createElement("button");
        boton.setAttribute("class", "button");
        boton.textContent = gameBoard.board[i];
        boton.dataset.pos = i;
        boton.addEventListener("click", (e) => {
            //console.log(e.target.dataset.pos);
            gamePlay.playGame(e);
        })
        container.appendChild(boton);
    }
}

reinit = document.querySelector(".reiniciar")
reinit.addEventListener("click", () => {
    gameBoard.reiniciarBoard();
    cargarTablero(gameBoard);
    gamePlay.reinitGamePlay();
})

cargarTablero(gameBoard)


