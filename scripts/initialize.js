/*** Initialize everything & first-load globals here ***/

function $(id)          { return document.getElementById(id); }
function $s(selector)   { return document.querySelector(selector); }

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

const TIMEOUT = 180; // seconds

const bodyFontSize = '6vmax';
const bodyFontMAX = '4rem';

window.addEventListener('load', function() {
    document.body.style.fontFamily = 'NotoSerif-Regular';
    document.body.style.fontSize = `min(${bodyFontSize}, ${bodyFontMAX})`;
});
