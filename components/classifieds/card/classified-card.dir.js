(function() {

	"use strict";

	angular
		.module('ngClassifieds')
		.directive('classifiedCard', function() {
			return {
				restrict: 'E',
				templateUrl: 'components/classifieds/card/classified-card.tpl.html',
				scope: {
					classifieds: '=',
					classifiedsFilter: '=',
					category: '='
				},
				controller: classifiedCardController,
				controllerAs: 'vm'
			}
			
			function classifiedCardController($scope, $state, $mdDialog) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;

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
			}
		});
})();