const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Load env vars
dotenv.config({ path: './.env' });

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

app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get('/api/posts', (req, res) => {
    Post.findAll()
        .then(posts => {
            res.json(posts);
        }).catch(err => console.log(err));
});

app.get('/api/comments', (req, res) => {
    Comment.findAll()
        .then(comment => {
            res.json(comment);
        }).catch(err => console.log(err))
})

app.post('/api/addPost', (req, res) => {
    const { postTitle, postBody } = req.body;
    res.json({ success: true, postTitle, postBody });
    Post.create({
        title: postTitle,
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