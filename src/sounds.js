var sounds = {
    "dead" : {
      src : "./sounds/Death.mp3",
      volume: 1
    },
    "init" : {
      src : "./sounds/Intro.mp3",
      volume: 1
    },
    "main" : {
      src : "./sounds/Chomp.mp3",
      volume: 1,
      loop : true
    },
    "win" : {
      src : "./sounds/Fruit.mp3",
      volume: 1
    }
  };
    
  class Sound {
    constructor(soundName, options){
      this.soundSetup = sounds[soundName];
      this.audio = new Audio(this.soundSetup.src);
      this.name = soundName;
      if(options){
        if (options.loop){
          this.audio.loop = options.loop;
        }
      } else if (this.soundSetup.loop) {
        this.audio.loop = this.soundSetup.loop;
      }
      if (this.audio.loop){
        if (typeof this.audio.loop == 'boolean')
        {
            this.audio.loop = true;
        }
        else
        {
            this.audio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
      }
      this.audio.volume = this.soundSetup.volume;
    }
    play(){
      this.audio.play();
    }
    stop(){
      this.audio.pause();
      this.audio.src = this.audio.src;
    }
  }
  