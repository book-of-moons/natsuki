const express = require("express");
const router = express.Router();
const { readCache } = require("../caching");
const { POSTS_KEY } = require("../constants");
const { getAll, getPost } = require("../sanity");

router.get("/", async (req, res) => {
  const { start, end } = {
    start: parseInt(req.query.start, 10),
    end: parseInt(req.query.end, 10)
  };
  const cached = readCache(`${POSTS_KEY}_${start}_${end}`);
  if (cached) {
    res.send(cached);
  } else {
    const results = await getAll(start, end);
    res.send(results);
  }
});

router.get("/:slug", async (req, res) => {
  const articleSlug = req.params.slug;
  const cached = readCache(articleSlug);
  if (cached) {
    res.send(cached);
  } else {
    const results = await getPost(articleSlug);
    res.send(results);
  }
});

module.exports = router;
