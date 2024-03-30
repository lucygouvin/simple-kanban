const {Schema} = require('mongoose');

const commentSchema = new Schema(
    {
        content:{
            type: String,
            required: true,
        },
        author:{
            type: String,
        },
    },
    {timestamps: true},
);

module.exports = commentSchema