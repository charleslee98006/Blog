var blogList = angular.module('blog', []).controller("mainController", mainController);

function mainController($scope, $http) {
    $scope.foo = "FU";
    $http({method: "GET", url: '/api/movies'
    }).then(function successCallback(response) {
    	$scope.data = response.data[0];
    	console.log($scope.data);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}