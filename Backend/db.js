const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://gouthamas0209:myNotes@123@mynotes.ahfuy3u.mongodb.net/myNotes?retryWrites=true&w=majority&appName=myNotes";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log('Connected to Mongo successfully');
}

module.exports = connectToMongo