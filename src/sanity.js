const sanityClient = require("sanity-query-helper");
const { writeCache } = require("./caching");
const { POSTS_KEY } = require("./constants");

const client = new sanityClient({
  sanityOptions: {
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    useCdn: true
  }
});

const getAll = () => {
  const results = client
    .ofType("post")
    .pick("title,slug")
    .send()
    .then(result => result);
  writeCache(POSTS_KEY, results);
  return results;
};

const getPost = slug => {
  const initialResult = client
    .ofType("post")
    .pick("title,author,body")
    .withFilter("slug")
    .equalTo(slug)
    .send()
    .then(result => result);
  writeCache(slug, initialResult);
  return initialResult;
};

module.exports = {
  getAll,
  getPost
};
