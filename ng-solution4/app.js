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
})
.component("itemDetail",{
  templateUrl: 'itemDetails.html',
  controller: 'ItemDetailController as DetailCtrl',
  bindings: {
    itemId: '<'
  }
});

ItemDetailController.$inject = ['MenuDataService'];
function ItemDetailController(MenuDataService){
  var DetailCtrl = this;
  var promise = MenuDataService.getItemDetails(DetailCtrl.itemId);
  console.log("item id is", DetailCtrl.itemId);
  promise.then(function(response){
    DetailCtrl.itemDetails = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}


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
  var item_url = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (menu_url)
    });
    return response;
  };

  service.getItemDetails = function (itemId) {
    var response = $http({
      method: "GET",
      url: (item_url+itemId)
    });
    return response;
  };
}


})();
