export default ngInject(() => {
    return {
        restrict: 'C',
        link: (function(_this) {
            return function($scope, $el){
                return $scope.user_name = "User Test";
            }
        })(this)
    }
});

