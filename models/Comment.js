const Sequelize = require('sequelize').Sequelize;
const db = require('../config/db');

const Comment = db.define('comment', {
    post_id: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },    
    comment: {
        type: Sequelize.STRING
    },
});

module.exports = Comment;