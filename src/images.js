class imageG {
    constructor(ctx,source, imageWidth, imageHeight,height, totalNumberOfFrames) {
        this.ctx = ctx;
        this.width = 0;
        this.height = height;
        this.img = null;
        this.totalNumberOfFrames = totalNumberOfFrames;
        this.imageFrameNumber = 0;
        this.widthOfImage = imageWidth;
        this.heightOfImage =  imageHeight;
        this.widthOfUnit = 0;
        this.src = source;
        this.x=0;
        this.y=0;
    }
    inicialize() {
    this.img = new Image();
    this.img.src = this.src;
    this.widthOfUnit= (this.widthOfImage / this.totalNumberOfFrames); // The width of each image in the spirite
    this.width = this.widthOfUnit * this.height / this.heightOfImage;
    }
    update(x,y) {
        this.imageFrameNumber++;
        this.x = x;
        console.log(`the value of x drawn is ${this.x}`);
        /*if(this.x <= -0.25*this.width){
            this.x = -0.25*this.width;
        }*/
        this.y = y;
        this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames;
        this.ctx.drawImage(this.img, this.imageFrameNumber * this.widthOfUnit, 0, // x and y - where in the sprite
        this.widthOfUnit, this.heightOfImage, // width and height
        this.x, this.y, // x and y - where on the screen
        this.width, this.height // width and height
      );}


}