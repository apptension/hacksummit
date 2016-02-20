export default ngInject(() => {
    return {
        restrict: 'C',
        link: (function(_this) {
            return function($scope, $el){
                return $scope.role_name = "Role test";
            }
        })(this)
    }
});

