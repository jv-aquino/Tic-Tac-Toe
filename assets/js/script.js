const Game = (() => {
  let winner = null;
  let activeGame = true;

  const printWinner = (winner) => {
    activeGame = false;
    const winnerDiv = document.querySelector('.winner');

    winnerDiv.textContent = 'Player ' + winner + ' won!';

    winnerDiv.style.marginBottom = '30px';
  };

  const checkGameOver = () => {
    // The winner is altered only if there's a winner
    if (!(Gameboard.checkColumns() == null)) {
      winner = Gameboard.checkColumns();
      printWinner(winner);
    }
    else if (!(Gameboard.checkRows() == null)) {
      winner = Gameboard.checkRows();
      printWinner(winner);
    }
    else if (!(Gameboard.checkDiagonals() == null)) {
      winner = Gameboard.checkDiagonals();
      printWinner(winner);
    }
  };

  const getActivePlayer = () => {
    return playerX.getLastClick() ? playerO : playerX;
  };
  const toggleActivePlayer = () => {
    playerX.toggleLastClick();
    playerO.toggleLastClick();
  };

  const markSquare = (e) => {
    let squareId = e.target.id;

    let player = getActivePlayer();
    let symbol = player.getSymbol();

    let content = Gameboard.getSquareContent(squareId);

    if (content == '' && activeGame) {
      Gameboard.setSquareContent(squareId, symbol);
    
      toggleActivePlayer();
    }

    checkGameOver();
  };

  return {markSquare};
})();

const Gameboard = (() => {
  const gameboardArray = Array.from(document.querySelectorAll('.square'));
  gameboardArray.forEach(square => {
    square.addEventListener('click', Game.markSquare);
  });
  
  const getSquareContent = (squareId) => {
    return gameboardArray[squareId].textContent;
  };

  const setSquareContent = (squareId, symbol) => { 
    gameboardArray[squareId].textContent = symbol;
  };

  const getGameboard = () => gameboardArray;

  const checkColumns = () => {
    let columns = [];
    let winner = null;

    for(let i = 0; i <= 2; i++) {
      columns[i] = [gameboardArray[i], gameboardArray[i + 3], gameboardArray[i + 6]]
    }

    columns.forEach(column => {
      const result = column.every(element => {
        if (element.textContent == column[0].textContent && element.textContent != '') {
          return true;
        }
      });
      winner = result ? column[0].textContent : winner;
    });
    return winner;
  }

  const checkRows = () => {
    let rows = [];
    let winner = null;

    for(let i = 0; i <= 6; i = i + 3) {
      rows[i] = [gameboardArray[i], gameboardArray[i + 1], gameboardArray[i + 2]]
    }

    rows.forEach(row => {
      const result = row.every(element => {
        if (element.textContent == row[0].textContent && element.textContent != '') {
          return true;
        }
      });
      winner = result ? row[0].textContent : winner;
    });
    return winner;
  };

  const checkDiagonals = () => {
    let diagonals = [];
    let winner = null;

    let j = 4;

    for(let i = 0; j >= 2; i = i + 2, j = j - 2) {
      diagonals[i] = [gameboardArray[i], gameboardArray[i + j], gameboardArray[i + j*2]];
    }
    console.log(diagonals);

    diagonals.forEach(diagonal => {
      const result = diagonal.every(element => {
        if (element.textContent == diagonal[0].textContent && element.textContent != '') {
          return true;
        }
      });
      winner = result ? diagonal[0].textContent : winner;
    });
    return winner;
  };

  return {getSquareContent, setSquareContent, getGameboard, checkColumns, checkDiagonals, checkRows};
})();

const Player = (symbol, lastClick) => {
  const getSymbol = () => symbol;
  const getLastClick = () => lastClick;

  const toggleLastClick = () => {
    lastClick = lastClick ? false : true;
  }

  return {getSymbol, getLastClick, toggleLastClick};
};

const playerX = Player('X', false);
const playerO = Player('O', true);