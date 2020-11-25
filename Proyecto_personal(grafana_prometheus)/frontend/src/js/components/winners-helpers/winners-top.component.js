class WinnersTopCtrl {
    constructor($scope) {
        'ngInject';
    }
}

let WinnersTop = {
    bindings: {
        users: '='
    },
    controller: WinnersTopCtrl,
    templateUrl: 'components/winners-helpers/winners-top.html'
};

export default WinnersTop;