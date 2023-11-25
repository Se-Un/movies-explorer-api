// импорт зависимостей
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// импорт классов ошибок
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
// импорт констант из env
const { NODE_ENV, JWT_SECRET } = process.env;
// контроллер получение данных пользователя
const getUser = (req, res, next) => {
  // ищем данные пользователя по его id
  User.findById(req.user._id)
    .then((user) => {
      // если введены некорректные данные, выбрасываем ошибку плохого запроса
      if (!user) {
        next(new BadRequest('Переданы некорректные данные'));
      }
      // запрос прошел успешно, выдаем данные пользователя
      res.status(200).send(user);
    })
    .catch(next);
};
// контроллер обновление данных пользователя
const patchUser = (req, res, next) => {
  // деструктурируем данные пользователя из тела запроса
  const { email, name } = req.body;
  // ищем пользователя по id  и меняем его данные
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      // если поиск ничего не выдал, выбрасываем ошибку, не найдено
      if (!user) {
        next(new NotFound('Пользователь не найден'));
      }
      // запрос пройден, возвращаем данные пользователя
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы неверные данные пользователя'));
      } else {
        next(error);
      }
    });
};
//  контроллер регистрации польлзователя и его создания
const createUser = (req, res, next) => {
  // деструктурируем данные пользователя из тела запроса
  const { name, email, password } = req.body;
  // пароль передаем в хэше
  bcrypt.hash(password, 10)
  // создаем пользователя в БД
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send(
      // в ответе не возвращаем пароль
      {
        data: {
          email, name,
        },
      },
    ))
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict('Пользователь с подобным email уже зарегистрирован'));
      }
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные пользователя'));
      } else {
        next(error);
      }
    });
};
// контроллер авторизации
const loginUser = (req, res, next) => {
  // деструктурируем данные из тела запроса
  const { email, password } = req.body;
  // ищем пользователя по email через функцию прописаную в схеме пользователя
  User.findUserByCredentials(email, password)
    .then((user) => {
      // создаем токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('tokenpas', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
// контроллер выхода из системы и очистки куков
const logoutUser = (req, res) => {
  res.clearCookie('tokenpas').send({ message: 'Выход пользователя выполнен' });
};
// экспорт контроллеров
module.exports = {
  getUser,
  patchUser,
  createUser,
  loginUser,
  logoutUser,
};
