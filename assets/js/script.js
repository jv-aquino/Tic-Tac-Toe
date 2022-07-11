const Gameboard = (() => {
  const gameboardArray = [];
  const squares = document.querySelectorAll('.square');

  squares.forEach(square => {
    gameboardArray.push(square);
  });
})();

const Player = (symbol) => {

};