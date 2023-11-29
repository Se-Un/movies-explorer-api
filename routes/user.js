// импорт зависимостей
const userRouters = require('express').Router();
// импорт контроллеров
const {
  getUser,
  patchUser,

} = require('../controllers/user');
// импорт проверки данных
const { validationUpdateUser } = require('../middlewares/validation');
// роуты пользователя
userRouters.get('/me', getUser);
userRouters.patch('/me', validationUpdateUser, patchUser);

module.exports = userRouters;
