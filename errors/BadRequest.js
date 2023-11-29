// класс ошибки некорректного запроса
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
// экспорт класса ошибки
module.exports = BadRequest;
