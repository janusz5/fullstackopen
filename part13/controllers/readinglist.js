const router = require("express").Router();
const { ReadingList } = require("../models");
const {tokenExtractor, userExtractor} = require('../util/middleware')

router.post("/", async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  return res.json(readingList);
});

router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  if (!readingList) return res.status(404).json({"error": "reading list id not found"})
  if (req.user.id !== readingList.userId) return res.status(401).json({"error": "a user can only change its own reading list"})
  readingList.read = req.body.read
  await readingList.save()
  return res.json(readingList)
})

module.exports = router;
