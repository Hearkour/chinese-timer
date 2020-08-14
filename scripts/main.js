function $(id)          { return document.getElementById(id); }
function $s(selector)   { return document.querySelector(selector); }

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

const TIMEOUT = 180; // seconds

const bodyFontSize = '6vmax';

class FT { // Framerate Timer, statics for calc
    static stop = false;
    static frameCount = 0;
    static fpsInterval; static startTime; static now; static then; static elapsed;
}

$s('body').onload = (function() {
    $s('body').style.fontFamily = 'NotoSerif-Regular';
    $s('body').style.fontSize = bodyFontSize;
});

startAnimating(5);

// initialize the drawing timer variables and start the animation
function startAnimating(fps) {
    FT.fpsInterval = 1000 / fps;
    FT.then = performance.now();
    FT.startTime = FT.then;

    drawFrameInnerTime();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function drawFrameInnerTime() {

    // request next frame
    requestAnimationFrame(drawFrameInnerTime);
    FT.now = performance.now();
    FT.elapsed = FT.now - FT.then;

    // if enough time has elapsed, draw the next frame
    if (FT.elapsed > FT.fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        FT.then = FT.now - (FT.elapsed % FT.fpsInterval);

        /*** Actual content execution here ***/
        drawInnerTime($timer_digits, 'digits');
        drawInnerTime($timer_chinese_chars, 'chinese', 'chars');
        drawInnerTime($timer_chinese_pinyin, 'chinese', 'pinyin');
    }
}
