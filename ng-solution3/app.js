(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.directive("foundItems",foundItemsDirective)
.service('MenuSearchService', MenuSearchService);

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var NDCtrl = this;
  NDCtrl.search = function(){
    console.log("When do search, this is ", this);
    if ($scope.input.length == 0) {
      NDCtrl.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function(response){
      NDCtrl.found = filterout(response.data,$scope.input);
      console.log('data: ', response.data);
      console.log('found: ',NDCtrl.found);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  function filterout(data, searchTerm){
    var found = [];
    for (var i=0; i<data.menu_items.length; i++) {
      if (data.menu_items[i].description.indexOf(searchTerm) != -1) {
          found.push(data.menu_items[i]);
      }
    }
    return found;
  }

  NDCtrl.removeItem = function (index) {
    console.log('When do remove, this is', this);
    console.log('when do remove, NDCtrl is', NDCtrl);
    NDCtrl.found.splice(index,1);
  }

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var menu_url = "https://davids-restaurant.herokuapp.com/menu_items.json"

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (menu_url)
    });
    return response;
  }
}

function foundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<items',
      'remove': '&onRemove'
    }

  };

  return ddo;
}

})();
