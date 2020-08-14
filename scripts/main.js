function $(id)          { return document.getElementById(id); }
function $s(selector)   { return document.querySelector(selector); }

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

const TIMEOUT = 180; // seconds

const bodyFontSize = '6vmax';
const bodyFontMAX = '4rem';

$s('body').onload = (function() {
    $s('body').style.fontFamily = 'NotoSerif-Regular';
    $s('body').style.fontSize = `min(${bodyFontSize}, ${bodyFontMAX})`;
});

startAnimating(5);
