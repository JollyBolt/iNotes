require('dotenv').config()

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongo = async() =>{
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to database...")
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = connectToMongo;
