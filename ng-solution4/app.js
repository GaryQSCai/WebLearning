(function () {
'use strict';

angular.module('MenuApp', ['ui.router'])

.service('MenuDataService', MenuDataService)
.component("menuCategories",{
  templateUrl: 'MenuCategories.html',
  controller: MenuCategoriesController
})
.component("itemDetail",{
  templateUrl: 'itemDetails.html',
  controller: ItemDetailController,
  bindings: {
    itemId: '<'
  }
});



MenuCategoriesController.$inject = ['MenuDataService'];
function MenuCategoriesController(MenuDataService){
  var MenuCtrl = this;
  console.log("MenuCategoriesController");
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

//
ItemDetailController.$inject = ['MenuDataService'];
function ItemDetailController(MenuDataService){
  var DetailCtrl = this;
  var promise = MenuDataService.getItemDetails(DetailCtrl.itemId);
  console.log("item id is", DetailCtrl.itemId);
  promise.then(function(response){
    DetailCtrl.itemDetails = response.data;
    console.log("item details: ",DetailCtrl.itemDetails)
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
