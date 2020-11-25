export default class Dummies {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;

    }

    create_user(user_data) {
        return this._$http({
            url: this._AppConstants.api + '/users/',
            method: 'POST',
            data: {
                user: user_data
            },
            dataType: "json"
        }).then((res) => res.data);
    }
}