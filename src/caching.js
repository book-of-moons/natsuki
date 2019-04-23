const cache = require("memory-cache");

const writeCache = (key, value) => {
  cache.put(key, value, 86400000);
};

const readCache = key => cache.get(key);

module.exports = { writeCache, readCache };
