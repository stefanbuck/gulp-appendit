#gulp-appendit (work in progress) [![Build Status](https://travis-ci.org/stefanbuck/gulp-appendit.png?branch=master)](https://travis-ci.org/stefanbuck/gulp-appendit) [![Dependency Status](https://david-dm.org/stefanbuck/gulp-appendit.png?theme=shields.io)](https://david-dm.org/stefanbuck/gulp-appendit)

> [appendit](https://github.com/stefanbuck/appendit) plugin for gulp

Appendit allows you easily to add text at a specific line. It will works with any plain text format like ```.txt``` ```.md``` ```.js``` ...


## Install

```bash
npm install gulp-appendit
```


## Usage

```js
var gulp = require('gulp');
var appendit = require('gulp-appendit');

gulp.task('default', function() {
  gulp.src('src/index.html')
    .pipe(appendit({
     anchor: '<!-- anchor -->',
     content: [
       '<script src="script.js"></script>'
     ]
    }))
    .pipe(gulp.dest('dist'))
});
```


## API

### appendit(options)

#### options.anchor

*Required*
Type: `String`

#### options.content

*Required*
Type: `Array`


## Example

Below is example how to use gulp-appendit:

The ```index.html``` looks like that:

```html
<html>
	<head>
		<title></title>
		<!-- anchor -->
	</head>
	<body>
	</body>
</html>
```
Call the ```appendit``` function with the following parameters:

```js
var gulp = require('gulp');
var appendit = require('gulp-appendit');

gulp.task('default', function() {
  gulp.src('index.html')
    .pipe(appendit({
     anchor: '<!-- anchor -->',
     content: [
       '<script src="main.js"></script>'
     ]
    }))
    .pipe(gulp.dest('dist'))
});
```

Output:

```html
<html>
	<head>
		<title></title>
		<script src="main.js"></script>
		<!-- anchor -->
	</head>
	<body>
	</body>
</html>
```

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
