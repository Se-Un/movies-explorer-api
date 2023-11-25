// импорт зависимостей
const Movie = require('../models/movie');
// импорт ошибок
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
// контроллер выдачи видео пользователю
const getMovies = (req, res, next) => {
  // получить id пользователя
  const owner = req.user._id;
  // найти видео по id пользователя
  Movie.find({ owner })
    .then((movies) => {
      // возвратить в ответе все видео добавленные пользователем
      res.status(200).send(movies);
    })
    .catch(next);
};
// контроллер добавления видео пользователем
const postMovie = (req, res, next) => {
  // получить из запроса параметры карточки видео
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  // получить id пользователя
  const owner = req.user._id;
  // создать карточку видео в БД
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
  // при успешном выполнении запроса возвращаем карточку видео
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы неверные данные'));
      }
      next(error);
    });
};
// контроллер удаления видео пользователем
const deleteMovie = (req, res, next) => {
  // ищем карточку видео по id
  Movie.findById(req.params._id)
    .then((movie) => {
      // выбросить ошибку если карточка не найдена
      if (!movie) {
        return next(new NotFound('Видео с указанным id не найдено'));
      }
      // выбросить ошибку если пользователь хочет удалить карточку другого пользователя
      if (!movie.owner.equals(req.user._id)) {
        return next(new Forbidden('Вы не можете удалить чужое видео'));
      }
      // если карточка найдена и принадлежит текущему пользователю, удалить
      return Movie.findByIdAndDelete(req.params._id)
        .then(() => {
          res.status(200).send({ message: 'видео-файл успешно удален' });
        })
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      next(error);
    });
};
// экспорт контроллеров
module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
