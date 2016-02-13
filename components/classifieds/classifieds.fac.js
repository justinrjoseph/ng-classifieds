(function() {

	"use strict";

	angular.module('ngClassifieds')
		.factory('classifiedsFactory',
			['$http', '$firebaseArray',
			function($http, $firebaseArray) {

			var ref = new Firebase('https://jrj-ngclassifieds.firebaseio.com');

			return {
				ref: $firebaseArray(ref)
			}

		}]);

})();