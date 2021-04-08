const app = angular.module('expensesApp',['ngRoute']);

// Services => are a way to have shared information between controllers
// Services are like global variables for your application but have to
// be included in the controller. $scope is an angular service
app.factory('Expenses', () => {
  const service = {}

  service.items = [
    {id: 1, description: 'food',amount: 10},
    {id: 2,description: 'clothes',amount: 20},
    {id: 3,description: 'tickets',amount: 100},
    {id: 4,description: 'gas',amount: 40}
  ];

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
  .when('/expense/edit/:id',{
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

app.controller('CreateEditExpenseController',['$scope', '$routeParams', ($scope, $routeParams) => {
  $scope.message = 'This is the message from the addres bar ID: ' + $routeParams.id;
}]);