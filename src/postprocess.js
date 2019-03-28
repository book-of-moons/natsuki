const process = require("@sanity/block-content-to-html");

const postprocessor = dataObject => {
  return process({
    blocks: dataObject.body
  });
};

module.exports = {
  postprocessor
};
