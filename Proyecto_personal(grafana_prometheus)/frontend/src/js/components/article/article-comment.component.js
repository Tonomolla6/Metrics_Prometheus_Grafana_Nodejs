class articleCommentCtrl {
    constructor() {
        "ngInject";

        this.$onInit = () => {
            console.log(this.comment);
        }
    }
}

let ArticleDraw = {
    bindings: {
        comment: '=',
        article: '='
    },
    controller: articleCommentCtrl,
    templateUrl: 'components/article/article-comment.html'
};

export default ArticleDraw;


// class CommentCtrl {
//     constructor(User,$scope) {
//       'ngInject';
  
   
//       this.$onInit = () => {
//         setTimeout(()=>{
//           if (User.current) {
//             this.canModify = (User.current.username === this.data.author.username);
//           } else {
//             this.canModify = false;
//           }
//           $scope.$apply();
//         },1000);
//       }
  
//     }
//   }
  
//   let Comment = {
//     bindings: {
//       data: '=',
//       deleteCb: '&'
//     },
//     controller: CommentCtrl,
//     templateUrl: 'videojuego/comment.html'
//   };
  
//   export default Comment;