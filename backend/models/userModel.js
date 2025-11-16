// models/userModel.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Пожалуйста, добавьте имя'],
        },
        email: {
            type: String,
            required: [true, 'Пожалуйста, добавьте адрес электронной почты'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Пожалуйста, добавьте пароль'],
        },
    },
    {
        timestamps: true, // Автоматически добавляет поля createdAt и updatedAt
    }
);

module.exports = mongoose.model('User', userSchema);