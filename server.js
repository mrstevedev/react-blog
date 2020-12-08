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
const paginate = require('express-paginate');

// Load env vars
dotenv.config({ path: './.env' });

connectDB();

const app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));

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

app.get('/api/posts', async (req, res) => {

    try {

        const [ results, itemCount ] = await Promise.all([
          Post.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
          Post.count({})
        ]);
    
        const pageCount = Math.ceil(itemCount / req.query.limit);
    
        if (req.accepts('json')) {
          // inspired by Stripe's API response for list objects
          res.json({
            object: 'list',
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results
          });
        } else {
          res.render('posts', {
            posts: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
          });
        }
    
      } catch (err) {
        next(err);
      }
});

app.get('/api/posts/:id', (req, res) => {
    Post.find()
        .then(posts => {
            const filteredPost = posts.filter(post => post.id == req.params.id);
            res.json(filteredPost);
        }).catch(err => console.log(err));
});

app.patch('/api/posts/:id', (req, res, next) => {
    const { id, decrement } = req.body.data;
    console.log(decrement)
    if(id && !decrement) {
      Post.findOneAndUpdate({ id: id }, { $inc: { likes: 1 } })
        .exec(function(err, res) {
            if(err) throw err;
            else {
                //console.log(res);
            }
        }) 
    } else if (id && decrement) {
      Post.findOneAndUpdate({ id: id }, { $inc: { likes: -1 } })
        .exec(function(err, res) {
            if(err) throw err;
            else {
                //console.log(res);
            }
        }) 
    }
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