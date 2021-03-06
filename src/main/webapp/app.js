(function () {
    var app = angular.module("routingApp", ["ngRoute"]);
    app.config(function ($routeProvider) {
        $routeProvider
                .when("/all", {
                    templateUrl: "allPeople.html",
                    controller: function ($http) {
                        var self = this;
                        if (users.length === 0) {
                            $http.get("Data/Data.json").success(function (data) {
                                users = data.users;
                                self.users = users;
                            });
                        } else { //We used the cache property on the http request instead
                            self.users = users;
                        }
                        this.setUser = function (user) {
                            currentUser = user;
                        };
                    },
                    controllerAs: "userCtrl"
                })
                .when("/detail", {
                    templateUrl: "personDetails.html",
                    controller: function () {
                        this.user = currentUser;
                    },
                    controllerAs: "detailCtrl"
                })
                .otherwise({
                    template: "<h1>Nothing has been selected</h1>"
                });
    });
    var users = [];
    var currentUser;
})();