// класс ошибки - не найдено
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
// экспорт класса ошибки
module.exports = NotFound;
