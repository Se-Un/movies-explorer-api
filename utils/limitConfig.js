// импорт зависимостей
const rateLimit = require('express-rate-limit');
// устанавить лимит по запросу
module.exports = rateLimit({
  windowsMS: 10 * 60 * 1000,
  limit: 50,
});
