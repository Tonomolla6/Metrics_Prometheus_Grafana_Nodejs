class CommentBtnCtrl {
    constructor($state) {
        'ngInject';
        this._$state = $state;
    }

    submit() {
        this._$state.go('app.article', { slug: this.article.slug });
    }
}

let CommentBtn = {
    bindings: {
        article: '='
    },
    transclude: true,
    controller: CommentBtnCtrl,
    templateUrl: 'components/buttons/comment-btn.html'
};

export default CommentBtn;