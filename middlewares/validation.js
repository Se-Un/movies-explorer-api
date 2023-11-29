// импорт зависимостей
const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/BadRequest');
// проверка url
const validURL = (url) => {
  const valid = isUrl(url);
  if (valid) {
    return url;
  }
  throw new BadRequest('Вы ввели неправильный url-адрес');
};
// проверка id
const validId = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequest('Некорректный id');
};
// проверка данных авторизации
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// проверка данных аутентификации
const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});
// проверка данных обновления информации о пользователе
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});
// проверка данных создания карточки видео
const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validURL),
    trailerLink: Joi.string().required().custom(validURL),
    thumbnail: Joi.string().required().custom(validURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
// проверка данных удаления видео
const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().custom(validId),
  }),
});
// экспорт функций проверки
module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
  validationCreateMovie,
  validationDeleteMovie,
};
