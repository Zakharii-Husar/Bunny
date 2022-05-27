document.addEventListener('DOMContentLoaded', () => {
    const theGame = () => {
        const properties = {
            userInput: 0,
            computerInput: 1,
            lives: 3,
            score: 0,
            level: 1,
            gameSpeed: 3000,
            resetSpeed: 2200,
            clearIntervalStamp: null
        }

        const displayState = () => {
            const scoreDisplay = document.getElementById("score");
            const levelDisplay = document.getElementById("level");
            const heart = document.getElementById("hearts");

            scoreDisplay.textContent = "SCORE: " + properties.score;
            levelDisplay.textContent = `LEVEL: ${properties.level}/3`;
            scoreDisplay.style.background = "white";
            levelDisplay.style.background = "white";
            scoreDisplay.style.color = "red";
            levelDisplay.style.color = "red";
            heart.setAttribute("src", `img/${properties.lives}.jpg`)
        }

        const resetGrid = () => {
            for (i = 1; i < 10; i++) {
                document.getElementById(i).setAttribute("src", "img/default.gif");
                document.getElementById(i).style.border = "3px solid blue";
            };
            properties.userInput = 0;
            document.getElementById(properties.computerInput).setAttribute("src", "img/default.gif")
        };

        const listenToUserInput = () => {
            for (let i = 1; i < 10; i++) {
                document.getElementById(i).addEventListener("click", (function () {
                    properties.userInput = i;
                    document.getElementById(properties.userInput).style.border = "3px solid red";
                }));
            }
        };

        const generateComputerInput = () => {
            properties.computerInput = (Math.floor((Math.random() * 9) + 1));
            document.getElementById(properties.computerInput).setAttribute("src", "img/slow.gif");
        };

        const checkMatch = () => {
            properties.clearIntervalStamp = setTimeout(function () {
                if (properties.computerInput === properties.userInput) {
                    properties.score += 1;
                    document.getElementById(properties.computerInput).setAttribute("src", "img/hit.gif");
                }
                else {
                    properties.lives -= 1;
                    document.getElementById(properties.computerInput).setAttribute("src", "img/miss.gif");
                };
            }, properties.resetSpeed);
        };

        const gameOver = () => {
            if (properties.lives === 0) {
                (function () { startBtn.disabled = false; }())
                for (i = 1; i < 10; i++) {
                    document.getElementById(i).setAttribute("src", `img/L${i}.jpg`);
                };
                properties.lives = 3;
                properties.score = 0;
                properties.level = 1;
                properties.gameSpeed = 3000;
                properties.resetSpeed = 2200;
                startBtn.setAttribute("src", "img/restart.png");
                clearInterval(generator);
                clearInterval(properties.clearIntervalStamp);
            }
        };

        const levelUp = () => {
            if (properties.score >= 10 && properties.score < 20) {
                properties.level = 2;
                properties.gameSpeed = 1800;
                properties.resetSpeed = 1000;
                document.getElementById(properties.computerInput).setAttribute("src", "img/medium.gif");
            }
            else if (properties.score >= 20) {
                properties.level = 3;
                properties.gameSpeed = 1375;
                properties.resetSpeed = 575;
                document.getElementById(properties.computerInput).setAttribute("src", "img/fast.gif");
            };
        };

        const won = () => {
            if (properties.score === 30) {
                clearInterval(generator);
                setTimeout(function () {
                    for (i = 1; i < 10; i++) {
                        document.getElementById(i).setAttribute("src", `img/W${i}.jpg`);
                    };
                }, 2600);
            };
        }

        const generator = setInterval(function () {
            displayState();
            resetGrid();
            listenToUserInput();
            generateComputerInput();
            checkMatch();
            levelUp();
            gameOver();
            won();
        }, properties.gameSpeed);


    };



    let startBtn = document.getElementById("hearts");
    startBtn.addEventListener("click", theGame);
    startBtn.addEventListener("click", (function () { startBtn.disabled = true; }));
});
