module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("scrapbook", function(collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/scrapbook/*.md");
    // Sort by date: NEWEST FIRST
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return posts;
  });

  // Add shortcode to include changelog.html
  eleventyConfig.addNunjucksShortcode("includeChangelog", function() {
    const fs = require("fs");
    try {
      return fs.readFileSync("./src/changelog.md", "utf-8");
    } catch (err) {
      console.error("Error reading changelog.md:", err);
      return "";
    }
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