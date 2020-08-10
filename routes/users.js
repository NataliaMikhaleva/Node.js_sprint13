const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();

const pathToUsers = path.join(__dirname, '../data/users.json');

// запрос массива пользователей
router.get('/', (req, res) => {
  fs.readFile(pathToUsers, 'utf8')
    .then((users) => {
      res.send(JSON.parse(users));
    })
    .catch(() => {
      res.status('500').send({ message: 'Запрашиваемый ресурс не найден' });
    });
});

// запрос пользователя с конкретным id
router.get('/:id', (req, res) => {
  fs.readFile(pathToUsers, 'utf8')
    .then((users) => {
      const findUser = JSON.parse(users).find((user) => user._id === req.params.id);
      if (!findUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(findUser);
    })
    .catch(() => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
});

module.exports = router;
