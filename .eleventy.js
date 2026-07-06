module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("scrapbook", function(collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/scrapbook/*.md");
    // Sort by date: NEWEST FIRST
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return posts;
  });

  eleventyConfig.addCollection("diary", function(collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/diary/*.md");
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return posts;
  });

  eleventyConfig.addCollection("jukebox", function(collectionApi) {
  let posts = collectionApi.getFilteredByGlob("src/jukebox/*.md");
  return posts;
  });

  eleventyConfig.addFilter("longDate", (date) => {
  return date.toDateString();
  });

  // Add shortcode to include changelog.html
  eleventyConfig.addNunjucksShortcode("changelog", function() {
    const fs = require("fs");
    return fs.readFileSync("./src/changelog.md", "utf-8");
  });

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/scrapbook/img");

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};