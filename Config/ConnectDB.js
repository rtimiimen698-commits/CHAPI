const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/contactlist'
        await mongoose.connect(uri)
        console.log('MongoDB is connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
    }
}

module.exports = ConnectDB