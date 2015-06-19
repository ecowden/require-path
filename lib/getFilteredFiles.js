var path = require('path');
var minimatch = require('minimatch');
var getAllFiles = require('./getAllFiles');

function getFilteredFiles(options) {
  var searchPath = options.path;
  var includes = options.include || ['**/*'];
  var excludes = options.exclude || [];

  return getAllFiles(searchPath)
    .map(toPathRelativeFilename)
    .filter(fileMatchesInclude)
    .reject(fileMatchesExclude)
    .map(toAbsoluteFilename);

  function toPathRelativeFilename(file) {
    return path.relative(searchPath, file);
  }

  function toAbsoluteFilename(file) {
    return path.resolve(searchPath, file);
  }

  function fileMatchesInclude(file) {
    return includes.some(function(include) {
      return minimatch(file, include);
    });
  }

  function fileMatchesExclude(file) {
    return excludes.some(function(excludes) {
      return minimatch(file, excludes);
    });
  }
}

module.exports = getFilteredFiles;
