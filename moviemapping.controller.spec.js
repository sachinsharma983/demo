'use strict';

describe('Component: MoviemappingComponent', function () {

  // load the controller's module
  beforeEach(module('projectApp'));

  var MoviemappingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MoviemappingComponent = $componentController('moviemapping', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
