const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const path = require('path');

// Load env vars
dotenv.config({ path: './.env' });

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.static('public'));

// app.get("*", (req, res) => {
//     res.send(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.get('/api/posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.json(posts);
        }).catch(err => console.log(err));
});

app.get('/api/posts/:id', (req, res) => {
    Post.find()
        .then(posts => {
            const filteredPost = posts.filter(post => post.id == req.params.id);
            res.json(filteredPost);
        }).catch(err => console.log(err));
});

app.patch('/api/posts/:id', (req, res, next) => {
    const { id } = req.body.data;
    console.log(id)
    Post.findOneAndUpdate({ id: id }, { $inc: { likes: 1 } })
        .exec(function(err, res) {
            if(err) throw err;
            else {
                console.log(res);
            }
        })  
        return res.send({ success: 'OK' });
});

app.get('/api/comments', (req, res) => {
    Comment.find()
        .then(comment => {
            res.json(comment);
        }).catch(err => console.log(err))
})

app.post('/api/addPost', (req, res) => {
    const { postName, postTitle, postTag, postBody } = req.body;
    res.json({ success: true, postTitle, postBody });
    Post.create({
        name: postName,
        title: postTitle,
        tags: postTag,
        body: postBody
    })
    .catch(err => console.log(err))
});

app.post('/api/addComment', (req, res) => {
    const { post_id, commentName, commentBody } = req.body;
    res.json({ success: true, commentName, commentBody });
    Comment.create({
        post_id,
        name: commentName,
        comment: commentBody
    })
    .catch(err => console.log(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));