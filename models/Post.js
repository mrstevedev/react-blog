const Sequelize = require('sequelize').Sequelize;
const db = require('../config/db');

const Post = db.define("post", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    }
});

module.exports = Post;