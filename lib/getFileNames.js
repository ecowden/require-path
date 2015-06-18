var _ = require('highland');
var basename = require('path').basename;

module.exports = function getFileNames(absoluteFileStream) {
  var basenames = absoluteFileStream
    .observe()
    .map(basename);

  return basenames.zip(absoluteFileStream);
}
