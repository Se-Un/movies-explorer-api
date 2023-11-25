// импорт зависимостей
const movieRouters = require('express').Router();
// импорт контроллеров
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');
// импорт проверки данных
const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../middlewares/validation');
// роуты видео
movieRouters.get('/', getMovies);
movieRouters.post('/', validationCreateMovie, postMovie);
movieRouters.delete('/:_id', validationDeleteMovie, deleteMovie);
// экспорт роутов
module.exports = movieRouters;
