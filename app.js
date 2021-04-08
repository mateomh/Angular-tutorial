const app = angular.module('expensesApp',['ngRoute']);

// Services => are a way to have shared information between controllers
// Services are like global variables for your application but have to
// be included in the controller. $scope is an Angular service
app.factory('Expenses', () => {
  const service = {}

  service.items = [
    {id: 1, description: 'food',amount: 10},
    {id: 2,description: 'clothes',amount: 20},
    {id: 3,description: 'tickets',amount: 100},
    {id: 4,description: 'gas',amount: 40}
  ];

  service.saveNew = (item) => {
    service.items.push(item);
  }

  // service.updateItem = (item) => {
  //   // service.items[item.id] = item;
  //   // console.log(item);
  // }

  return service;
})

app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: './views/expenses.html',
    // controller: 'ExpensesViewController'
  })
  .when('/expenses', {
    templateUrl: './views/expenses.html'
  })
  .when('/expenses/new',{
    templateUrl: './views/form.html'
  })
  .when('/expenses/edit/:id',{
    templateUrl: './views/form.html'
  })
  .otherwise({
    redirectTo: '/'
  })
}]);

app.controller('HomeViewController', ['$scope', ($scope) => {
  $scope.appTitle = "My Expense Tracker";
}]);

app.controller('ExpensesViewController',['$scope', 'Expenses', ($scope, Expenses) => {
  $scope.name = 'Mateo';
  
  $scope.expenses = Expenses.items;
  
  $scope.phrase = 'the sky is blue';
  
  $scope.increaseAmount = () => {
    $scope.expense.amount++;
  }
}]);

app.controller(
  'CreateEditExpenseController',
  ['$scope', '$routeParams', 'Expenses', '$location', 
  ($scope, $routeParams, Expenses, $location) =>
  {
    $scope.expense = { id: 7, description: 'movies', amount: 30};
    
    if($routeParams.id != undefined)
    {
      $scope.expense = Expenses.items[$routeParams.id - 1];
    }
    
    $scope.save = () => {
      if($routeParams.id == undefined) {
        Expenses.saveNew($scope.expense);
      }
      $location.path('/');
    }
  }
]);