import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import CommentBtn from './buttons/comment-btn.component';
componentsModule.component('commentBtn', CommentBtn);

import DeleteBtn from './buttons/delete-btn.component';
componentsModule.component('deleteBtn', DeleteBtn);

import WinnersTop from './winners-helpers/winners-top.component';
componentsModule.component('winnersTop', WinnersTop);

import WinnersBanner from './winners-helpers/winners-banner.component';
componentsModule.component('winnersBanner', WinnersBanner);

import WinnersList from './winners-helpers/winners-list.component';
componentsModule.component('winnersList', WinnersList);

import HomeSlider from './home/home-slider.component';
componentsModule.component('homeSliderComp', HomeSlider);

import ArticleDraw from './article/article-draw.component';
componentsModule.component('articleDraw', ArticleDraw);

import ArticleComment from './article/article-comment.component';
componentsModule.component('articleComment', ArticleComment);

import ArticleList from './article/article-list.component';
componentsModule.component('articleList', ArticleList);

import PopularNewsBanner from './board/popular-news.component';
componentsModule.component('popularNews', PopularNewsBanner);

import HistoryList from './profile/history-list.component';
componentsModule.component('historyList', HistoryList);

export default componentsModule;