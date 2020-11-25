class BoardCtrl {
    constructor(User, Profile, Articles, $scope) {
        'ngInject';
        this.popular_news = Array.from({ length: 3 }, (_, i) => {
            let news = {
                "id": "1",
                "image": "https://empresas.blogthinkbig.com/wp-content/uploads/2020/05/blog-ganador-equinoxroom111.jpg",
                "title": "The Murcian Pedro Herrera has won 100,000 ...",
                "description": "The world game last Tuesday at 18:00 was perfect for our player Pedro ...",
            };
            return news;
        });

        this._scope = $scope;
        this.filters = {
            'friends': ['all'],
            'limit': 3,
            'offset': 0,
            'allfriends': []
        };

        let _this = this;
        if (User.current) {
            Profile.getFollowers(User.current.username).then(function (res, err) {
                _this.friends = res.followers;
                if (res.followers) {
                    res.followers.forEach(element => {
                        _this.filters.allfriends.push(element.username);
                    });
                }
                _this.filters.allfriends.push(User.current.username);
            });
        }

        $scope.$on('deleted', function(evt,data){ 
            if (data) {
                $scope.$broadcast('change', true);
            }
        });
    }

    setFiltersFriends(id) {
        if (this.filters.friends.indexOf(id) >= 0) {
            this.filters.friends.splice(this.filters.friends.indexOf(id), 1);
        } else {
            if (this.filters.friends.indexOf('all') >= 0 && id != 'all') {
                this.filters.friends.splice(this.filters.friends.indexOf('all'), 1);
            } else if (id == 'all') {
                this.filters.friends = [];
            }
            this.filters.friends.push(id);
        }

        if (this.filters.friends.length == 0) {
            this.filters.friends.push("all");
        }
        this.filters.offset = 0;
        
        this._scope.$broadcast('change', true);

    };
}

export default BoardCtrl;