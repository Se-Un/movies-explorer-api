// импорт зависимостей
const router = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// импорт роутов
const userRouters = require('./user');
const movieRouters = require('./movie');
// импорт контроллеров для аутентификации и авторизации
const { createUser, loginUser, logoutUser } = require('../controllers/user');
// импорт мидлвара авторизации
const auth = require('../middlewares/auth');
// импорт класса ошибок
const NotFound = require('../errors/NotFound');
//  использовать парсинг
router.use(bodyParser.json());
router.use(cookieParser());
// запуск роутов
router.post('/signup', createUser);
router.post('/signin', loginUser);
router.use(auth);
router.use('/users', userRouters);
router.use('/movies', movieRouters);
router.use('/signout', logoutUser);
router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
// экспорт роутов
module.exports = router;
