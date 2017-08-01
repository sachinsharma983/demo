'use strict';

(function() {

  class MoviesComponent {
  constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.MovieData =[];
      this.MovieDetails =[];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }


     SearchMovie(){
      console.log('Function Called');
      this.$http.get('https://moviesapi.com/m.php?t='+this.MovieName+'&y='+this.MovieYear+'&type=movie&r=json').then(response => {
        var MovieID=response.data[0].id;
        console.log(response.data);
         this.$http.get('https://moviesapi.com/m.php?i='+MovieID+'&type=movie&r=json').then(response => {
            this.MovieDetails = response.data;
            console.log(this.MovieDetails);
         });
      });

  }


  addMovie() {
 this.$http.post('/api/moviesendpoints', {
  MovieName: this.MovieName,
  Year: this.MovieDetails.year,
  Title: this.MovieDetails.title,
    StarCast: this.MovieDetails.cast,
    Duration: this.MovieDetails.dur,
 Language: this.MovieDetails.lang,
 Poster: this.MovieDetails.cov,
 Genre:this.MovieDetails.gen
 });
 }


 $onInit(){
       this.$http.get('/api/moviesendpoints').then(response => {
         this.MovieData = response.data;
         this.socket.syncUpdates('moviesendpoint', this.MovieData);
       });

  }



  remove(Movie){

       this.$http.delete('/api/moviesendpoints/' + Movie._id);

}


}


angular.module('projectApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
