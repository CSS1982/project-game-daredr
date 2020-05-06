class imageG {
  constructor(ctx, source, imageWidth, imageHeight, height, totalNumberOfFrames, numberOfRows, row) {
    this.ctx = ctx;
    this.width = 0;
    this.height = height;
    this.numberOfRows = numberOfRows;
    this.img = null;
    this.totalNumberOfFrames = totalNumberOfFrames;
    this.imageFrameNumber = 0;
    this.widthOfImage = imageWidth;
    this.heightOfImage = imageHeight;
    this.widthOfUnit = 0;
    this.heighOfUnit = 0;
    this.src = source;
    this.x = 0;
    this.y = 0;
    this.row = row;

  }
  inicialize() {
    this.img = new Image();
    this.img.src = this.src;
    this.widthOfUnit = (this.widthOfImage / this.totalNumberOfFrames); // The width of each image in the spirite
    this.heightOfUnit = (this.heightOfImage / this.numberOfRows); // The width of each image in the spirite
    this.width = this.widthOfUnit * this.height / this.heightOfUnit;
  }
  update(x, y) {

    this.x = x;
    this.y = y;
    this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames;
    this.ctx.drawImage(this.img, this.imageFrameNumber * this.widthOfUnit, this.heightOfUnit * this.row, // x and y - where in the sprite
      this.widthOfUnit, this.heightOfUnit, // width and height
      this.x, this.y, // x and y - where on the screen
      this.width, this.height // width and height
    );
    this.imageFrameNumber++;

  }

}