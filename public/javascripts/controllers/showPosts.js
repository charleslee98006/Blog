angular.module('charlesBlog')
.controller('frontIndexController', function($scope, $http) {
	$http.get('/api/movies')
        .success(function(data) {
            $scope.title = data;
           console.log("INCOMING DATA!!!!!" + data[0].title);
           console.log()

        })
        .error(function(data) {
            //console.log('Error: ' + data);
    });

});
