const express = require("express");
const router = express.Router();
const { invalidateCache } = require("../caching");

router.post("/", (req, res) => {
  const ids = req.body.ids;
  if (
    (ids.created && ids.created.length > 0) ||
    (ids.deleted && ids.deleted.length > 0)
  ) {
    invalidateCache();
  }
  res.send(200);
});

module.exports = router;
