const app = angular.module('expensesApp',['ngRoute']);

// Services => are a way to have shared information between controllers
// Services are like global variables for your application but have to
// be included in the controller. $scope is an Angular service
app.factory('Expenses', () => {
  const service = {}

  service.items = [
    {id: 1, description: 'food', amount: 10},
    {id: 2, description: 'clothes', amount: 20},
    {id: 3, description: 'tickets', amount: 100},
    {id: 4, description: 'gas', amount: 40}
  ];

  service.saveNew = (item) => {
    const index = service.items.findIndex(element => element.id == item.id);
    console.log(index);
    if (index !== -1) {
      // validItem = {...item};
      // validItem = {...validItem, ...item};
      // console.log(service.items[1]);
      service.items[index] = {...service.items[index], ...item};
      // service.items[1].description = item.description;
      // service.items[1].amount = item.amount;
      console.log(service.items[1]);
    } else {
      service.items.push(item);
      service.items[-1]
    }
  }

  service.removeItem = (id) => {
    const index = service.items.findIndex(element => element.id == id);
    console.log(index);
    if (index !== -1) {
      service.items.splice(index, 1);
    }
  }



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

  $scope.delete = (id) => {
    console.log(id);
    Expenses.removeItem(id);
  }
}]);

app.controller(
  'CreateEditExpenseController',
  ['$scope', '$routeParams', 'Expenses', '$location', 
  ($scope, $routeParams, Expenses, $location) =>
  {
    $scope.expense = { id: 5, description: 'movies', amount: 30};
    
    if($routeParams.id != undefined)
    {
      $scope.expense = {...Expenses.items[$routeParams.id - 1]};
    }
    
    $scope.save = () => {
      // if($routeParams.id == undefined) {
      Expenses.saveNew($scope.expense);
      // }
      $location.path('/');
    }

    
  }
]);