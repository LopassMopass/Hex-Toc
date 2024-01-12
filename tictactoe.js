//--------------------tictactoe.html--------------------\\
document.addEventListener('DOMContentLoaded', () => 
{
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');
  const resetElement = document.getElementById('reset');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const playerX = 'playerXW';
  const playerO = 'playerOW';
  const tie = 'tie';

  const winningConditions = 
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleResultValidation = () => 
  {
    const roundWon = winningConditions.some(winCondition => 
    {
      const [x, y, z] = winCondition;
      return board[x] && board[x] === board[y] && board[x] === board[z];
    });

    if (roundWon) 
    {
      announce(currentPlayer === 'X' ? playerX : playerO);
      isGameActive = false;
      return;
    }

    if (!board.includes('')) 
    {
      announce(tie);
    }
  };

  const announce = (type) => 
  {
    switch (type) 
    {
      case playerO:
        announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
        break;
      case playerX:
        announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
        break;
      case tie:
        announcer.innerText = 'Tie';
    }
    resetElement.removeAttribute('hidden');
    announcer.classList.remove('hide');
  };

  const isValidAction = (tile) => tile.innerText === '';

  const updateBoard = (index) => 
  {
    board[index] = currentPlayer;
  };

  const changePlayer = () => 
  {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => 
  {
    if (isValidAction(tile) && isGameActive) 
    {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => 
  {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    resetElement.setAttribute('hidden', 'hidden');
    announcer.classList.add('hide');

    if (currentPlayer === 'O') 
    {
      changePlayer();
    }

    tiles.forEach(tile => 
    {
      tile.innerText = '';
      tile.classList.remove('playerX', 'playerO');
    });
  };

  tiles.forEach((tile, index) => 
  {
    tile.addEventListener('click', () => userAction(tile, index));
  });

  resetButton.addEventListener('click', resetBoard);
});