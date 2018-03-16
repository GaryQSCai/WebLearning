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



MenuCategoriesController.$inject = ['MenuDataService','$scope'];
function MenuCategoriesController(MenuDataService,$scope){
  var MenuCtrl = this;
  this.$onInit = function () {
    MenuCtrl.menuCategories = MenuDataService.menuCategories;
  };
  this.$onDestroy = function () {
        console.log('Categories component is destroyed');
      }
  $scope.$on('Categories Change', function() {
        console.log("There's change in categories");
        MenuCtrl.menuCategories = MenuDataService.menuCategories;
  });
}

//
ItemDetailController.$inject = ['MenuDataService','$scope'];
function ItemDetailController(MenuDataService,$scope){
  var DetailCtrl = this;
  MenuDataService.getItemDetails(DetailCtrl.itemId);
  DetailCtrl.itemDetails = MenuDataService.findDetails(DetailCtrl.itemId);
  $scope.$on('Item Details Change', function() {
    console.log("There's change in item details");
    DetailCtrl.itemDetails = MenuDataService.findDetails(DetailCtrl.itemId);
  });
}

MenuDataService.$inject = ['$http','$rootScope'];
function MenuDataService($http,$rootScope) {
  var service = this;
  var menu_url = "https://davids-restaurant.herokuapp.com/categories.json";
  var item_url = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
  service.itemDetails = [];

  service.getMenuCategories = function () {
    var promise = $http({
      method: "GET",
      url: (menu_url)
    });
    return promise;
  };

  service.getItemDetails = function (itemId) {
    if (service.findDetails(itemId)) {
      return;
    }
    var promise = $http({
      method: "GET",
      url: (item_url+itemId)
    });
    promise.then(function(response){
      console.log("go online to get item details");
      service.itemDetails.push(response.data);
      $rootScope.$broadcast('Item Details Change');
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  service.findDetails = function(itemId){
    for (var i=0;i<service.itemDetails.length;i++) {
      if (service.itemDetails[i].category.short_name == itemId) {
        console.log("fetch data from cache: ",service.itemDetails[i].category.name)
        return service.itemDetails[i];
      }
    }
    return null;
  }

  var promise = service.getMenuCategories();
  promise.then(function(response){
    service.menuCategories = response.data;
    $rootScope.$broadcast('Categories Change');
    console.log('data: ', service.menuCategories);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });


}

})();
