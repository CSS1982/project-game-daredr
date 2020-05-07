var sounds = {
    /* "dead" : {
       src : "./sounds/Death.mp3",
       volume: 1
     },
     "init" : {
       src : "./sounds/Intro.mp3",
       volume: 1
     },*/
    "music": {
        src: "snd/alexander-nakarada-wrath.mp3",
        volume: 1,
        loop: true
    }
    /*,
        "win" : {
          src : "./sounds/Fruit.mp3",
          volume: 1
        }*/
};

class Sound {
    constructor(soundName, options) {
        this.soundSource = sounds[soundName];
        this.audio = new Audio(this.soundSource.src);
        this.name = soundName;
        if (options) {
            if (options.loop) {
                this.audio.loop = options.loop;
            }
        } else if (this.soundSource.loop) {
            this.audio.loop = this.soundSource.loop;
        }
        if (this.audio.loop) {
            if (typeof this.audio.loop === "boolean") {
                this.audio.loop = true;
            } else {
                this.audio.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
        }
        this.audio.volume = this.soundSource.volume;
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
        this.audio.src = this.audio.src;
    }
}