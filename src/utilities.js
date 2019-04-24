const parseNumberWithDefault = (stringToConvert, defaultValue) => {
  const parsed = parseInt(stringToConvert, 10);
  return !isNaN(parsed) ? parsed : defaultValue;
};

module.exports = { parseNumberWithDefault };
