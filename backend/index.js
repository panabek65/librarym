// index.js (ФИНАЛЬНЫЙ КОД)
const express = require('express');
const colors = require('colors'); // По желанию, для цветного вывода
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Подключение к БД
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware для обработки тела запроса (JSON и URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Маршруты
app.use('/api/users', require('./routes/userRoutes'));

// Middleware для обработки ошибок (должен быть последним)
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));