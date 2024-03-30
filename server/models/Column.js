const { Schema, model } = require('mongoose');

const columnSchema = new Schema (
    {
        title:{
            type: String,
            trim: true,
            required: true,
        },
        cardArray: [{
            type: Schema.Types.ObjectId,
            ref: 'Card',
          }]
    }
)
const Column = model("Column", columnSchema)

module.exports = Column