const { Project, Board, Column, Card, Label } = require("../models");
const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find();
    },

    project: async (parent, args) => {
      return await Project.findById(args.id).populate({ path: "boardArray" });
    },

    board: async (parent, args) => {
      return await Board.findById(args.id).populate({
        path: "columnArray",
        populate: { path: "cardArray" },
      });
    },
  },

  Mutation: {
    // PROJECT MUTATIONS
    addProject: async (parent, args) => {
      const project = await Project.create({
        name: args.name,
      });
      return project;
    },

    // BOARD MUTATIONS
    addBoard: async (parent, args) => {
      const board = await Board.create({
        name: args.name,
        privateToOrg: args.private,
      });

      const project = await Project.findOneAndUpdate(
        { _id: args.projectId },
        {
          $addToSet: {
            boardArray: board,
          },
        },
        { new: true }
      ).populate("boardArray");
      return project;
    },

    // COLUMN MUTATIONS
    addColumn: async (parent, args) => {
      const col = await Column.create({
        title: args.title,
      });
      return await Board.findOneAndUpdate(
        { _id: args.boardId },
        {
          $addToSet: {
            columnArray: col._id,
          },
        },
        { new: true }
      );
    },

    // CARD MUTATIONS
    addCard: async (parent, args) => {
      console.log("reached");
      const card = await Card.create({
        content: args.content,
      });

      await Column.findByIdAndUpdate(
        args.columnId,
        { $addToSet: { cardArray: card._id } },
        { new: true }
      );

      return await Board.findById(args.boardId).populate({
        path: "columnArray",
        populate: { path: "cardArray" },
      })
    },

    // COMMENT MUTATIONS
    addComment: async (parent, args) => {
      return await Board.findOneAndUpdate(
        { _id: args.boardId },
        {
          $addToSet: {
            "columnArray.$[colId].cardArray.$[cardId]": {
              content: args.content,
            },
          },
        },
        { arrayFilters: [{ colId: args.columnId }, { cardId: args.cardId }] },
        { new: true }
      );
    },

    // LABEL MUTATIONS
  },
};

module.exports = resolvers;
