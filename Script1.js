document.addEventListener('DOMContentLoaded', () => {
    const theGame = () => {
        STARTBUTTON.removeEventListener("click", theGame)
        const properties = {
            userInput: 0,
            computerInput: 1,
            lives: 3,
            score: 0,
            level: 1,
            showBunnySpeed: 3000,
            hideBunnySpeed: 2200,
            clearIntervalStamp: null
        }

        const displayState = () => {
            const scoreDisplay = document.getElementById("score");
            const levelDisplay = document.getElementById("level");
            const livesDisplay = document.getElementById("hearts");

            scoreDisplay.textContent = "SCORE: " + properties.score;
            levelDisplay.textContent = `LEVEL: ${properties.level}/3`;
            scoreDisplay.style.background = "white";
            levelDisplay.style.background = "white";
            scoreDisplay.style.color = "red";
            levelDisplay.style.color = "red";
            livesDisplay.setAttribute("src", `img/${properties.lives}.jpg`)
        };
        displayState()

        const resetGrid = () => {
            properties.userInput = 0;
            for (let i = 1; i < 10; i++) {
                document.getElementById(i).setAttribute("src", "img/default.gif");
                document.getElementById(i).style.border = "3px solid blue";
            };
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
            document.getElementById(properties.computerInput).setAttribute("src", `img/speed${properties.level}.gif`);
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
            }, properties.hideBunnySpeed);
        };

        const gameOver = () => {
            if (properties.lives === 0) {
                STARTBUTTON.addEventListener("click",  theGame);
                for (let i = 1; i < 10; i++) {
                    document.getElementById(i).setAttribute("src", `img/L${i}.jpg`);
                };
                properties.lives = 3;
                properties.score = 0;
                properties.level = 1;
                properties.showBunnySpeed = 3000;
                properties.hideBunnySpeed = 2200;
                STARTBUTTON.setAttribute("src", "img/restart.png");
                clearInterval(generator);
                clearInterval(properties.clearIntervalStamp);
            }
        };

        const levelUp = () => {
            if (properties.score > 9) {
                properties.level = 2;
                properties.showBunnySpeed = 1800;
                properties.hideBunnySpeed = 1000;
                return
            }
            if (properties.score > 19) {
                properties.level = 3;
                properties.showBunnySpeed = 1375;
                properties.hideBunnySpeed = 575;
            };
        };

        const won = () => {
            if (properties.score === 30) {
                clearInterval(generator);
                for (let i = 1; i < 10; i++) {
                    document.getElementById(i).setAttribute("src", `img/W${i}.jpg`);
                };
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
        }, properties.showBunnySpeed);


    };



    const STARTBUTTON = document.getElementById("hearts");
    STARTBUTTON.addEventListener("click",  theGame);
});
