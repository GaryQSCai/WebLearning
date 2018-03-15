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
    templateUrl: 'home.html'
  })

  // Premade list page
  .state('MenuCategories', {
    url: '/menu-categories',
    component: 'menuCategories'
  })
  // Item detail
  .state('itemDetail', {
    url: '/item-details/{itemId}',
    // template: "<item-detail itemId='{{itemId}}'></item-detail>",
    component: 'itemDetail',
    // controller: 'ItemDetailController as itemDetail',
    resolve: {
      itemId: function($stateParams) {
          console.log('statparams.itemId',$stateParams.itemId);
          return $stateParams.itemId;
        }
    }
  });

}

})();
