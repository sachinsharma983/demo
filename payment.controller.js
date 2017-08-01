'use strict';

(function(){

  class PaymentComponent {
    constructor($http, $scope, socket) {
      this.message = 'Hello';
      this.$http = $http;
      this.socket = socket;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('paymentendpoint');
    });
  }

  savePaymentDetails(){
    this.$http.post('/api/paymentendpoints', {
      MovieName:sessionStorage.getItem('MovieName'),
      Cinema: sessionStorage.getItem('Cinema'),
      CityName: sessionStorage.getItem('City'),
      Seats: JSON.parse(sessionStorage.getItem('JsonSeatNos')),
      SeatClass: sessionStorage.getItem('Class'),
      NoofTickets: sessionStorage.getItem('NoofSeats'),
      MovieDate: sessionStorage.getItem('Moviedate'),
      ShowTime: sessionStorage.getItem('ShowTime'),
      BookingDateTime: Date(),
      Email: this.Email,
      ContactNo: this.ContactNumber,
      AmountPaid: sessionStorage.getItem('Amt')
    });

    }
  }

angular.module('projectApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
