import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

import DummiesService from './dummies.service';
servicesModule.service('Dummies', DummiesService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import GraphQL from './graphql.service';
servicesModule.service('GraphQL', GraphQL);

export default servicesModule;