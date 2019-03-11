const cache = require("memory-cache");

const writeCache = (key, value) => {
  cache.put(key, value, 90000000);
};

const readCache = key => cache.get(key);

module.exports = { writeCache, readCache };
