describe('badDancer', function() {

  var badDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    badDancer = new BadDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(badDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that updates the position', function() {
    sinon.spy(badDancer, 'setPosition');
    badDancer.step();
    expect(badDancer.setPosition.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(badDancer, 'step');
      expect(badDancer.step.callCount).to.be.equal(0);
      console.log('1');
      clock.tick(timeBetweenSteps + 1000); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps + 1000);
  
      expect(badDancer.step.callCount).to.be.equal(1);
      console.log('2');
      clock.tick(timeBetweenSteps + 1000);
      expect(badDancer.step.callCount).to.be.equal(2);
      console.log('3');
    });
  });
});