const sanityClient = require("sanity-query-helper");
const { writeCache } = require("./caching");
const { POSTS_KEY } = require("./constants");
const { postprocessor } = require("./postprocess");

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
  const result = client
    .ofType("post")
    .withFilter("slug.current")
    .equalTo(`"${slug}"`)
    .send()
    .then(result => postprocessor(result));
  writeCache(slug, result);
  return result;
};

module.exports = {
  getAll,
  getPost
};
