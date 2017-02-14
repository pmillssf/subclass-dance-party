var GoodDancer = function(top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.top = top;
  this.left = left;
  this.move = false;
};

GoodDancer.prototype = Object.create(BlinkyDancer.prototype);
GoodDancer.prototype.constructor = GoodDancer;

GoodDancer.prototype.step = function(timeBetweenSteps) {
  this.oldStep = Dancer.prototype.step;
  //console.log(this.oldStep);
  this.oldStep(timeBetweenSteps);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (this.move) {
    this.left = this.left - 10;
  } 
  if (!this.move) {
    this.left = this.left + 10;
  }
  var styleSettings = {
    left: this.left
  };
  this.$node.css(styleSettings);
  this.move = !this.move;
};