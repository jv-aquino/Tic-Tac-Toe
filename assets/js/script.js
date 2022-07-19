let player1, player2;

const Settings = (() => {
  const xButton = document.querySelector('#X');
  const oButton = document.querySelector('#O');

  const checkStartButtonUI = () => {
    if (p1Name.value != '' && p2Name.value != '') {
      start.classList.add('abled')
    }
    else {
      start.classList.remove('abled')
    }
  };

  const startGame = () => {
    if (p1Name.value != '' && p2Name.value != '') {
      Game.setActiveGame(true);

      p1Symbol = (xButton.className == 'abled') ? 'X' : 'O';
      p2Symbol = (xButton.className == 'disabled') ? 'X' : 'O';

      let p1FirstMove = (xButton.className == 'abled') ? true : false;

      player1 = Player(p1Symbol, p1FirstMove, p1Name.value);
      player2 = Player(p2Symbol, !p1FirstMove, p2Name.value);
    }
  }
  const toggleSymbol = (e) => {
    xButton.classList.toggle('abled');
    xButton.classList.toggle('disabled');

    oButton.classList.toggle('abled');
    oButton.classList.toggle('disabled');
  };

  const p1Name = document.querySelector('#p1');
  const p2Name = document.querySelector('#p2');
  p1Name.addEventListener('keyup', checkStartButtonUI);
  p2Name.addEventListener('keyup', checkStartButtonUI);

  const symbolsButtons = Array.from(document.querySelectorAll('.symbols button'));
  const start = document.querySelector('#start');

  start.addEventListener('click',startGame);

  symbolsButtons.forEach(button => {
    button.addEventListener('click', toggleSymbol);
  });

  return {};
})();

const Game = (() => {
  let winner = null;
  let activeGame = false;

  const printWinner = (winner) => {
    setActiveGame(false);
    const winnerDiv = document.querySelector('.winner');

    if (winner == 'Tie') {
      winnerDiv.textContent = 'Tie!';
    }
    else {
      winnerDiv.textContent = 'Player ' + winner + ' won!';
    }

    winnerDiv.style.marginBottom = '30px';
  };

  const checkGameOver = () => {
    // The winner is altered only if there's a winner
    if (!(Gameboard.checkColumns() == null)) {
      winner = Gameboard.checkColumns();
      
      let winnerName = (player1.getSymbol() == winner) ? player1.getName() : player2.getName();

      printWinner(winnerName);
    }
    else if (!(Gameboard.checkRows() == null)) {
      winner = Gameboard.checkRows();
      
      let winnerName = (player1.getSymbol() == winner) ? player1.getName() : player2.getName();

      printWinner(winnerName);
    }
    else if (!(Gameboard.checkDiagonals() == null)) {
      winner = Gameboard.checkDiagonals();
      
      let winnerName = (player1.getSymbol() == winner) ? player1.getName() : player2.getName();

      printWinner(winnerName);
    }
    else if (!(Gameboard.checkTie() == null)) {
      printWinner('Tie');
    }
  };

  const getActivePlayer = () => {
    return player1.getLastClick() ? player1 : player2;
  };
  const toggleActivePlayer = () => {
    player1.toggleLastClick();
    player2.toggleLastClick();
  };

  const markSquare = (e) => {
    let squareId = e.target.id;

    let content = Gameboard.getSquareContent(squareId);

    if (content == '' && activeGame) {
      let player = getActivePlayer();
      let symbol = player.getSymbol();

      Gameboard.setSquareContent(squareId, symbol);
    
      toggleActivePlayer();
    }

    checkGameOver();
  };

  const setActiveGame = (value) => {
    activeGame = value;
  };

  return {markSquare, setActiveGame};
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

  const checkTie = () => {
    const result = gameboardArray.every(element => {
      if (element.textContent != '') {
        return true;
      }
    });
    return result ? result : null;
  };

  return {getSquareContent, setSquareContent, getGameboard, checkColumns, checkDiagonals, checkRows, checkTie};
})();

const Player = (symbol, lastClick, name) => {
  const getSymbol = () => symbol;
  const getLastClick = () => lastClick;
  const getName = () => name;

  const toggleLastClick = () => {
    lastClick = lastClick ? false : true;
  }

  return {getSymbol, getLastClick, toggleLastClick, getName};
};