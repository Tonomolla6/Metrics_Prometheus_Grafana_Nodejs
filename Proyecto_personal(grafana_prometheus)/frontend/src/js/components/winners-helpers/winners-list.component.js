class WinnersListCtrl {
    constructor($scope) {
      'ngInject';
      $scope.pages = 0;
      this.selectedPage = 1;
      this.users_paged = [];
      this.pages;

      this.$onInit = () => {
        let result = this.users.length / parseInt(this.limit);
        $scope.pages = result % 10 == 0 ? result : Math.floor(result) + 1;
        this.pages = $scope.pages;
        this.drawUsers();
      }
    }

    changePage(index) {
      if (index + 1 > this.pages) 
        this.selectedPage = this.pages;
      else if (index == -1)
        this.selectedPage = 1;
      else
        this.selectedPage = index + 1;
      this.drawUsers();
    }

    drawUsers() {
      let max = this.selectedPage * this.limit > this.users.length ? this.users.length : this.selectedPage * this.limit;
      let min = max - this.limit;
      this.users_paged = [];

      for (let index = min; index < max; index++) {
        this.users_paged.push(this.users[index]);
      }
    }
}

let WinnersList = {
    bindings: {
      users: '=',
      limit: '='
    },
    controller: WinnersListCtrl,
    templateUrl: 'components/winners-helpers/winners-list.html'
};

export default WinnersList;