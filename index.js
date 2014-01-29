var path = require('path');
var gutil = require('gulp-util');
var appendit = require('appendit');
var es = require('event-stream');
var PluginError = gutil.PluginError;

module.exports = function(options){
  if (!options) throw new PluginError('gulp-appendit',  'Missing options for gulp-appendit');

  options = options || {};

  function modifyFile(file, cb){
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-appendit', 'Streaming not supported'));

    options.source = file.contents.toString('utf8');

    try{
      file.contents = new Buffer(appendit(options));
    }catch(err) {
      return cb(new PluginError('gulp-appendit', err));
    }

    cb(null, file);
  }

  return es.map(modifyFile);
};