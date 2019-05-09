const express = require("express");
const router = express.Router();
const { readCache } = require("../caching");
const { perCategory } = require("../sanity");
const { parseNumberWithDefault } = require("../utilities");

router.get("/:category", async (req, res) => {
  const { start, end } = {
    start: parseNumberWithDefault(req.query.start, 0),
    end: parseNumberWithDefault(req.query.end, 5)
  };
  const category = req.params.category;
  const cached = readCache(`${category}_${start}_${end}`);
  if (cached) {
    res.send(cached);
  } else {
    const results = await perCategory(category, start, end);
    res.send(results);
  }
});

module.exports = router;
