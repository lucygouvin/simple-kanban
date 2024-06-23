const typeDefs=`
type Project{
    _id: ID
    name: String
    boardArray: [Board]
}

type Board{
    _id: ID
    name: String
    columnArray: [Column]
    privateToOrg: Boolean
}

type Column{
    _id: ID
    title: String
    cardArray: [Card]
}

type Card{
    _id: ID
    content: String
    author: String
    voterArray: [String]
    commentArray: [Comment]
    labelArray: [Label]
    voteCount: Int
}

type Comment{
    _id: ID
    content: String
    author: String
}

type Label{
    _id: ID
    name: String
}

type Query{
    projects: [Project]
    project (id:ID!): Project
    board (id:ID!): Board 
}

type Mutation{
    addProject(name: String!): Project
    addBoard (projectId: ID!, name: String, private: Boolean): Board
    addColumn (boardId: ID!, title: String!): Board
    deleteColumn (boardId: ID!, columnId: ID!): Board
    addCard (boardId: ID!, columnId:ID!, content: String!): Board
    deleteCard (boardId: ID!, columnId: ID!, cardId: ID!): Board
    addComment (boardId: ID!, columnId: ID!, cardId: ID!, content: String!): Board
    incDecVote (boardId: ID!, cardId: ID!, votedBool: Boolean, voterName: String!): Board
}

`;
module.exports = typeDefs;