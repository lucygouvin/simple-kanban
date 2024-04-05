const { Project, Board, Column, Card, Label } = require("../models");
var mongoose = require("mongoose");
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

    deleteColumn: async (parent, args) => {
      await Column.findByIdAndDelete(args.columnId);

      return await Board.findByIdAndUpdate( args.boardId,
        { $pull: { columnArray: args.columnId } },
        { new: true }).populate({
        path: "columnArray",
        populate: { path: "cardArray" },
      });
    },

    // CARD MUTATIONS
    addCard: async (parent, args) => {
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
      });
    },

    deleteCard: async (parent, args) => {
      await Column.findByIdAndUpdate(
        args.columnId,
        { $pull: { cardArray: args.cardId } },
        { new: true }
      );
      await Card.findByIdAndDelete(args.cardId);
      return await Board.findById(args.boardId).populate({
        path: "columnArray",
        populate: { path: "cardArray" },
      });
    },

    incDecVote: async (parent, args) => {
      if (args.votedBool) {
        await Card.findByIdAndUpdate(
          args.cardId,
          { $pull: { voterArray: args.voterName } },
          { new: true }
        );
      } else {
        await Card.findByIdAndUpdate(
          args.cardId,
          { $addToSet: { voterArray: args.voterName } },
          { new: true }
        );
      }
      return await Board.findById(args.boardId).populate({
        path: "columnArray",
        populate: { path: "cardArray" },
      });
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
