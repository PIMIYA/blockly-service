const glob = require('glob');

let files = glob.sync('./images/full-*.jpg');
console.log(files.length);
