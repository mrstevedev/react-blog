const Sequelize = require('sequelize').Sequelize;
const db = require('../config/db');

const Post = db.define("post", {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    }
});

module.exports = Post;