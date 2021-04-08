const app = angular.module('expensesApp',[]);

app.controller('ExpensesViewController',['$scope', ($scope) => {
  $scope.name = 'Mateo';

  $scope.expense = {
    description: 'food',
    amount: 10
  };

  $scope.phrase = 'the sky is blue';

  $scope.increaseAmount = () => {
    $scope.expense.amount++;
  }
}]);