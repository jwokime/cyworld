module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("scrapbook", function(collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/scrapbook/*.md");
    // Sort by date: NEWEST FIRST
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return posts;
  });

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/scrapbook/img");
  eleventyConfig.addPassthroughCopy("src/scrapbook/games");
  eleventyConfig.addPassthroughCopy("src/img.ibravo.com");

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk"
  };
};