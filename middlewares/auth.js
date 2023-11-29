// импорт зависимостей
const jwt = require('jsonwebtoken');
const NotAuth = require('../errors/NotAuth');
// импорт констант из env
const { NODE_ENV, JWT_SECRET } = process.env;
// функция проверки токена
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // получаем токен
  const token = req.cookies.tokenpas;
  let payload;
  try {
    // проверяем токен, если токен не соответствует или не передан, выбрасываем ошибку
    if (!token) {
      next(new NotAuth('Ошибка с идентификацией токена'));
    }
    // если токен прошел, подтверждаем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
  } catch (error) {
    return next(new NotAuth('Авторизация не пройдена'));
  }
  req.user = payload;
  next();
};
