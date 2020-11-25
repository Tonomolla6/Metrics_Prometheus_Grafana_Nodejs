class WinnersCtrl {
    constructor(TopUsers,Users100) {
        'ngInject';
        this.users_top = TopUsers;
        this.users = [...this.users_top];
        this.users_list = Users100;

        this.users_top = this.users_top.map((element, i) => {
            if (i == 1) {
                element["class"] = "user0";
                element = this.users[0];
                element["position"] = "First position";
            } else if (i == 0) {
                element["class"] = "user1";
                element = this.users[1];
                element["position"] = "Second position";
            } else {
                element["class"] = "user2";
                element["position"] = "Third position";
            }

            return element;
        });
    }
}

export default WinnersCtrl;