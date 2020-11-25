class EditorCtrl {
  constructor(Articles, article, $state, $scope) {
    'ngInject';

    this._Articles = Articles;
    this._$state = $state;

    // Si el articulo esta vacio se borra todo para añadir uno nuevo, si no se pinta el seleccionado.
    if (!article) {
      this.article = {
        title: '',
        description: '',
        image: '',
        private: ''
      }
    } else {
      this.article = article;
    }

    $scope.$on('deleted', function(evt,data){ 
      if (data) {
          $scope.go('app.home');
      }
    });
  }

  submit() {
    // Si esta en true se deshabilita el formulario.
    this.isSubmitting = true;

    // Enviamos la informacion para guardarla.
    console.log(this.article);
    this._Articles.save(this.article).then(
      (res) => {
        this._$state.go('app.article', { slug: res.slug });
      },(err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}


export default EditorCtrl;
