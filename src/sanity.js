const sanityClient = require("@sanity/client");
const { writeCache } = require("./caching");
const { POSTS_KEY } = require("./constants");
const { convertImageUrl } = require("./postprocess");

const sanityOptions = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true
};

const client = new sanityClient(sanityOptions);

const getAll = () => {
  const results = client
    .fetch(`*[_type == "post"]{title,slug,mainImage,"author":author->{name}}`)
    .then(results =>
      results.map(item => {
        item.mainImage = convertImageUrl(item.mainImage, client);
        return item;
      })
    );
  writeCache(POSTS_KEY, results);
  return results;
};

const getPost = () => {};

module.exports = {
  getAll,
  getPost
};
