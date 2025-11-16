// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController');

// Маршруты для регистрации и входа
router.post('/', registerUser);
router.post('/login', loginUser);

// Маршрут для получения данных о текущем пользователе
// (потребует создания middleware для защиты маршрута)
router.get('/me', getMe); 

module.exports = router;