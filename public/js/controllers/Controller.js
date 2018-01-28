app.controller('Controller', ['$scope', '$http', function ($scope, $http) {
  $scope.coffeeBean = {};
  $scope.coffeeBeans = [];
  $scope.importCoffeeBean = {};

  $scope.getCoffeeBeans = function () {
    $http.get('http://localhost:3000/api/coffeeBeans').then(function (res) {
      $scope.coffeeBeans = res.data;
    });
  };

  const getAllCoffeeBeans = function () {
    $http.get('http://localhost:3000/api/coffeeBeans').then(function (res) {
      $scope.coffeeBeans = res.data;
    });
  };

  $scope.getCoffeeBean = function (index) {
    // getAllCoffeeBeans();
    $scope.coffeeBean = $scope.coffeeBeans[index];
  };

  $scope.importCoffeeBean = function () {
    const coffeeData = { 
      coffeeBeanName: $('#coffeeBeanNameArea')[0].value,
      country: $('#countryName')[0].value,
    };
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/coffeeBeans',
      data: coffeeData,
      headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
      $scope.importCoffeeBean = res.data;
      $('#importResult').value = $scope.importCoffeeBean.coffeeBeanName + ' : ' + $scope.importCoffeeBean.country;
    });
  };
}]);
