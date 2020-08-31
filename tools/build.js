const fs = require('fs');
const terser = require('terser');
const csso = require('csso');
const SVGO = require('svgo');

// Create min.js via terser.minify
// terser: https://github.com/terser/terser

let options = {
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

// Create minified svgs via svgo.optimize
// SVGO: https://github.com/svg/svgo

let svgo = new SVGO({
    plugins: [
        {cleanupAttrs: true}, {removeDoctype: true}, {removeXMLProcInst: true}, {removeComments: true},
        {removeMetadata: true}, {removeTitle: true}, {removeDesc: true}, {removeUselessDefs: true},
        {removeEditorsNSData: true}, {removeEmptyAttrs: true}, {removeHiddenElems: true}, {removeEmptyText: true},
        {removeEmptyContainers: true}, {removeViewBox: false}, {cleanupEnableBackground: true}, {convertStyleToAttrs: true},
        {convertColors: true}, {convertPathData: true}, {convertTransform: true}, {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs: true}, {removeUselessStrokeAndFill: true}, {removeUnusedNS: true}, {cleanupIDs: true},
        {cleanupNumericValues: true}, {moveElemsAttrsToGroup: true}, {moveGroupAttrsToElems: true}, {collapseGroups: true},
        {removeRasterImages: false}, {mergePaths: true}, {convertShapeToPath: true}, {sortAttrs: true},
        {removeDimensions: true}, {removeAttrs: {attrs: '(stroke|fill)'}}
    ]
});

let minifySvg = function(source, files, dest) {
    files.forEach(file => {
        fs.readFile(source + '/' + file, 'utf8', function(err, data) {
            if (err) error(err);
            svgo.optimize(data, {path: source}).then(function(result) {
                if (!result.data.includes('id')) {
                    result.data = result.data.split(' '); result.data.splice(2, 0, 'id="레이어_1"'); result.data = result.data.join(' ');
                }
                fs.writeFile(dest + '/' + file, result.data, (err) => { if (err) error(err); });
            });
        });
    });
}

minifySvg('icons/full', [
    'btn-setTimeout-edit.svg',
    'btn-setTimeout-resume.svg',
    'btn-timer-start.svg',
    'btn-timer-stop.svg',
    'btn-resetTime.svg',
    'btn-border-none.svg',
    'btn-border-solid.svg',
    'btn-color-inner.svg',
    'btn-color-outer.svg',
    'btn-wrapper-nowrap',
    'btn-wrapper-wrap',
], 'icons/min');
