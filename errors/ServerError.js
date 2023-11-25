// класс ошибки сервера
class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}
// экспорт ошибки класса
module.exports = ServerError;
