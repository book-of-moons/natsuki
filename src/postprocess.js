const process = require("@sanity/block-content-to-html");
const imageUrl = require("@sanity/image-url");

const convertBlockObject = (blockContent, sanityOptions) => {
  return process({
    blocks: blockContent,
    projectId: sanityOptions.projectId,
    dataset: sanityOptions.dataset
  });
};

const convertImageUrl = (imageRef, sanityClient, imageProps = null) => {
  if (imageProps == null) {
    imageProps = { width: 300, height: 300 };
  }
  return imageUrl(sanityClient)
    .image(imageRef)
    .width(imageProps.width)
    .height(imageProps.height)
    .url();
};

module.exports = {
  convertBlockObject,
  convertImageUrl
};
