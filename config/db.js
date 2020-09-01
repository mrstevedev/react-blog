const { Sequelize } = require("sequelize");
const env = require("dotenv").config();

    
    const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'localhost',
        dialect: 'postgres',
        port: '53659'
    });

    db.authenticate()
        .then(() => console.log('Database connected successfully.'))
        .catch(err => console.log(err));


module.exports = db;