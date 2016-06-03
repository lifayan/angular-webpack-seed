export default class WelcomeController {

  constructor($scope) {

    $scope.startBalance = 5000;

    $scope.annualExpense = 25000;

    $scope.annualIncome = 50000;

    $scope.payRaise = 0.02;

    $scope.contributionRate = 0.095;

    $scope.inflationRate = 0.02;

    $scope.investmentReturn = 0.05;

    $scope.age = 25;

    $scope.retirementAge = 67;

    $scope.lifeExpectiation = 82;


    var getRetirementYear = function () {
      return 2016 + $scope.retirementAge - $scope.age;
    };

    var getLables = function () {
      var retirementYear = getRetirementYear();
      var maxYear = $scope.lifeExpectiation - $scope.retirementAge;
      var result = [];
      for (var i = 0; i <= maxYear; i++) {
        result.push((i + retirementYear) + '(' + ($scope.retirementAge + i) + ')');
      }
      return result;
    };

    var retirementBalance = function () {

      var yearsForSaving = $scope.retirementAge - $scope.age;
      var currentSalary = $scope.annualIncome;
      var currentBalance = $scope.startBalance;
      for (var i = 0; i < yearsForSaving; i++) {
        currentSalary = currentSalary * (1 + $scope.payRaise);
        currentBalance = currentBalance * (1 + Number($scope.investmentReturn)) + currentSalary * Number($scope.contributionRate);
      }
      return currentBalance / 1000;
    };

    var calculateExpenseAtReitirementYear = function () {
      var yearsForSaving = $scope.retirementAge - $scope.age;
      var currentExpense = $scope.annualExpense;

      for (var i = 0; i < yearsForSaving; i++) {
        currentExpense = currentExpense * (1 + $scope.inflationRate);
      }
      return currentExpense;

    };
    var calculateData = function () {

      //var retirementYear = getRetirementYear();
      var maxYear = $scope.lifeExpectiation - $scope.retirementAge;
      var balanceList = [];
      var expenseList = [];
      var currentExpense = calculateExpenseAtReitirementYear() / 1000;
      var currentBalance = retirementBalance();
      for (var i = 0; i <= maxYear; i++) {
        currentExpense = currentExpense * (1 + $scope.inflationRate);

        currentBalance = (currentBalance - currentExpense) * (1 + $scope.investmentReturn);

        if (currentBalance < 0) {
          currentBalance = 0;
          currentExpense = 0;
        }
        balanceList.push(Math.round(currentBalance));
        expenseList.push(Math.round(currentExpense));
      }
      return [ expenseList, balanceList];

    };

    $scope.retirementBalance = retirementBalance();
    $scope.series = ['Expense','Balance' ];
    $scope.labels = getLables();
    $scope.data = calculateData();

    $scope.multiAxis = ['y-axis-1', 'y-axis-2'];

    $scope.calculate = function () {

      $scope.retirementBalance = retirementBalance();
      console.log("retirementBalance" ,$scope.retirementBalance);
      $scope.labels = getLables();
      $scope.data = calculateData();
    };

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

  }
}
