(function () {
    var app = angular.module("routingApp", ["ngRoute"]);
    app.config(function ($routeProvider) {
        $routeProvider
                .when("/all", {
                    templateUrl: "allPeople.html",
                    controller: "UserController",
                    controllerAs: "userCtrl"
                })
                .when("/detail", {
                    templateUrl: "personDetails.html",
                    controller: "UserController",
                    controllerAs: "userCtrl"
                })
                .otherwise({
                    template: "<p>Nothing has been selected,</p>"
                });
    });
    var users = [];
    app.controller("UserController", function ($http, $routeParams) {
        var self = this;
        if (users.length === 0) {
            $http.get("data/data.json").success(function (data) {
                users = data.users;
                self.users = users;
            });
        } else { //We used the cache property on the http request instead
            self.users = users;
        }
        if (users !== null) {
            console.log("Adding user: " + $routeParams.id);
            self.user = users[$routeParams.id];
        }

    });
});