import angular from 'angular';

// Create the module where our functionality can attach to
let boardModule = angular.module('app.board', []);

// Include our UI-Router config settings
import BoardConfig from './board.config.js';
boardModule.config(BoardConfig);

// Controllers
import BoardCtrl from './board.controller';
boardModule.controller('BoardCtrl', BoardCtrl);

export default boardModule;