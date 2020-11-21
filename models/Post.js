const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const PostSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
});
PostSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;