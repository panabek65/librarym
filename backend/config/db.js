// config/db.js
const mongoose = require('mongoose');

// Функция для подключения к MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Выход из процесса с ошибкой
    }
};

module.exports = connectDB;