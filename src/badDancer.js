var BadDancer = function(top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.top = top;
  this.left = left;
  this.move = 0;
  this.counter = 0;
  this.topOriginal = top;
  this.leftOriginal = left;
};

BadDancer.prototype = Object.create(BlinkyDancer.prototype);
BadDancer.prototype.constructor = BadDancer;

BadDancer.prototype.step = function(timeBetweenSteps) {
  this.oldStep = Dancer.prototype.step;
  //console.log(this.oldStep);
  this.oldStep(timeBetweenSteps);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.

  if (this.move % 2 === 0) {
    this.left = this.left - 10;
  } 
  if (this.move % 2 !== 0) {
    this.left = this.left + 10;
  } 
  if (this.move % 2 !== 0 && this.move % 3 === 0) {
    this.left = this.left + 10;
    this.top = this.top - 10;
  } 
  this.counter = this.counter + 10;
  if (this.counter > 40) {
    this.counter = 0; 
    this.left = this.leftOriginal;
    this.top = this.topOriginal;
  }
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
  this.move = Math.floor(Math.random() * 10);
};