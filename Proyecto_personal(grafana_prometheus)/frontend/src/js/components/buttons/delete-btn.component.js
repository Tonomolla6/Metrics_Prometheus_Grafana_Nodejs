class DeleteBtnCtrl {
    constructor(Articles,Comments,User,$scope) {
        'ngInject';
        this._articles = Articles;
        this._comments = Comments;
        this._$scope = $scope;

        this.$onInit = () => {
            if (User.current.username != this.article.author.username) {
                this.disabled = true;
            }
        }
    }

    deleteElement() {
        if (this.comment) {
            this._comments.destroy(this.article.slug,this.comment.id).then(
                (success) => this._$scope.$emit('deleted-comment',true)
            );
        } else {
            this._articles.destroy(this.article.slug).then(
                (success) => this._$scope.$emit('deleted',true)
            );
        }
    }
}

let DeleteBtn = {
    bindings: {
        article: '=',
        comment: '=',
        model: '='
    },
    transclude: true,
    controller: DeleteBtnCtrl,
    templateUrl: 'components/buttons/delete-btn.html'
};

export default DeleteBtn;