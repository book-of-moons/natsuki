const express = require("express");
const router = express.Router();
const { readCache } = require("../caching");
const { POSTS_KEY } = require("../constants");
const { getAll } = require("../sanity");

router.get("/", async (req, res) => {
  const cached = readCache(POSTS_KEY);
  if (cached) {
    res.send(cached);
  } else {
    const results = await getAll();
    res.send(results);
  }
});

module.exports = router;
