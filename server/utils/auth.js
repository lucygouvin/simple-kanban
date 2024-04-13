const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { jwtDecode } =require ("jwt-decode")
require('dotenv').config();

const secret = process.env.SECRET_TOKEN;
const expiration = '8h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      req.user = jwtDecode(token)
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
//   signToken({ name, email, _id, event }) {
//     const payload = { name, email, _id};

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
};
