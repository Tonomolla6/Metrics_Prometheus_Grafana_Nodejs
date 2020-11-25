import { merge } from 'lodash';

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

import UserResolvers from "./users/user.resolver";
import MatchResolvers from "./matches/match.resolver";

const resolvers = merge(
  QueryResolvers,
  UserResolvers,
  MatchResolvers
);

export default resolvers;