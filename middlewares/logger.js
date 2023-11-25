// импорт зависимостей
const winston = require('winston');
const expressWinston = require('express-winston');
// настроить логирование запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});
// настроить логирование ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  format: winston.format.json(),
});
// экспорт логов
module.exports = {
  requestLogger,
  errorLogger,
};
