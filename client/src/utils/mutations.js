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
  }`

  export const DEL_COL = gql`
  mutation DeleteColumn($boardId: ID!, $columnId: ID!) {
    deleteColumn(boardId: $boardId, columnId: $columnId) {
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
  }
  `

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

  export const DELETE_CARD = gql`
  mutation DeleteCard($boardId: ID!, $cardId: ID!, $columnId: ID!) {
    deleteCard(boardId: $boardId, cardId: $cardId, columnId: $columnId) {
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
  }`

  export const CHANGE_VOTE = gql`
  mutation incDecVote($cardId: ID!, $voterName: String!, $boardId: ID!, $votedBool: Boolean) {
    incDecVote(cardId: $cardId, voterName: $voterName, boardId: $boardId, votedBool: $votedBool) {
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
  }`
  
export const ADD_PROJECT = gql`
mutation AddProject($name: String!) {
  addProject(name: $name) {
    _id
    name
  }
}`;