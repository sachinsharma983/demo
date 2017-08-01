'use strict';

(function(){

class ConfirmationComponent {
  constructor() {

    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.MovieData = [];
    this.confirmData = [];
    $scope.$on('$destroy', function(){
    	socket.unsyncUpdates('paymentendpoint');
    });
  }


  $onInit(){
  	this.$http.get('/api/paymentendpoints/').then(response => {
  		this.MovieData = response.data;
  		this.socket.syncUpdates('paymentendpoint', this.MovieData);
  	});
  }


}

angular.module('projectApp')
  .component('confirmation', {
    templateUrl: 'app/confirmation/confirmation.html',
    controller: ConfirmationComponent,
    controllerAs: 'confirmationCtrl'
  });

})();
