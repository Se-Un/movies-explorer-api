// класс ошибки авторизации
class NotAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
// экспорт класса ошибки авторизации
module.exports = NotAuth;
