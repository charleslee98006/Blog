'use strict';


var blogList = angular.module('blog', ["xeditable","ngRoute"]);

blogList.directive("sideMainMenuBar", function(){
    return{
        restrict:'E',
        templateUrl: "views/menuBar.html"
    }
});
blogList.directive("projTeaserCoursel", function(){
    return{
        restrict:'E',
        templateUrl:"views/projectTeaserCorousel.html"
    }
});
blogList.directive("blogTeasers", function(){
    return{
        restrict:'E',
        templateUrl:"views/blogTeasers.html"
    }
});
blogList.directive("login", function(){
    return{
        restrict:'E',
        templateUrl:"views/login.html"
    }
});
blogList.directive("aboutMe", function(){
    return{
        restrict:'E',
        templateUrl:"views/about/aboutMe.html"
    }
});
blogList.directive("mainPageContent", function(){
    return{
        restrict:'E',
        templateUrl:"views/mainPageContent.html"
    }
});
blogList.directive("mainPageTeasers", function(){
    return{
        restrict:'E',
        templateUrl:"views/mainPageTeasers.html"
    }
});
blogList.directive("projectContent", function(){
    return{
        restrict:'E',
        templateUrl:"views/projects/projectContent.html"
    }
});
blogList.directive("blogContent", function(){
    return{
        restrict:'E',
        templateUrl:"views/blogs/blogContent.html"
    }
});


angular.module('blog').controller('PanelController', function(){
  this.tab = 1;
  this.selectTab = function(setTab){
    
    this.tab = setTab;
    console.log("set to? " + this.tab);
  }
  this.isSelected = function(checkTab){
    console.log("This "+ this.tab);
    console.log(checkTab);
    console.log("setting?" + angular.equals(this.tab, checkTab));
    return this.tab === checkTab;
  }
});

angular.module('blog').controller('newBlogController', 
    ['$scope','AuthService', 
    function($scope, AuthService){
        
        //$scope.userStatus = true;
        $scope.getUserStatus = function(){
            return AuthService.getUserStatus();
        };

        $scope.newBlog = function(){
            console.log("Users Status: " + AuthService.getUserStatus());

        };

}]);
angular.module('blog').controller("blogTeasersController", 
    ['$scope', '$http',
    function($scope,$http){
        $scope.formData = {};
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

}]);
angular.module('blog').controller("blogRestController", 
    ['$scope', '$http', 
    function($scope, $http) {
    $scope.editing = [];
    $scope.formData = {};
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
    $scope.update = function(id, data){
          // $scope.form = {};
          data= data.toString();
          console.log("UPDATE DATA:!!!!!" + data);
          $http({
            method: 'PUT',
            url: '/api/movies/' + id,
            data: data}).
            success(function(data) {
                console.log(data);
              // $scope.form = data.post;
            });

          // $scope.editPost = function (id) {
          //   $http.put('/api/movies/' + id, $scope.form).
          //     success(function(data) {
          //       $location.url(id);
          //     });
          // };
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

}]);

blogList.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});