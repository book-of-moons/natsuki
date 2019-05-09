const process = require("@sanity/block-content-to-html");
const imageUrl = require("@sanity/image-url");

const convertBlockObject = (blockContent, sanityOptions) => {
  return process({
    blocks: blockContent,
    projectId: sanityOptions.projectId,
    dataset: sanityOptions.dataset
  });
};

const convertImageUrl = (imageRef, sanityClient) => {
  return imageUrl(sanityClient)
    .image(imageRef)
    .url();
};

module.exports = {
  convertBlockObject,
  convertImageUrl
};
