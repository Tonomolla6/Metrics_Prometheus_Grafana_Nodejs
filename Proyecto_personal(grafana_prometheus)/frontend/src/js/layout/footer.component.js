class AppFooterCtrl {
    constructor(AppConstants, Dummies) {
        'ngInject';
        this.appName = AppConstants.appName;

        // Get today's date to generate the year
        this.date = new Date();
        this._dummies = Dummies;
    }

    dummies() {
        let img = [
            "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
            "https://cdn.pixabay.com/photo/2019/12/05/08/33/girl-4674545_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/01/03/01/38/man-1948310_960_720.jpg",
            "https://cdn.pixabay.com/photo/2019/11/29/21/30/girl-4662159_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/10/15/12/01/dog-1742295_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/11/29/20/22/child-1871104_1280.jpg"
        ];

        let name = ["gandia", "benito", "lopez", "juarez", "perez", "molla", "garcia", "fernandez", "diaz", "jimenez", "ronaldo", "pla", "juan", "torregrosa", "nacher", "ferri", "torro", "barea"];
        let users = [];

        for (let i = 0; i < name.length; i++) {
            let user = {
                "username": name[i],
                "image": img[Math.floor(Math.random() * img.length)],
                "email": name[i] + "@gmail.com",
                "won": Math.floor(Math.random() * 100),
                "losses": Math.floor(Math.random() * 10000),
                "password": "123456",
                "type": "client"
            }
            this._dummies.create_user(user);
        }
    }
}

let AppFooter = {
    controller: AppFooterCtrl,
    templateUrl: 'layout/footer.html'
};

export default AppFooter;