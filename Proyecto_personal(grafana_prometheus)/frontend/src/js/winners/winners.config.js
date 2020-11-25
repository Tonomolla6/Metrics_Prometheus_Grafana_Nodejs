function WinnersConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.winners', {
            url: '/winners',
            controller: 'WinnersCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'winners/winners.html',
            title: 'Top Winners',
            resolve: {
                TopUsers: function(User) {
                    return User.getTopUsers();
                },
                Users100: function(User) {
                    return User.getTopUsers(100);
                }
            }
        });
};

export default WinnersConfig;