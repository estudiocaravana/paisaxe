module.exports = function (eleventyConfig) {
  // PassThroughCopy
  eleventyConfig.addPassthroughCopy("src/assets/css/tailwindcss.css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy({
    "node_modules/alpinejs/dist/cdn.js": "/assets/alpine.js",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@alpinejs/collapse/dist/cdn.js": "/assets/collapse.js",
  });
  eleventyConfig.addPassthroughCopy("src/assets/font/bundle.css");
  // Page Sorting. Importante para que netlify no ordene alfabéticamente
  eleventyConfig.addCollection("page", function (collections) {
    return collections.getFilteredByTag("page").sort(function (a, b) {
      return a.data.order - b.data.order;
    });
  });
  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
