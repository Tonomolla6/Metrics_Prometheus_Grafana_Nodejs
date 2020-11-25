class PopularNewsBannerCtrl {
    constructor($scope) {
        'ngInject';
    }
}

let PopularNewsBanner = {
    bindings: {
        news: '='
    },
    controller: PopularNewsBannerCtrl,
    templateUrl: 'components/board/popular-news.html'
};

export default PopularNewsBanner;