//--------------------colors.html----------------------
document.addEventListener("DOMContentLoaded", function() {
    const colorDisplay = document.getElementById('hex');
    const difficultyButtons = document.querySelectorAll('.dropdown-item');
    let userTries = 1;

    function generateRandomHexColor() 
    {
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
  
    function setDifficulty(difficulty) 
    {
      const numColors = 
      {
        easy: 3,
        medium: 6,
        hard: 9
      }[difficulty];
  
      generateColors(numColors);
    }
  
    function generateColors(numColors) 
    {
      const colorContainer = document.getElementById('color-container');
      colorContainer.innerHTML = '';
  
      for (let i = 0; i < numColors; i++) 
      {
        const hexColor = generateRandomHexColor();
        const colorBox = createColorBox(hexColor);
        colorContainer.appendChild(colorBox);
      }
  
      const correctColorIndex = Math.floor(Math.random() * numColors);
      const correctHexColor = colorContainer.children[correctColorIndex].dataset.hex;
      colorDisplay.textContent = correctHexColor;
    }
  
    function createColorBox(hexColor) 
    {
      const colorBox = document.createElement('div');
      colorBox.className = 'color-box';
      colorBox.style.backgroundColor = hexColor;
      colorBox.dataset.hex = hexColor;
      colorBox.addEventListener('click', handleColorBoxClick);
      return colorBox;
    }
  
    function handleColorBoxClick(event) 
    {
      const selectedColor = event.target.dataset.hex;
      const correctColor = colorDisplay.textContent;

      if (selectedColor === correctColor) 
      {
        if (userTries === 1)
        {
          document.getElementById('result-text').innerHTML = `Correct! You guessed the right color. It only took you ${userTries} try!\nSelect a Difficulty to start again!`;
        }
        else
        {
          document.getElementById('result-text').innerHTML = `Correct! You guessed the right color. It only took you ${userTries} tries!\nSelect a Difficulty to start again!`;
        }
        const difficulty = document.querySelector('.btn-dark').textContent.toLocaleLowerCase();
        setDifficulty(difficulty);
      } 
      else 
      {
        document.getElementById('result-text').innerHTML = `Wrong! Try again!`;
        ++userTries;
        event.target.remove();
      }
    }
  
    difficultyButtons.forEach(button => 
    {
      button.addEventListener('click', function() 
      {
        const difficulty = this.value;
        userTries = 1;
        document.getElementById('result-text').innerHTML = '';
        setDifficulty(difficulty);
      });
    });
  
    setDifficulty('easy');
  });