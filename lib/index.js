var _ = require('highland');
var path = require('path');
var getFilteredFiles = require('./getFilteredFiles');

module.exports = function scoop(options) {
  var searchPath = options.path;

  return new Promise(function(resolve, reject) {
    var filteredAbsoluteFiles = getFilteredFiles(options);
    var relativeFiles = filteredAbsoluteFiles
      .observe()
      .map(toPathRelativeFilename);

    var requiredModules = filteredAbsoluteFiles.map(require);

    var relativeFileRequireModuleTuples = relativeFiles.zip(requiredModules);

    relativeFileRequireModuleTuples
      .collect()
      .map(tuplesToMap)
      .stopOnError(reject)
      .apply(resolve);
  });

  function tuplesToMap(tuples) {
    var result = {};
    tuples.forEach(function(tuple) {
      result[tuple[0]] = tuple[1];
    });
    return result;
  }

  function toPathRelativeFilename(file) {
    return path.relative(searchPath, file);
  }
}
