'use strict';

(function(){

class MoviemappingComponent {
  constructor($http, $scope, socket) {
    //this.message = 'Hello';
      this.$http = $http;
      this.socket = socket;
      this.$scope= $scope;

      this.theatre_arr =[];
      this.th_arr =[];
      this.MovieData=[];
      $scope.$on('$destroy', function() {
      socket.unsyncUpdates('moviemappingendpoint');
    });
  }


  $onInit(){
    this.$http.get('/api/moviemappingendpoints').then(response => {
      this.theatre_arr = response.data;
      this.socket.syncUpdates('moviemappingendpoint', this.theatre_arr);
    });
    this.$http.get('/api/theatreendpoints').then(response => {
      this.th_arr = response.data;
    });
    this.$http.get('/api/moviesendpoints').then(response => {
      this.MovieData = response.data;
    });
  }




  addmapping(){
  this.$http.post('/api/moviemappingendpoints',{
    CITYNAME: this.cityname,
     AMPM: this.Am_Pm,
     MINUTE:this.Minute,
     HOUR: this.Hour,
     DATE:this.Date,
     THEATRENAME:this.theatrename,
     MOVIENAME:this.moviename

  });
  }





  removedata(theatre){
    this.$http.delete('/api/moviemappingendpoints/' +theatre._id);

  }





}

angular.module('projectApp')
  .component('moviemapping', {
    templateUrl: 'app/moviemapping/moviemapping.html',
    controller: MoviemappingComponent,
    controllerAs: 'moviemappingCtrl'
  });

})();
