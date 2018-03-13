(function () {
'use strict';

angular.module('MenuApp', ['ui.router'])
.controller('MenuController', MenuController)
.service('MenuDataService', MenuDataService)
.component("menuCategories",{
  templateUrl: 'MenuCategories.html',
  bindings: {
    items: '<'
  }
});

MenuController.$inject = ['MenuDataService'];
function MenuController(MenuDataService) {
  var MenuCtrl = this;
  MenuCtrl.menuCategories = [];
  var promise = MenuDataService.getMenuCategories();
  promise.then(function(response){
    MenuCtrl.menuCategories = response.data;
    console.log('data: ', MenuCtrl.menuCategories);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;
  var menu_url = "https://davids-restaurant.herokuapp.com/categories.json";

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (menu_url)
    });
    return response;
  };
}


})();
