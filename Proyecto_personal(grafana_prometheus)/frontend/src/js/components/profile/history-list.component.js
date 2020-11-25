class HistoryListCtrl {
    constructor(Profile, User) {
      'ngInject';

      this._profile = Profile;
      this._user = User;
      this.matches = [];
      // console.log(User);
      // console.log(historic);

      this.getHistoric();
    }

    getHistoric() {
      this._profile.getHistoric(this._user.current.username).then(
        (success) =>{
          this.matches = success.matches;
          console.log(success)
          // this._toaster.showToastr('success','COMPRADA la subscripción con exito');
          // setTimeout(() => {
          //   this._$state.go('app.home');
          // }, 1500); 
        },
        (err) =>{
          console.log(err);
          // this._toaster.showToastr('error','Error al comprar');
          // setTimeout(() => {
          //   this._$state.go('app.home');
          // }, 1500); 
        }
      )
    }

    createMatch() {
      this._profile.playMatch(this._user.current.username).then(
        (success) =>{
          console.log(success);
          this.getHistoric();
        }, 
        (err) =>{
          console.log(err);
        }
      )
    }
}

let HistoryList = {
    controller: HistoryListCtrl,
    templateUrl: 'components/profile/history-list.html'
};

export default HistoryList;