// импорт
const ServerError = require('../errors/ServerError');
// функция обработчик ошибок
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? next(new ServerError('Ошибка на стороне сервера')) : message,
  });
  next();
};
