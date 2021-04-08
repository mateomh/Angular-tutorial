const app = angular.module('expensesApp',['ngRoute']);

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

app.controller('ExpensesViewController',['$scope', ($scope) => {
  $scope.name = 'Mateo';
  
  $scope.expenses = [
    {description: 'food',amount: 10},
    {description: 'clothes',amount: 20},
    {description: 'tickets',amount: 100},
    {description: 'gas',amount: 40}
  ];
  
  $scope.phrase = 'the sky is blue';
  
  $scope.increaseAmount = () => {
    $scope.expense.amount++;
  }
}]);

app.controller('CreateEditExpenseController',['$scope', '$routeParams', ($scope, $routeParams) => {
  $scope.message = 'This is the message from the addres bar ID: ' + $routeParams.id;
}]);