document.addEventListener('DOMContentLoaded', () => {
let barrel = function () {
    let user = 0;
    let lives = 3;
    let score = 0;
    let level = 1;
    let mainSpeed = 3000;
    let defaultSpeed = 2500;
    let hitSpeed = 2200;

    // GENERATES RANDOM NUMBER EVERY NTH SECOND
    const generator = setInterval(function () {
        // SETS DEFAULT HOLES AFTER RESTART AND DEFAULT SELECTOR COLLOR
        for (i = 1; i < 10; i++) {
            document.getElementById(i).setAttribute("src", "img/default.gif");
            document.getElementById(i).style.border = "3px solid blue";
        };

        //BUTTONS
        const but1 = document.getElementById("1").addEventListener("click", (function () { user = 1; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but2 = document.getElementById("2").addEventListener("click", (function () { user = 2; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but3 = document.getElementById("3").addEventListener("click", (function () { user = 3; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but4 = document.getElementById("4").addEventListener("click", (function () { user = 4; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but5 = document.getElementById("5").addEventListener("click", (function () { user = 5; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but6 = document.getElementById("6").addEventListener("click", (function () { user = 6; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but7 = document.getElementById("7").addEventListener("click", (function () { user = 7; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but8 = document.getElementById("8").addEventListener("click", (function () { user = 8; document.getElementById(user).style.border = "3px solid yellow"; }));
        const but9 = document.getElementById("9").addEventListener("click", (function () { user = 9; document.getElementById(user).style.border = "3px solid yellow"; }));


        //LIVESE SCORE LEVEL
        let points = document.getElementById("score");
        let stage = document.getElementById("level");
        points.textContent = "SCORE: " + score;
        stage.textContent = `LEVEL: ${level}/3`;
        points.style.background = "white";
        stage.style.background = "white";
        points.style.color = "red";
        stage.style.color = "red";

        let heart = document.getElementById("hearts");
        if (lives === lives) {
            heart.setAttribute("src", `img/${lives}.jpg`)
        };

        const num = (Math.floor((Math.random() * 9) + 1));
        let holes = document.getElementById(num);
        holes.setAttribute("src", "img/slow.gif");


        //GAME OVER

        if (lives === 0) {
            
            setTimeout(function () {
                for (i = 1; i < 10; i++) {
                    document.getElementById(i).setAttribute("src", `img/L${i}.jpg`);
                };
               
            }, 500);

            finito();
        };

        function finito() {
            (function () { button.disabled = false; }())
            holes.setAttribute("src", "img/default.gif");
            lives = 3;
            score = 0;
            level = 1;
            mainSpeed = 3000;
            defaultSpeed = 2500;
            hitSpeed = 2200;
            button.setAttribute("src", "img/restart.png");
            clearInterval(generator);
            clearInterval(hit);  };


        // YOU HAVE WON
        if (score === 30) {
            clearInterval(generator);
            setTimeout(function () {
                for (i = 1; i < 10; i++) {
                    document.getElementById(i).setAttribute("src", `img/W${i}.jpg`);
                };
            }, 2600);
        };



        // LEVEL UP
        if (score >= 10 && score < 20) {
            level = 2;
            mainSpeed = 1800;
            defaultSpeed = 1300;
            hitSpeed = 1000;
            holes.setAttribute("src", "img/medium.gif");
        }
        else if (score >= 20) {
            level = 3;
            mainSpeed = 1375;
            defaultSpeed = 875;
            hitSpeed = 575;
            holes.setAttribute("src", "img/fast.gif");
        };

        //CHECK MATCHES


        let hit = setTimeout(function () {
            if (num === user) {
                score += 1;
                holes.setAttribute("src", "img/hit.gif");
            }
            else {
                lives -= 1;
                holes.setAttribute("src", "img/miss.gif");
            };
        }, hitSpeed);

        //RESETS VALUE AFTER EACH CLICK
        setTimeout(function () {

            user = 0;
            holes.setAttribute("src", "img/default.gif")
        }, defaultSpeed)


    }, mainSpeed);


};



let button = document.getElementById("hearts");
button.addEventListener("click", barrel);
button.addEventListener("click", (function () { button.disabled = true; }));
});
