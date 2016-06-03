import 'angular/angular-csp.css';
import './index.scss';

import '../node_modules/bootstrap/dist/css/bootstrap.css';


import angular from 'angular';

import demoModule from './demo/demoModule';

import angularUiBootstrap from 'angular-ui-bootstrap';

import angularChart from 'angular-chart.js';

var app =angular.module('main', [
  demoModule,
  angularUiBootstrap,
  'chart.js'
]);

app.config(function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
  });
  // Configure all doughnut charts
  ChartJsProvider.setOptions('Doughnut', {
    animateScale: true
  });
});

angular.bootstrap(document.documentElement, ['main']);



