const sanityClient = require("@sanity/client");
const { writeCache } = require("./caching");
const { POSTS_KEY } = require("./constants");
const { convertBlockObject, convertImageUrl } = require("./postprocess");

const sanityOptions = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true
};

const client = new sanityClient(sanityOptions);

const getAll = () => {
  const results = client
    .fetch(
      `*[_type == "post"]{title,slug,mainImage,"author":author->{name},"categories":categories[]->{title}}`
    )
    .then(results =>
      results.map(item => {
        item.mainImage = convertImageUrl(item.mainImage, client);
        return item;
      })
    );
  writeCache(POSTS_KEY, results);
  return results;
};

const getPost = slug => {
  const result = client
    .fetch(
      `*[_type == "post" && slug.current == "${slug}"]{title,slug,"author":author->{name,image},mainImage,"categories":categories[]->{title},body,_createdAt}`
    )
    .then(result => {
      result = result[0];
      result.body = convertBlockObject(result.body, sanityOptions);
      result.mainImage = convertImageUrl(result.mainImage, client);
      return result;
    });
  writeCache(slug, result);
  return result;
};

module.exports = {
  getAll,
  getPost
};
