'use-strict'

const main = () => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;

    };

    const buildSplashScreen = () => {
        buildDom(`
        <section class="splash-screen">
        <div style="text-align:center; margin: 50px 0px;">
        <img id ="logo"
          src="img/dare title.png"
          alt="dare image"
          class="game-logo"/>
          </div>
          <div style="text-align:center; margin: 50px 0px;">
          <button id="start-game-button">START GAME</button>
        </div>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);

    };

    const buildGameScreen = () => {
        buildDom(`
            <section class="game-screen">
                <canvas></canvas>
            </section>
            
        `);

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const game = new Game(canvasElement);
        game.gameOverCallback(buildGameOver);

        game.startLoop();

        const setPlayerDirection = (event) => {
            if (event.code === 'ArrowUp') {
                game.player.setDirection(-1)
            } else if (event.code === 'ArrowDown') {
                game.player.setDirection(1)
            };
        };

        document.addEventListener('keydown', setPlayerDirection);

    };

    const buildGameOver = () => {
        buildDom(`
            <section class="game-over">
                <h1>Game Over Screen</h1>
                <button>Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    };

    buildSplashScreen();

};

window.addEventListener('load', main);