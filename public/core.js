'use strict';


var blogList = angular.module('blog', ["xeditable","ngRoute"]);

blogList.config(function($routeProvider) { 
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/views/mainPageContent.html'
            })
            .when('/projects',{
                templateUrl : '/views/projects/projectContent.html'
            })
            // route for the about page
            .when('/about', {
                templateUrl : '/views/about/aboutMe.html'
            })
            .when('/blogs',{
                templateUrl : '/views/blogs/blogContent.html'  
            })
            .when('/login',{
                templateUrl : '/views/login.html'  
            })
            .when('/blogs/newBlogPost',{
                templateUrl : 'views/newBlogPost.html'
            })
            .when('/registerUser',{
                templateUrl : 'views/registerUser.html'
            })
            .otherwise({
                redirectTo: '/'
            });

            // route for the contact page
            // .when('/contact', {
            //     templateUrl : '/contact.html',
            //     controller  : 'contactController'
            // });
// Read more at http:
//www.tutorialsavvy.com/2013/08/understanding-partials-in-angularjs.html/#OUFiSgAgW8coMlqc.99
});



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
// blogList.directive("login", function(){
//     return{
//         restrict:'E',
//         templateUrl:"views/login.html"
//     }
// });
// blogList.directive("aboutMe", function(){
//     return{
//         restrict:'E',
//         templateUrl:"views/about/aboutMe.html"
//     }
// });
// blogList.directive("mainPageContent", function(){
//     return{
//         restrict:'E',
//         templateUrl:"views/mainPageContent.html"
//     }
// });
blogList.directive("mainPageTeasers", function(){
    return{
        restrict:'E',
        templateUrl:"views/mainPageTeasers.html"
    }
});
// blogList.directive("projectContent", function(){
//     return{
//         restrict:'E',
//         templateUrl:"views/projects/projectContent.html"
//     }
// });
// blogList.directive("blogContent", function(){
//     return{
//         restrict:'E',
//         templateUrl:"views/blogs/blogContent.html"
//     }
// });


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

angular.module('blog').controller('RegUserController', 
    ['$scope','AuthService', '$http',
    function($scope, AuthService, $http){
        $scope.regUser = function(){
            AuthService.register($scope.userName, $scope.userPw);
        }
}]);


angular.module('blog').controller('BlogController', 
    ['$scope','AuthService', '$http',
    function($scope, AuthService, $http){
        
        //$scope.userStatus = true;
        $scope.getUserStatus = function(){
            return AuthService.getUserStatus();
        };

        $scope.newBlog = function(){
            console.log("Users Status: " + AuthService.getUserStatus());

        };
    $http({
      method: 'GET',
      url: '/api/blogs'
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

    $scope.update = function(id, data){
          // $scope.form = {};
        if(AuthService.getUserStatus()){
          data= data.toString();
          console.log("UPDATE DATA:!!!!!" + data);
          $http({
            method: 'PUT',
            url: '/api/blogs/' + id,
            data: data}).
            success(function(data) {
                console.log(data);
              // $scope.form = data.post;
            });
        }
        else{
            console.log("You are not logged in to make the change.");
        }
    };

    // delete a todo after checking it
    $scope.deleteBlog = function(id) {
        $http.delete('/api/blogs/' + id)
            .success(function(data) {
                $scope.blogs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);

blogList.controller('mainController', ['$scope', '$http',
    function($scope, $http) {
                $scope.formData = {};
        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/api/blogs'
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

angular.module('blog').controller("blogTeasersController", 
    ['$scope', '$http',
    function($scope,$http){
        $scope.formData = {};
        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/api/blogs'
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
    $scope.yearShownAlready = function(){

    }

}]);
angular.module('blog').controller("blogPostController", 
    ['$scope', '$http', 
    function($scope, $http) {
    $scope.editing = [];
    $scope.formData = {};
    // $scope.foo = "FU";
    // $scope.header = {name: "views/index.html", url: "/views/index.html"};
    $scope.getDatetime = function() {
        // console.log(new Date());
      return (new Date());
    };

    // Simple GET request example:

        // when submitting the add form, send the text to the node API
    $scope.createBlog = function(timestamp) {
        $http({
          method: 'POST',
          url: '/api/blogs',
          data: {
            "title":$scope.formData, 
            "body": $scope.formBody,
            "author": "Charles",
            "date" : timestamp
            }
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


}]);

// blogList.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && AuthService.isLoggedIn() === false) {
//       $location.path('/login');
//       $route.reload();
//     }
//   });
// });