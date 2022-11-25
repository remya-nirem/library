const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
   bookid: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String
    },
    pages:{
        type: Number
    },
    genre:{
        type: String
    },
    status:{
        type: String
    },
    published:{
        type: Date,
        default: Date.now()
    }
});


const bookInfo = mongoose.model('book',bookSchema);

module.exports = bookInfo;