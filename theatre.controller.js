'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
  	this.$scope = $scope;
  	this.socket = socket;

    this.Theatres = [];


   $scope.$on('$destroy', function() {
        socket.unsyncUpdates('Theatreendpoint');
      });

  }




  addtheatre() {
this.$http.post('/api/theatreendpoints', {
TheatreName: this.TheatreName,
City: this.City,
Location: this.Location

  //change

});
this.TheatreName = '';
this.City = '';
this.Location = '';
}

$onInit(){
      	this.$http.get('/api/theatreendpoints').then(response => {
          this.Theatres = response.data;
          this.socket.syncUpdates('theatreendpoint', this.Theatres);
        });
}



remove(Theatre){
	var y = confirm('Are you sure want to delete this record?');
	if (y) {
	this.$http.delete('/api/theatreendpoints/' + Theatre._id);

}
}



}

angular.module('projectApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });

})();
