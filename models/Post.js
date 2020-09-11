const Sequelize = require('sequelize').Sequelize;
const db = require('../config/db');

const Post = db.define("post", {
    id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    }
});

module.exports = Post;