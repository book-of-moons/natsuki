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

const getPosts = async (start = 0, end = 5) => {
  const results = await client
    .fetch(
      `*[_type == "post"] | order(_createdAt desc)[${start}...${end}]{title,slug,mainImage,"author":author->{name},"categories":categories[]->{title},_createdAt}`
    )
    .then(results =>
      results.map(item => {
        item.mainImage = convertImageUrl(item.mainImage, client);
        return item;
      })
    );
  await writeCache(`${POSTS_KEY}_${start}_${end}`, results);
  return results;
};

const perCategory = async (category, start, end) => {
  const results = await client
    .fetch(
      `*[_type == "post" && "${category}" in categories[]->title ] | order(_createdAt desc)[${start}...${end}]{title,slug,mainImage,"author":author->{name},"categories":categories[]->{title},_createdAt}`
    )
    .then(results =>
      results.map(item => {
        item.mainImage = convertImageUrl(item.mainImage, client);
        return item;
      })
    );
  await writeCache(`${category}_${start}_${end}`, results);
  return results;
};

const getPost = async slug => {
  const result = await client
    .fetch(
      `*[_type == "post" && slug.current == "${slug}"]{title,slug,"author":author->{name,image},mainImage,"categories":categories[]->{title},body,_createdAt}`
    )
    .then(result => {
      result = result[0];
      result.body = convertBlockObject(result.body, sanityOptions);
      result.mainImage = convertImageUrl(result.mainImage, client);
      return result;
    });
  await writeCache(slug, result);
  return result;
};

module.exports = {
  getPosts,
  getPost,
  perCategory
};
