const process = require("@sanity/block-content-to-html");
const imageUrl = require("@sanity/image-url");

const convertBlockObject = (dataObject, sanityOptions) => {
  return process({
    blocks: dataObject.body,
    projectId: sanityOptions.projectId,
    dataset: sanityOptions.dataset
  });
};

const convertImageUrl = (imageRef, sanityClient) => {
  return imageUrl(sanityClient)
    .image(imageRef)
    .width(300)
    .height(300)
    .url();
};

module.exports = {
  convertBlockObject,
  convertImageUrl
};