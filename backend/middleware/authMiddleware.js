// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Проверка наличия токена в заголовке Authorization (Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Получаем токен из заголовка (убираем "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // Верифицируем токен
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Находим пользователя по ID из токена и прикрепляем его к запросу
            req.user = await User.findById(decoded.id).select('-password');
            
            // Если все ОК, переходим к следующей функции (контроллеру)
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Не авторизован, токен недействителен');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Не авторизован, токен отсутствует');
    }
});

module.exports = { protect };