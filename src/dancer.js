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
  this.match();
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
  var spacing = 1500 / dancersTotal;
  var counter = 0;
  for (var i = 0; i < dancersTotal; i++) {
    var left = 100 + counter;
    window.dancers[i].$node.removeClass('changeYellow changePurple changeGreen changeRed changeBlue');
    window.dancers[i].$node.addClass('hideColor');
    //console.log(window.dancers[i].topOriginal !== undefined);
    if (window.dancers[i].topOriginal !== undefined) {
      window.dancers[i].topOriginal = 80;
      window.dancers[i].leftOriginal = left;
      window.dancers[i].top = 80;
      window.dancers[i].left = left;
      window.dancers[i].setPosition(window.dancers[i].topOriginal, window.dancers[i].leftOriginal);
    } else if (window.dancers[i].left === undefined) {
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

Dancer.prototype.match = function() {
  var dancersCopy = window.dancers.slice(0, window.dancers.length);
  while (dancersCopy.length !== 0) {
    for (var i = 1; i < dancersCopy.length; i++) {
      var a = dancersCopy[0].top - dancersCopy[i].top;
      var b = dancersCopy[0].left - dancersCopy[i].left; 
      var c = Math.sqrt((a * a) + (b * b));
      if (c < 200) {
        var num = Math.floor(Math.random() * 5);
        dancersCopy[0].groupMove(num);
        dancersCopy[i].groupMove(num);
        dancersCopy.splice(i, 1);
        break;
      }
    }
    dancersCopy.splice(0, 1);
  }
};

Dancer.prototype.groupMove = function(num) {
  // var styleSettings = {
  //   'color': 'blue'
  // };
  var colors = ['changeBlue', 'changeRed', 'changeGreen', 'changePurple', 'changeYellow'];
  this.$node.removeClass('changeYellow changePurple changeGreen changeRed changeBlue');
  this.$node.addClass(colors[num]);
};

// Split up lineUp into multiple lines if too many dancers on teh dancefloor