const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const PostSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    tags: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
PostSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;