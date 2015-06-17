var _ = require('highland');
var fs = require('fs');
var readdir = _.wrapCallback(fs.readdir);
var stat = _.wrapCallback(fs.lstat);
var path = require('path');

function getAllFiles(searchPath) {
  return readdir(searchPath)
    .flatten()
    .map(toAbsolutePath(searchPath))
    .flatMap(function (absoluteEntry) {
      return stat(absoluteEntry)
        .flatMap(function (fileStats) {
          if (fileStats.isDirectory()) {
            return getAllFiles(absoluteEntry);
          } else {
            return _([absoluteEntry]);
          }
        });
    });
}

function isDir(fileStats) {
  return fileStats.isDirectory();
}

function toAbsolutePath(parentPath) {
  return function (filename) {
    return path.join(parentPath, filename);
  }
}


module.exports = getAllFiles;
