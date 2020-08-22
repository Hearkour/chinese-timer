const fs = require('fs');
const terser = require('terser');
const csso = require('csso');

// Create min.js via terser.minify
// terser: https://github.com/terser/terser

var options = {
    compress: {},
    mangle: { toplevel: true }
};

terser.minify([
    fs.readFileSync('scripts/root-init.js', 'utf8'),
    fs.readFileSync('scripts/draw.js', 'utf8'),
    fs.readFileSync('scripts/printtime.js', 'utf8'),
    fs.readFileSync('scripts/buttons.js', 'utf8')

], options).then(token => { return token }).then(function(result) {
    fs.writeFile('scripts/chinese-timer.min.js', result.code, (err) => {
        if (err) error(err);
    });
});

// Create min.css via csso.minify
// CSSO: https://github.com/css/csso

fs.writeFile('styles/chinese-timer.min.css', (
    csso.minify(fs.readFileSync('styles/fonts.css', 'utf8')).css +
    csso.minify(fs.readFileSync('styles/global.css', 'utf8')).css
  
), (err) => {
    if (err) error(err);
});
