(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsController',
			['$scope', '$state', '$mdSidenav', '$mdDialog', '$timeout', 'classifiedsFactory',
			function($scope, $state, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

				var vm = this;
				vm.closeSidebar = closeSidebar;
				vm.saveClassified = saveClassified;

				$timeout(function() {
					$mdSidenav('left').open();
				});

				$scope.$watch('vm.sideNavOpen', function(is_open) {
					if ( is_open === false ) {
						$mdSidenav('left').close().then(function() {
							$state.go('classifieds');
						});
					}
				});

				function closeSidebar() {
					vm.sideNavOpen = false;
				}

				function saveClassified(classified) {
					if ( classified ) {
						$scope.$emit('newClassified', classified);
						vm.sideNavOpen = false;
					}
				}

			}]);

})();