const main = () => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;

    };

    const buildSplashScreen = () => {
        buildDom(`
    <section class="splash-screen">
       <div>
        <img id ="logo"
          src="img/Dare!.png"
          alt="dare image"
          class="game-logo w3-animate-fading"
        />
      </div>
      <div class="selection-buttons">
        <div>
            <button class="w3-animate-fading game-button" id="easy">Are you Scared?</button>
        </div>
        <div>
            <button class="w3-animate-fading game-button" id="medium">Bring it On!</button>
        </div>
        <div>
            <button class="w3-animate-fading game-button" id="hard">Hell is Home</button>
        </div>
      </div>
    </section>
        `);

        const startButtonEasy = document.getElementById("easy");
        startButtonEasy.addEventListener('click', buildGameScreen);
        const startButtonMedium = document.getElementById("medium");
        startButtonMedium.addEventListener('click', buildGameScreen);
        const startButtonHard = document.getElementById("hard");
        startButtonHard.addEventListener('click', buildGameScreen);

    };
    const buildGameScreen = (e) => {
        buildDom(`
            <section class="game-screen" >
                <canvas ></canvas>
            </section>
            
        `);
        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;
        const mode = e.target.id;
        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const game = new Game(canvasElement, mode);

        game.gameOverCallback(buildGameOver);
        game.gameFinishedCallback(buildGameFinished);

        game.startLoop();

        const controls = (e) => {
            switch (e.which) {
                case 65: // left arrow-a
                    game.knight.speedX -= 2;
                    game.knight.direction = "left";
                    break;
                case 68: // right arrow -d
                    game.knight.speedX += 2;
                    game.knight.direction = "right";
                    break;
                case 87: // up arrow-w
                    if (game.knight.y === game.height - game.knight.height) {
                        game.knight.jump = true;
                    }
                    break;
                case 75: // kill - k
                    game.knight.speedX = 0;
                    game.knight.attack = true;
                    break;
                case 77: // mute/unmute - m
                    if (game.musicMuted) {
                        game.musicMuted = false;
                        game.musicGame.play();
                    } else {
                        game.musicMuted = true;
                        game.musicGame.stop();
                    }
                    break;
            }

        };

        document.addEventListener('keydown', controls);

        document.onkeyup = function (e) {
            game.knight.attack = false;
        };

    };


    const buildGameOver = () => {
        buildDom(`
            <section class="splash-screen">
            <div>
            <img id ="logo"
              src="img/You died!.png"
              alt="You died image"
              class="game-logo w3-animate-fading"
            />
          </div>
          <div>
            <button class="w3-animate-fading game-button" id="home">TOO DIFFICULT?</button>
          </div>
            </section>
        `);

        const buttonHome = document.getElementById("home");
        buttonHome.addEventListener('click', buildSplashScreen);
    };

    const buildGameFinished = () => {
        buildDom(`
            <section class="splash-screen">
            <div>
            <img id ="logo"
              src="img/You survived!.png"
              alt="You survived! image"
              class="game-logo w3-animate-fading"
            />
          </div>
          <div>
            <button class="w3-animate-fading game-button" id="home">TOO EASY?</button>
          </div>
            </section>
        `);

        const buttonHome = document.getElementById("home");
        buttonHome.addEventListener('click', buildSplashScreen);
    };

    buildSplashScreen();

};

window.addEventListener('load', main);