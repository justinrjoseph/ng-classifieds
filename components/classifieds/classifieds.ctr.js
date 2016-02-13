(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsController',
			['$scope', '$state', '$mdSidenav', '$mdToast', '$mdDialog', 'classifiedsFactory',
				function($scope, $state, $mdSidenav, $mdToast, $mdDialog, classifiedsFactory) {

			var vm = this;

			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editClassified = editClassified;
			vm.editing;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;
			vm.showToast = showToast;

			vm.classifieds = classifiedsFactory.ref;

			vm.classifieds.$loaded().then(function(classifieds) {
				vm.categories = getCategories(classifieds);
			});

			$scope.$on('newClassified', function(event, classified) {
				saveClassified(classified);
			});

			$scope.$on('updateClassified', function(event, classified) {
				showToast('Updated: ', classified, 'top', 'left');
			});

			var contact = {
				name: 'Justin Joseph',
				phone: '(555) 555-5555',
				email: 'justin.joseph0@yahoo.com'
			}

			function openSidebar() {
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

			function saveClassified(classified) {
				if ( classified ) {
					console.log(contact);
					classified.contact = contact;
					console.log(classified);
					vm.classifieds.$add(classified);
					closeSidebar();
					showToast('Saved', classified, 'top', 'left');
					vm.classified = {};
					$state.go('classifieds');
				}
			}

			function editClassified(classified) {
				$state.go('classifieds.edit', {
					id: classified.$id
				});
			}

			function deleteClassified(event, classified) {
				if ( classified ) {
					var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete "' + classified.title + '"?')
						.ok('Yes')
						.cancel('No')
						.targetEvent(event);

					$mdDialog.show(confirm).then(function() {
						vm.classifieds.$remove(classified);
						showToast('Deleted', classified, 'bottom', 'right');
					}, function() {

					});
				}
			}

			function showToast(result, classified, position_v, position_h) {
				$mdToast.show($mdToast
					.simple()
					.content(result + ': ' + "\"" + classified.title + "\"")
					.position(position_v + ' ' + position_h)
					.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {
				var categories = [];

				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category) {
						categories.push(category);
					});
				});

				return _.uniq(categories);
			}

		}]);

})();