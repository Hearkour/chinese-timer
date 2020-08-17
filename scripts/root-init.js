/*** Initialize everything & first-load globals here ***/

const html = document.documentElement;
const body = document.body;

function $(id)          { return document.getElementById(id); }
function $s(selector)   { return document.querySelector(selector); }
function $c(className)  { return document.getElementsByClassName(className)[0]; }

function getBodyFontSize()  { return getComputedStyle(body).fontSize.slice(0, -2); }

function getTimeSeconds()   { return Math.floor(performance.now() / 1000); }
function setRootStyle(property, value, priority) {        html.style.setProperty(property, value, priority); }
function getRootStyle(property)                  { return html.style.getPropertyValue(property);             }

const $title = $('title');

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

const TIMER = {

    timeout: 59 * 60 + 60, // as seconds
    isActive: false,

    initialTime: 0, stoppedTime: 0, interval: 0,
    now: 0,
    remains: 0,

    reset: () => {
        TIMER.initialTime = TIMER.stoppedTime = TIMER.interval = 0;
        TIMER.now = 0;
        timerUpdate();
    }
}

const timer_HTML_gbase = 'class="outer case" style="width: var(--case-size);';
const baseColor = '140, 120, 210'; // 'R, G, B'

const    txtBrightness = '40%';
function txtSpanDarken(innerHTML) { return `<span style="filter: brightness(${txtBrightness});">${innerHTML}</span>` }

function centerBody(distTop, distBottom) {
    let propDist = distTop + distBottom;
    let marginHeight = html.clientHeight - body.clientHeight;
    // body margin 비례배분
    setRootStyle('--body-margin', `${marginHeight*(distTop/propDist)}px 0 ${marginHeight*(distBottom/propDist)}px 0`);
}

// Root var values
const fontSizeBase = '6vmax';
var fontSizeMax /* draw.js */;
const fontFamily = '배달의민족 연성';

const case_font_ratio = 1.5;
const case_size_max = '9vw';

const case_border_style = 'solid';
const border_style = 'solid';

const border_alpha = 1;

var border_thickness = '6px';

// Init once
window.addEventListener('load', function() {
    
    setRootStyle('--font-family', fontFamily);
    setRootStyle('--font-size', `min(${fontSizeBase}, ${fontSizeMax})`);
    $title.innerHTML = txtSpanDarken($title.innerHTML);
    
    setRootStyle('--case-size-fixed', `${getBodyFontSize() * case_font_ratio}px`);
    setRootStyle('--case-size', `min(${getBodyFontSize() * case_font_ratio}px, ${case_size_max})`);
    setRootStyle('--case-border-style', case_border_style);
    setRootStyle('--border-style', border_style);

    setRootStyle('--base-color', `rgb(${baseColor})`);
    setRootStyle('--border-alpha', `rgba(${baseColor}, ${border_alpha})`);

    setRootStyle('--border-thickness', border_thickness);
});
