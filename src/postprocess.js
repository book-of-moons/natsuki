const process = require("@sanity/block-content-to-html");

const postprocessor = (dataObject, sanityOptions) => {
  return process({
    blocks: dataObject.body,
    projectId: sanityOptions.projectId,
    dataset: sanityOptions.dataset
  });
};

module.exports = {
  postprocessor
};
