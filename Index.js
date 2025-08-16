 const words = ['apple', 'banana', 'cherry', 'grape', 'orange', 'strawberry', 'melon', 'pineapple', 'kiwi', 'mango'];
//عشان كلمات ثابته
      
        const wordDisplay = document.getElementById('word-display');
        const keyboard = document.getElementById('keyboard');
        const gameStatus = document.getElementById('game-status');
        const playAgainBtn = document.getElementById('play-again');
        const canvas = document.getElementById('hangman-canvas');
        const ctx = canvas.getContext('2d');

       
        let selectedWord = '';
        let guessedLetters = new Set();
        let incorrectGuesses = 0;
        const maxIncorrectGuesses = 6;
        let gameActive = true;

       
        function initializeGame() {
          
            selectedWord = words[Math.floor(Math.random() * words.length)];
          
            guessedLetters = new Set();
            incorrectGuesses = 0;
            gameActive = true;
            gameStatus.textContent = 'Guess a letter!';
            playAgainBtn.style.display = 'none';
            wordDisplay.innerHTML = '';
            keyboard.innerHTML = '';
            clearCanvas();
            drawGallows();
            for (let i = 0; i < selectedWord.length; i++) {
                const letterEl = document.createElement('div');
                letterEl.className = 'letter';
                letterEl.textContent = '';
                wordDisplay.appendChild(letterEl);
            }
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const key = document.createElement('button');
                key.className = 'key';
                key.textContent = letter;
                key.addEventListener('click', () => handleGuess(letter.toLowerCase(), key));
                keyboard.appendChild(key);
            }
        }

        function handleGuess(letter, keyElement) {
            if (!gameActive || guessedLetters.has(letter)) {
                return;
            }

            guessedLetters.add(letter);
            keyElement.disabled = true;

            if (selectedWord.includes(letter)) {
                    keyElement.classList.add('correct');
                updateWordDisplay();
                checkWinCondition();
            } else {
             
                keyElement.classList.add('incorrect');
                incorrectGuesses++;
                drawHangman();
                updateGameStatus();
                checkLossCondition();
            }
        }

      
        function updateWordDisplay() {
            const letters = wordDisplay.querySelectorAll('.letter');
            let wordComplete = true;

            for (let i = 0; i < selectedWord.length; i++) {
                const char = selectedWord[i];
                if (guessedLetters.has(char)) {
                    letters[i].textContent = char;
                } else {
                    letters[i].textContent = '';
                    wordComplete = false;
                }
            }
        }

        function updateGameStatus() {
            const remainingGuesses = maxIncorrectGuesses - incorrectGuesses;
            if (gameActive) {
                 gameStatus.textContent = `You have ${remainingGuesses} incorrect guesses remaining.`;
            }
        }

        function checkWinCondition() {
            const word = wordDisplay.querySelectorAll('.letter');
            let isWin = true;
            word.forEach(letter => {
                if (letter.textContent === '') {
                    isWin = false;
                }
            });

            if (isWin) {
                gameStatus.textContent = `Congratulations! You guessed the word!`;
                endGame(true);
            }
        }

      
        function checkLossCondition() {
            if (incorrectGuesses >= maxIncorrectGuesses) {
                gameStatus.textContent = `Game Over! The word was "${selectedWord.toUpperCase()}".`;
                endGame(false);
            }
        }

       
        function endGame(isWin) {
            gameActive = false;
        
            const keys = keyboard.querySelectorAll('.key');
            keys.forEach(key => key.disabled = true);
            
            playAgainBtn.style.display = 'block';
        }

   
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#1f2937';
        }

       
        function drawGallows() {
            ctx.beginPath();
            ctx.moveTo(10, 290);
            ctx.lineTo(290, 290);
            ctx.moveTo(40, 290);
            ctx.lineTo(40, 10);
            ctx.lineTo(150, 10);
            ctx.lineTo(150, 50);
            ctx.stroke();
        }

    
        function drawHead() {
            ctx.beginPath();
            ctx.arc(150, 80, 30, 0, Math.PI * 2);
            ctx.stroke();
        }

        function drawBody() {
            ctx.beginPath();
            ctx.moveTo(150, 110);
            ctx.lineTo(150, 200);
            ctx.stroke();
        }

     
        function drawLeftArm() {
            ctx.beginPath();
            ctx.moveTo(150, 130);
            ctx.lineTo(100, 170);
            ctx.stroke();
        }
        function drawRightArm() {
            ctx.beginPath();
            ctx.moveTo(150, 130);
            ctx.lineTo(200, 170);
            ctx.stroke();
        }

      
        function drawLeftLeg() {
            ctx.beginPath();
            ctx.moveTo(150, 200);
            ctx.lineTo(100, 250);
            ctx.stroke();
        }

   
        function drawRightLeg() {
            ctx.beginPath();
            ctx.moveTo(150, 200);
            ctx.lineTo(200, 250);
            ctx.stroke();
        }
        const drawSteps = [
            drawGallows,
            drawHead,
            drawBody,
            drawLeftArm,
            drawRightArm,
            drawLeftLeg,
            drawRightLeg
        ];
        function drawHangman() {
            if (incorrectGuesses > 0 && incorrectGuesses < drawSteps.length) {
             
                drawSteps[incorrectGuesses]();
            }
        }


        playAgainBtn.addEventListener('click', initializeGame);

     
        window.onload = initializeGame;