const { Sequelize } = require("sequelize");
const env = require("dotenv").config();
    
    const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'ec2-34-195-115-225.compute-1.amazonaws.com',
        dialect: 'postgres',
        port: '53659'
    });

    db.authenticate()
        .then(() => console.log('Database connected successfully.'))
        .catch(err => console.log(err));


module.exports = db;