class ArticleCtrl {
    constructor(User, AppConstants, article, Comments, $scope) {
        'ngInject';
        this.appName = AppConstants.appName;
        this.article = article;
        this.comments = [];
        this._Comments = Comments;

        this.resetForm();
        this.getComments()
        
        let _this = this;
        $scope.$on('deleted-comment', function(evt,data){ 
          if (data) {
            _this.getComments();
          }
      });
    }

    getComments() {
      this._Comments.getAll(this.article.slug).then(
        (comments) => this.comments = comments
      );
    }

    resetForm() {
        this.form = {
            "isSubmitting": false,
            "description": ""
        };
    }

    newComment() {
        this._Comments.add(this.article.slug, this.form.description).then(
            (comment) => {
              this.comments.unshift(comment);
              this.article.commentsCount++;
              this.resetForm();
            },
            (err) => {
              this.commentForm.errors = err.data.errors;
            }
          )
          console.log(this.comments);
    }
}

export default ArticleCtrl;