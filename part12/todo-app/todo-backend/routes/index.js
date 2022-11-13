const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  redis.getAsync("added_todos").then(added_todos => {
    if (added_todos === null) added_todos = 0
    res.json({"added_todos": Number(added_todos)})
  })
})

module.exports = router;
