// controllers/userController.js
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Вспомогательная функция для генерации JWT
const generateToken = (id) => {
    // Секретный ключ берется из .env, поэтому его надо добавить
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Срок действия токена
    });
};

// @desc    Регистрация нового пользователя
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Проверка всех полей
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Пожалуйста, заполните все поля');
    }

    // 2. Проверка, существует ли пользователь
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Пользователь с таким email уже существует');
    }

    // 3. Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Создание пользователя
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // 5. Ответ клиенту
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Некорректные данные пользователя');
    }
});


// @desc    Аутентификация пользователя (Вход)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Проверка email и пароля
    const user = await User.findOne({ email });

    // 2. Сравнение паролей и отправка ответа
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Неправильный email или пароль');
    }
});


// @desc    Получить данные о текущем пользователе (PRIVATE/PROTECTED ROUTE)
// @route   GET /api/users/me
// @access  Private (Потребует middleware)
const getMe = asyncHandler(async (req, res) => {
    // Этот код заработает только после добавления middleware защиты (см. Шаг 6)
    // req.user будет добавлен в объекте middleware
    res.status(200).json(req.user); 
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};