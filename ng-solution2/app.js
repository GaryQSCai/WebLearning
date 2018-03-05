(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListToBuyController', ShoppingListToBuyController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.service('ShoppingListService', ShoppingListService);

ShoppingListToBuyController.$inject = ['ShoppingListService'];
function ShoppingListToBuyController(ShoppingListService) {
  var tobuyctrl = this;
  tobuyctrl.tobuylist = ShoppingListService.gettobuylist();
  tobuyctrl.checkoff = function(index){
    ShoppingListService.checkoff(index);
  }
}


ShoppingListBoughtController.$inject = ['ShoppingListService'];
function ShoppingListBoughtController(ShoppingListService) {
  var boughtctrl = this;
  boughtctrl.boughtlist = ShoppingListService.getboughtlist();
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var tobuylist = [{name:'rice', quantity:10},{name:'cookies', quantity:5},
    {name:'beef', quantity: 2},{name:'milk', quantity:1},{name:'juice',quantity:3}];

  var boughtlist = [];

  service.checkoff = function (tobuyindex) {
    var itemname, itemqty;
    itemname = tobuylist[tobuyindex].name;
    itemqty = tobuylist[tobuyindex].quantity;
    var item = {
      name: itemname,
      quantity: itemqty
    };
    boughtlist.push(item);
    tobuylist.splice(tobuyindex,1);
  };

  service.gettobuylist = function () {
    return tobuylist;
  };

  service.getboughtlist = function () {
    return boughtlist;
  };
}

})();
