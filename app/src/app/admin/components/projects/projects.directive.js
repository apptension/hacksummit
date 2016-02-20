export default ngInject(() => {
    return {
        restrict: 'C',
        link: (function(_this) {
            return function($scope, $el){
                return $scope.project_name = "Test";
            }
        })(this)
    }
});

