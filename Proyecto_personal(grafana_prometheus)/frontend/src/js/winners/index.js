import angular from 'angular';

// Create the module where our functionality can attach to
let winnersModule = angular.module('app.winners', []);

// Include our UI-Router config settings
import WinnersConfig from './winners.config.js';
winnersModule.config(WinnersConfig);

// Controllers
import WinnersCtrl from './winners.controller';
winnersModule.controller('WinnersCtrl', WinnersCtrl);

export default winnersModule;