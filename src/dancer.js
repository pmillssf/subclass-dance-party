// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.step(timeBetweenSteps);
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
};

Dancer.prototype.step = function(timeBetweenSteps) {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(this.step.bind(this, timeBetweenSteps), timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function() {
  var dancersTotal = window.dancers.length;
  var spacing = 1000 / dancersTotal;
  var counter = 0;
  for (var i = 0; i < dancersTotal; i++) {
    var left = 100 + counter;
/*    if (window.dancers.topOriginal !== undefined) {
      window.dancers[i].topOriginal = 80;
      window.dancers[i].leftOriginal = left;
      window.dancers[i].setPosition(window.dancers[i].topOriginal, window.dancers[i].leftOriginal);
    } else*/ if (window.dancers[i].left === undefined) {
      var top = 80;
      window.dancers[i].setPosition(top, left);
    } else {
      window.dancers[i].top = 80;
      window.dancers[i].left = left;
      window.dancers[i].setPosition(window.dancers[i].top, window.dancers[i].left);
    }
    counter = counter + spacing;  
  }

};

// Split up lineUp into multiple lines if too many dancers on teh dancefloor