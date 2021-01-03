module.exports = {
  isProd: process.env.NODE_ENV === "production",
  isMain: process.env.IS_MAIN === "true",
};
