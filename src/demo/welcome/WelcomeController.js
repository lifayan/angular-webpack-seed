export default class WelcomeController {

  constructor($scope) {

    $scope.startBalance = 5000;

    $scope.annualExpense = 25000;

    $scope.annualIncome = 50000;

    $scope.payRaise = 2.0 / 100;

    $scope.contributionRate = 9.5 / 100;

    $scope.inflationRate = 2.0 / 100;

    $scope.investmentReturn = 5.0 / 100;

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
      //var sumBalance =
      //$scope.startBalance * (1 + $scope.investmentReturn) + $scope.annualIncome * $scope.contributionRate;
      for (var i = 0; i < yearsForSaving; i++) {
        currentSalary = currentSalary * (1 + $scope.payRaise);
        console.log("currentSalary", currentSalary);
        currentBalance = currentBalance * (1 + $scope.investmentReturn) + currentSalary * $scope.contributionRate;
        console.log("currentBalance", currentBalance);
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

      var retirementYear = getRetirementYear();
      var maxYear = $scope.lifeExpectiation - $scope.retirementAge;
      var balanceList = [];
      var expenseList = [];
      var currentExpense = calculateExpenseAtReitirementYear() / 1000;
      var currentBalance = retirementBalance();
      console.log("currentExpense", currentExpense);
      console.log("currentBalance", currentBalance);
      for (var i = 0; i <= maxYear; i++) {
        currentExpense = currentExpense * (1 + $scope.inflationRate);

        currentBalance = currentBalance - currentExpense;

        if (currentBalance < 0) {
          currentBalance = 0;
          currentExpense = 0;
        }
        balanceList.push(currentBalance);
        expenseList.push(currentExpense);
      }
      return [balanceList, expenseList];

    };

    $scope.retirementBalance = retirementBalance();
    $scope.series = ['Balance', 'Expense'];
    $scope.labels = getLables();
    $scope.data = calculateData();

    $scope.multiAxis = ['y-axis-1', 'y-axis-2'];

    $scope.calculate = function () {
      console.log("calculate");
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

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };

  }
}
