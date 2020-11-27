const mongoose = require('mongoose');

const db = require('../config/db');

const CommentSchema = new mongoose.Schema({
    post_id: {
        type: Number
    },
    name: {
            type: String
    },    
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;