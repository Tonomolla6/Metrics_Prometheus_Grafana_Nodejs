export default class Profile {
  constructor(AppConstants, $http, GraphQL) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._GraphQL = GraphQL;

  }

  get(username) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username,
      method: 'GET'
    }).then((res) => res.data.profile);
  }

  follow(username) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username + '/follow',
      method: 'POST'
    }).then((res) => res.data);
  }

  unfollow(username) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username + '/follow',
      method: 'DELETE'
    }).then((res) => res.data);
  }

  getFollowers(username) {
    let request = {
      url: this._AppConstants.api + '/profiles/' + username + '/followers',
      method: 'GET'
    };
    return this._$http(request).then((res) => res.data);
  }

  getHistoric(username) {
    let query = `
      query getMatches {
        matches(username:"${username}"){
          result
          author {
            email
            username
            image
          }
        }
      }
    `;
    return this._GraphQL.get(query);
  }

  playMatch() {
    let MatchInput = {
      "result": Math.floor((Math.random() * 2)) ? true : false,
    };
    let mutation = `
      mutation createMatch($input:MatchInput!){
        createMatch(input:$input){
          id
        }
      }
    `;
    return this._GraphQL.mute(mutation, MatchInput);
  }
}