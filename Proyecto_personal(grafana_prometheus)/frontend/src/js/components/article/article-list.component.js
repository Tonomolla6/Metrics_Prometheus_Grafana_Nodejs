class articleListCtrl {
    constructor(Articles, $scope) {
        "ngInject";
        this._Articles = Articles;

        this.check = true;
        this.scrollPager();

        this.$onInit = () => {
            this.query();
        }

        let _this = this;
        $scope.$on('change', function(event, mass) { 
            _this.query()
        });
    }

    query(sum) {
        let _this = this;
        // Filters
        this._Articles.query(this.filters).then(function (res, err) {
            if (sum) {
                console.log(_this.filters);
                _this.articles = _this.articles.concat(res.articles);
                _this.check = true;
                
            } else {
                if (res.articles.length == 0) {
                    _this.articles = null;
                } else {
                    _this.articles = res.articles;
                }
            }
        });

        console.log(this.articles);
    }
    
    scrollPager() {
        let total = document.documentElement.offsetHeight - ((5 * document.documentElement.offsetHeight) / 100);
        window.addEventListener("scroll", (event) => {
            total = document.documentElement.offsetHeight - ((5 * document.documentElement.offsetHeight) / 100);
            if (this.check) {
                if ((document.documentElement.scrollTop + window.innerHeight) > total) {
                    this.check = false;
                    this.filters.offset += this.filters.limit;
                    this.query(true);
                }
            }
        });
    }
}

let ArticleList = {
    bindings: {
        filters: '='
    },
    controller: articleListCtrl,
    templateUrl: 'components/article/article-list.html'
};

export default ArticleList;