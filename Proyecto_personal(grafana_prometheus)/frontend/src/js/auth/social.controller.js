class SocialCtrl {
    constructor(User, $state, $scope) {
      'ngInject';
  
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');
  
      this._User.attemptAuth(this.authType, null).then(
        (res) => {
  
            setTimeout(() => {
              location.reload();
              this._$state.go('app.home');
            }, 1500);
  
        },
        (err) => {
          setTimeout(() => {
            this._$state.go('app.home');
          }, 1500);      
        }
      )
    }
  }
  export default SocialCtrl; 