const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
        },
        columnArray: [{
            type: Schema.Types.ObjectId,
            ref: 'Column',
          }],
        privateToOrg:{
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },

);

const Board = model('Board', boardSchema);
module.exports = Board;