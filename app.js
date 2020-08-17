const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000, BASE_PATH } = process.env;
app.use(express.static((path.join(__dirname, 'public'))));
app.use((req, res, next) => {
  req.user = {
    _id: '5f37b10b737bf835d4ce1953',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
  console.log(BASE_PATH);
});
