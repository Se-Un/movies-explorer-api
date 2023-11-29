// импорт необходимых зависимостей
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
// импорт класса ошибки
const NotAuth = require('../errors/NotAuth');
// схема пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
    message: 'Почта введена верно',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});
// функция для поиска пользователя при авторизации
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuth('Почта или пароль указаны неверно!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuth('Данные указаны неверно'));
          }
          return user;
        });
    });
};
// экспорт схемы
module.exports = mongoose.model('user', userSchema);
