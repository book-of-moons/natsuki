const process = require("@sanity/block-content-to-html");
const imageUrl = require("@sanity/image-url");
const { DateTime } = require("luxon");

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

const convertDateFormat = isoString => {
  return DateTime.fromISO(isoString).toFormat("yyyy/MM/dd");
};

module.exports = {
  convertBlockObject,
  convertImageUrl,
  convertDateFormat
};
