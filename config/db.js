// const { Sequelize } = require("sequelize");
const mongoose = require('mongoose');
const env = require("dotenv").config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then((conn) => console.log(`MongoDB connected to ${ conn.connection.name }`))
        .catch(err => console.log(err))
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;