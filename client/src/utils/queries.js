import {gql} from '@apollo/client';

export const BOARD = gql `query Board($boardId: ID!) {
    board(id: $boardId) {
      name
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
  }`

  export const PROJECT = gql`
  query Project($projectId: ID!) {
    project(id: $projectId) {
      name
      _id
      boardArray {
        name
        _id
      }
    }
    }
  `;