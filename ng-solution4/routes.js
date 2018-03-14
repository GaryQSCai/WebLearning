(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    template: '<a ui-sref="MenuCategories">Menu Categories</a>'
  })

  // Premade list page
  .state('MenuCategories', {
    url: '/menu-categories',
    template: '<menu-categories items="MenuCtrl.menuCategories"></menu-categories> <ui-view></ui-view>'
    }
  )
  // // Item detail
  .state('MenuCategories.itemDetail', {
    url: '/item-details/{itemId}',
    // template: "<item-detail itemId='{{itemId}}'></item-detail>",
    template: '<span>details template</span>',
    // controller: 'ItemDetailController as itemDetail',
    params: {
      itemId: null
    }
  });

}

})();
