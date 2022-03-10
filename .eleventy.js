const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const sass = require('sass');

module.exports = function(eleventyConfig) {

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true,
    },
    warningFileSize: 50 * 1000,
  });

  // Sass pipeline
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function(contents, includePath) {
      let includePaths = [this.config.dir.includes];
      return () => {
        let ret = sass.renderSync({
          file: includePath,
          includePaths,
          data: contents,
          outputStyle: "compressed"
        });
        return ret.css.toString("utf8");
      }
    }
  });

  // Pass through assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "/" });


  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist"
    },
  };

}