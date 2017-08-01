'use strict';

(function(){

  class BookingComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.allDates = [];
    this.movDates = [];
    this.currentDate = new Date();

    /*
    var selectedSeats = [];
    $(document).ready(function(){
    	$('.seats').click(function(){
    		$(this).toggleClass('img');
        var seatno = $(this).attr('id');
        selectedSeats.push(seatno);
        console.log(selectedSeats);

    	});
    });


  }

}
 */
  this.$http.get('/api/moviemappingendpoints/Movie/'+sessionStorage.getItem('MovieName')+'/'+sessionStorage.getItem('City')+'/'+sessionStorage.getItem('Cinema'))
      .then(response => {
        this.allDates = response.data[0].MovieDates;
        var j=0;
        for(var i=0;i<this.allDates.length;i++){
          var d = new Date(this.allDates[i]);
          if(d>=new Date()){
            this.movDates[j]=this.allDates[i];
            j++;
          }
        }
        this.socket.syncUpdates('moviemappingendpoints', this.movDates);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('paymentendpoint');
      socket.unsyncUpdates('moviemappingendpoints');
    });
  }

  $onInit() {
    this.$http.get('api/paymentendpoints/'+sessionStorage.getItem('MovieName')+'/'+sessionStorage.getItem('Cinema')+'/'+sessionStorage.getItem('City')+'/'+sessionStorage.getItem('Class')+'/'+sessionStorage.getItem('Moviedate')+'/'+sessionStorage.getItem('ShowTime'))
      .then(response => {
        window.bookedSeats = response.data;
        this.socket.syncUpdates('paymentendpoint', window.bookedSeats);
        window.disableSeats();
    });
    this.$http.get('/api/moviesendpoints/'+sessionStorage.getItem('MovieName'))
      .then(response => {
        this.myMov = response.data;
        this.socket.syncUpdates('Movies', this.myMov);
        sessionStorage.setItem('MoviePoster',this.myMov[0].Poster);
        sessionStorage.setItem('MovieLang',this.myMov[0].Language);
    });

  }
}

angular.module('projectApp')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent,
    controllerAs: 'bookingCtrl'
  });

})();
