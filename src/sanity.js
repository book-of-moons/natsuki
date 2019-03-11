const sanityClient = require("@sanity/client");
const { writeCache } = require("./caching");
const { POSTS_KEY } = require("./constants");

const client = new sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true
});

const getAll = () => {
  const results = client
    .fetch('*[_type == "Post"] {title, slug}')
    .then(results => results);
  writeCache(POSTS_KEY, results);
  return results;
};

module.exports = {
  getAll
};
