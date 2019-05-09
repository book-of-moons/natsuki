const express = require("express");
const router = express.Router();
const { readCache } = require("../caching");
const { POSTS_KEY } = require("../constants");
const { getPosts, getPost } = require("../sanity");
const { parseNumberWithDefault } = require("../utilities");

router.get("/", async (req, res) => {
  const { start, end } = {
    start: parseNumberWithDefault(req.query.start, 0),
    end: parseNumberWithDefault(req.query.end, 5)
  };
  const cached = readCache(`${POSTS_KEY}_${start}_${end}`);
  if (cached) {
    res.send(cached);
  } else {
    const results = await getPosts(start, end);
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

router.get("/categories/:category", async (req, res) => {
  let url = `/categories/${req.params.category}`;
  if (req.query.start && req.query.end) {
    url = `${url}?start=${req.query.start}&end=${req.query.end}`;
    res.redirect(301, url);
  }
});

module.exports = router;
