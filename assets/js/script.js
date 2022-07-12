const Game = (() => {
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

    if (content == '') {
      Gameboard.setSquareContent(squareId, symbol);
    
      toggleActivePlayer();
    }
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

  return {getSquareContent, setSquareContent};
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