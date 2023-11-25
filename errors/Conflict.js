// класс ошибки - конфликт
class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
// экспорт класса
module.exports = Conflict;
