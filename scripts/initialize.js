/*** Initialize everything & first-load globals here ***/

function $(id)          { return document.getElementById(id); }
function $s(selector)   { return document.querySelector(selector); }

function setRootStyle(property, value, priority) { root.style.setProperty(property, value, priority); }
function getRootStyle(property) { return root.style.getPropertyValue(property); }

const root = document.documentElement;

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

const TIMEOUT = 59 * 60 + 60; // seconds

// Root var values
const fontSize = '6vmax';
const fontSizeMAX = '4rem';
const fontFamily = 'NotoSerif-Regular';

const case_ratio = 1.5;
const case_border = 'dotted';
const div_border = 'solid';

const border_opacity = 1;
const border_width = '2px';
const button_width = '16vmax';
const bbtn_content = [ '윤곽선 없애기', '윤곽선 표시' ];

// Init once
window.addEventListener('load', function() {
    
    setRootStyle('--font-family', fontFamily);
    setRootStyle('--font-size', `min(${fontSize}, ${fontSizeMAX})`);
    
    setRootStyle('--case-width', `${getComputedStyle(document.body).fontSize.slice(0, -2) * case_ratio}px`);
    setRootStyle('--case-border', case_border);
    setRootStyle('--div-border', div_border);

    setRootStyle('--border-opacity', border_opacity);
    setRootStyle('--border-width', border_width);
    setRootStyle('--button-width', button_width);
});
