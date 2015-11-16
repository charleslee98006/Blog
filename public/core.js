'use strict';


var blogList = angular.module('blog', ["xeditable","ngRoute", 'ngAnimate', 'ngResource']);

blogList.config(['$httpProvider','$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('httpErrorResponseInterceptor'),
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
                templateUrl : '/views/newBlogPost.html'
            })
            .when('/blogs/:id',{
                // templateUrl: '/views/about/aboutMe.html'
                templateUrl: function($routeParams) {
                        console.log($routeParams.id);
                        return 'views/eachBlog.html';
                }
                    // console.log("ARM YU HERE!??");
                    //  return '/page/'+$routeParams.route+'.tpl.html';
                // },
                // controller: 'PageController'
            })
            // .when('/registerUser',{
            //     templateUrl : 'views/registerUser.html'
            // })
            // .when('/projectInfo/:worksId', {
            //     templateUrl: function(urlattr){
            //         return '/projectInfo/' + urlattr.worksId+'.html';
            //     }
            // })
            .otherwise({
                templateUrl: '/views/404.html'
            });
            // $locationProvider.html5Mode(true);
            // route for the contact page
            // .when('/contact', {
            //     templateUrl : '/contact.html',
            //     controller  : 'contactController'
            // });
// Read more at http:
//www.tutorialsavvy.com/2013/08/understanding-partials-in-angularjs.html/#OUFiSgAgW8coMlqc.99
}]);

blogList.factory('httpErrorResponseInterceptor', ['$q', '$location',
  function($q, $location) {
    return {
      response: function(responseData) {
        return responseData;
      },
      responseError: function error(response) {
        switch (response.status) {
          case 401:
            $location.path('/login');
            console.log("Erorr!!!");
            break;
          case 404:
            console.log("Error2!");
            $location.path('/404');
            break;
          default:
            $location.path('/error');
        }
        return $q.reject(response);
      }
    };
  }
]);
// blogList.controller('RouteCtrl', function($scope,$routeParams) {
//     console.log("HERE???");
//     // create a message to display in our view 
//     $scope.page=$routeParams.pagename;
//     $scope.message = "(',')---I am on "+$routeParams.pagename +" page---(',')";
//   });

//Http Intercpetor to check auth failures for xhr requests
blogList.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('httpErrorResponseInterceptor');
  }
]);

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

blogList.controller('RegUserController', 
    ['$scope','AuthService', '$http',
    function($scope, AuthService, $http){
        $scope.regUser = function(){
            AuthService.register($scope.userName, $scope.userPw);
        }
}]);

blogList.controller("blogPageController", 
    ['$scope', '$http', '$routeParams', '$resource',
    function($scope, $http, $routeParams, $resource){
        console.log("HERE I AM!!!"+ $routeParams.id);
    var User = $resource('/api/blogs/'+$routeParams.id);
    $scope.blogs = User.get({_id: $routeParams.id});
    // $http({
    //   method: 'GET',
    //   url: '/api/blogs/',
    //   params: { "_id": $routeParams.id }
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     $scope.blogs = response.data;
    //     //console.log(response);
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.log('Error: ' + response);
    //   });

}]);

blogList.controller('BlogController', 
    ['$scope','AuthService', '$http',
    function($scope, AuthService, $http){
        //$scope.userStatus = true;
        $scope.truefalse = true;
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

blogList.controller("blogTeasersController", 
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

blogList.controller("projectTeasersController", 
    ['$scope', '$http',
    function($scope,$http, LightBox){
        // $scope.images=[{

        // }];
        $scope.formData = {};
        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/api/projects'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.projects = response.data;
            //console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error: ' + response);
          });
    $scope.openLightboxModal = function (images) {
        Lightbox.openModal(images, 0);
    };
    $scope.yearShownAlready = function(){

    }
    $scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };
    // $scope.anchorClicked = function(id){
    //     $routeParams.anchorTag(id);
    // }
    // $scope.anchorTag = function(id){
    //     return $location.hash(id);
    // };
    $scope.projectImgClicked = function(param){
        // console.log(param);
        // console.log(param.title);
        $scope.projectClicked = true;
        $scope.title = param.title;
        $scope.img =param.img;
        $scope.text = param.text;
        $scope.link = param.link;
        // console.log($scope.projects);
        // console.log($scope.projects[param].title);
        console.log(param);
    };

}]);

blogList.controller("blogPostController", 
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
blogList.controller("projectPageController", 
    ['$scope', '$http',
    function($scope,$http){
        // $scope.images=[{

        // }];
        $scope.formData = {};
        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/api/projects'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.projects = response.data;
            //console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error: ' + response);
          });
            $scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };
    // $scope.anchorClicked = function(id){
    //     $routeParams.anchorTag(id);
    // }
    // $scope.anchorTag = function(id){
    //     return $location.hash(id);
    // };
    $scope.projectImgClicked = function(param){
        // console.log(param);
        $scope.projectClicked = true;
        $scope.title = param.title;
        $scope.img =param.img;
        $scope.text = param.text;
        $scope.link = param.link;
        // console.log($scope.projects[param].title);

    };
}]);
blogList.run(['$route', function($route)  {
  $route.reload();
}]);     
// blogList.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && AuthService.isLoggedIn() === false) {
//       $location.path('/login');
//       $route.reload();
//     }
//   });
// });