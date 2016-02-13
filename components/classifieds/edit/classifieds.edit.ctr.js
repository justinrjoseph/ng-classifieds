(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsController',
			['$scope', '$state', '$mdSidenav', '$mdDialog', '$timeout', 'classifiedsFactory',
			function($scope, $state, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

				var vm = this;
				vm.classifieds = classifiedsFactory.ref;
				vm.closeSidebar = closeSidebar;
				vm.updateClassified = updateClassified;
				vm.classified = vm.classifieds.$getRecord($state.params.id);

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

				function updateClassified(classified) {
					vm.classifieds.$save(classified).then(function () {
						vm.sideNavOpen = false;
						$scope.$emit('updateClassified', classified);
					});
				}

			}]);

})();