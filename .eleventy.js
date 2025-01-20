const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");

module.exports = async function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(options));
  // PassThroughCopy
  eleventyConfig.addPassthroughCopy("src/assets/css/tailwindcss.css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy({
    "node_modules/alpinejs/dist/cdn.min.js": "/assets/alpine.js",
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
  // Page Sorting
  eleventyConfig.addCollection("atributo_es", function (collection) {
    return collection
      .getFilteredByGlob("./src/es/atributos/*.md")
      .sort(function (a, b) {
        return a.data.order - b.data.order;
      });
  });
  eleventyConfig.addCollection("atributo_en", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/atributos/*.md")
      .sort(function (a, b) {
        return a.data.order - b.data.order;
      });
  });
  eleventyConfig.addCollection("atributo_gl", function (collection) {
    return collection
      .getFilteredByGlob("./src/gl/atributos/*.md")
      .sort(function (a, b) {
        return a.data.order - b.data.order;
      });
  });
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
