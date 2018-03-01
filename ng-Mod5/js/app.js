(function () {
'use strict';

angular.module('Lunch', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope', '$filter'];
function LunchController($scope, $filter) {
  $scope.borderwidth = 0;
  $scope.checkLunch = function (){
    var count = 0;
    if ($scope.lunchitems) {
      var lunch = $scope.lunchitems.split(',');
      for (var i=0;i<lunch.length;i++) {
        if (lunch[i] && lunch[i].trim()!='') {
          count += 1;
        }
      }
    }
    if (count == 0) {
      $scope.msg = "Please enter data first!";
      $scope.color = "red";
      $scope.bordercolor = "red";
      $scope.borderwidth = 1;
    }
    else if (count>3) {
      $scope.msg = "Too much!";
      $scope.color = "green";
      $scope.bordercolor = "green";
      $scope.borderwidth = 1;
    }
    else {
      $scope.msg = "Enjoy!";
      $scope.color = "green";
      $scope.bordercolor = "green";
      $scope.borderwidth = 1;
    }

  }
}

})();
