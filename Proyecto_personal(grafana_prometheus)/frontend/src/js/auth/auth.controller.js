class AuthCtrl {
  constructor(User, $state, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this.toaster = Toastr;
  }

  submitForm() {
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this.toaster.showToastr("success", "Has iniciado sesion correctamente");
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1000);
      },
      (err) => {
        this.isSubmitting = false;
        if (err.data) {
          this.toaster.showToastr("error", err.data);
        } else {
          this.toaster.showToastr('error','Error trying to login');
        }
      }
    )
  }
}

export default AuthCtrl;