module.exports = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://kim.diplom.nomoredomainsmonster.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
