import {gql} from '@apollo/client';

export const ADD_COL= gql`
mutation AddColumn($boardId: ID!, $title: String!) {
    addColumn(boardId: $boardId, title: $title) {
      _id
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
      privateToOrg
    }
  }`;

  export const ADD_CARD = gql`
  mutation addCard($boardId: ID!, $columnId: ID!, $content: String!) {
    addCard(boardId: $boardId, columnId: $columnId, content: $content) {
      name
      _id
      columnArray {
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
        _id
      }
    }
  }`