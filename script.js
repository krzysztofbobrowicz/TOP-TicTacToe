function Gameboard() {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;
  const printBoard = () => board;

  return {
    getBoard,
    printBoard,
  };
}

function GameController(playerOneName = 'X', playerTwoName = 'O') {
  const board = Gameboard();
  const getBoard = board.getBoard;
  const playerTurnDiv = document.querySelector('.turn');

  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let activePlayer = playerOneName;

  const checkIfAvailable = number => {
    if (board.getBoard()[number] != '') {
      playerTurnDiv.textContent =
        'Sorry, that one is not available. Please choose another one.';
    } else {
      playerTurnDiv.textContent = `Placing ${getActivePlayer()} onto the board`;
      dropPlayer(number, getActivePlayer());
      return true;
    }
  };

  const dropPlayer = (number, player) => {
    return (board.getBoard()[number] = player);
  };

  const switchPlayerTurn = () =>
    (activePlayer =
      activePlayer === playerOneName ? playerTwoName : playerOneName);

  const getActivePlayer = () => activePlayer;

  const playRound = number => {
    if (checkIfAvailable(number)) {
      checkWinningCondition();
      return true;
    } else return;
  };

  const checkWinningCondition = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      if (
        getBoard()[winningConditions[i][0]] ==
          getBoard()[winningConditions[i][1]] &&
        getBoard()[winningConditions[i][1]] ==
          getBoard()[winningConditions[i][2]] &&
        getBoard()[winningConditions[i][0]] != ''
      ) {
        playerTurnDiv.textContent = `The winner is ${activePlayer}`;
        gameActive = false;
        return;
      } else if (!getBoard().includes('')) {
        playerTurnDiv.textContent = 'This is draw';
        gameActive = false;
      }
    }
  };

  const returnIfGameActive = () => gameActive;

  return {
    playRound,
    getBoard,
    getActivePlayer,
    switchPlayerTurn,
    returnIfGameActive,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector('.game');

  const updateScreen = () => {
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    boardDiv.textContent = '';

    board.forEach((square, index) => {
      const boxButton = document.createElement('button');
      boxButton.classList.add('square');
      boxButton.dataset.index = index;
      boardDiv.appendChild(boxButton);
      boxButton.textContent = square;

      boxButton.addEventListener('click', e => {
        if (game.returnIfGameActive()) {
          const datasetIndexValue = parseInt(e.target.dataset.index);

          game.playRound(datasetIndexValue);
          boxButton.textContent = activePlayer;
          game.switchPlayerTurn();
          updateScreen();
        }
      });
    });
  };
  updateScreen();
}

ScreenController();
