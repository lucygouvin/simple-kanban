import {gql} from '@apollo/client';

export const BOARD = gql `query Board($boardId: ID!) {
    board(id: $boardId) {
      name
      columnArray {
        _id
        title
        cardArray {
          _id
          content
          author
          voterArray
          commentArray {
            _id
            content
            author
          }
          labelArray {
            _id
            name
          }
          voteCount
        }
      }
      _id
      privateToOrg
      columnArray {
        _id
        title
        cardArray {
          _id
          content
          author
          voterArray
          commentArray {
            _id
            content
            author
          }
          labelArray {
            _id
            name
          }
          voteCount
        }
      }
    }
  }`;