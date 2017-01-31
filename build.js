/* global cp, exec, mkdir, test */

require('shelljs/global')

if (!test('-d', '.build')) {
  mkdir('.build')
}

exec('browserify index.js -d > .build/rawdevjs.js')
cp('-r', 'public/*', '.build')
