'use strict';


var blogList = angular.module('blog', []).controller("mainController", mainController);

function mainController($scope, $http) {
        // $scope.formData = {};
    $scope.foo = "FU";

    // Simple GET request example:
    $http({
      method: 'GET',
      url: '/api/movies'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.blogs = response.data;
        //console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Error: ' + response);
      });

        // when submitting the add form, send the text to the node API
    $scope.createBlog = function() {
        $http({
          method: 'POST',
          url: '/api/movies',
          data: $scope.formData
        }).then(function successCallback(response) {
            var array = [];
            // this callback will be called asynchronously
            // when the response is available
                //console.log($scope.formData);
                $scope.formData = {}; // clear the form so our user is ready to enter another
                // console.log("RESPONSE "+ );
                $scope.blogs = response.data;
                //console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //console.log(response);
          });
    };

    // delete a todo after checking it
    $scope.deleteBlog = function(id) {
        $http.delete('/api/movies/' + id)
            .success(function(data) {
                $scope.blogs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}