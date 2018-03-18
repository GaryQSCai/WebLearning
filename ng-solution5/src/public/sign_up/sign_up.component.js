(function () {
"use strict";

angular.module('public')
.component('signUp', {
  templateUrl: 'src/public/sign_up/sign_up.html',
  controller: SignUpController
});


SignUpController.$inject = [];
function SignUpController() {
  var $ctrl = this;
  console.log('SignUpController initiated');

}

})();
