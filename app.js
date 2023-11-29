/* eslint-disable no-console */
// импорт dotenv
require('dotenv').config();
// импорт необходимых зависимостей
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./utils/limitConfig');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// импорт централизованного модуля обработки ошибок
const handleErrors = require('./middlewares/handleErrors');
// импорт опций для cors
const options = require('./utils/corsConfig');
// импорт констант из env
const { PORT, MONGODB, NODE_ENV } = process.env;
// создать константу для запуска сервера через express
const app = express();
// использовать helmet
app.use(helmet());
// использовать cors
app.use('*', cors(options));
// подключение к базе данных
mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => console.log('connected MongoDB'));
// использовать логирование запросов
app.use(requestLogger);
// использовать лимит запросов
app.use(limiter);
// использовать роуты
app.use('/', router);
// использовать логирование ошибок
app.use(errorLogger);
// использовать проверку ошибок JOI
app.use(errors());
// использовать централизованный обработчик ошибок
app.use(handleErrors);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => console.log('This server is running on:', PORT));
