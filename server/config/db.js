const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
    useNewUrlParser: true, 
  });
  console.log('mongobd connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}


module.exports = connectDB;