'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.mapp_arr = [];
       this.MovieData= [];
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
        this.$http.get('/api/moviemappingendpoints').then(response => {
          this.mapp_arr = response.data;
        });
        this.$http.get('/api/moviesendpoints').then(response => {
          this.MovieData = response.data;
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('projectApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
