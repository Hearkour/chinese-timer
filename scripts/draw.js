/*** Draw-everything-onto-window objects & functions ***/

class FT { // Framerate Timer, statics for calc
    // based on https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    static fpsInterval; static startTime;
    static now; static then; static elapsed;
}

// ANIMATE.
update(5);

// initialize the drawing timer variables and start the animation
function update(timerFPS) {
    FT.fpsInterval = 1000 / timerFPS;
    
    FT.then = performance.now();
    FT.startTime = FT.then;

    timerUpdate();
    realTimeUpdate();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function timerUpdate() {
    
    FT.now = performance.now();
    FT.elapsed = FT.now - FT.then;

    // if enough time has elapsed, draw the next frame
    if (FT.elapsed > FT.fpsInterval) {
        
        // Get ready for next frame by setting FT.then = FT.now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        // * Note that this is only set ONCE at a time (per frame)
        FT.then = FT.now - (FT.elapsed % FT.fpsInterval);

        // ** Update frame : timerFPS **
        updateInnerTime();
    }

    // request next frame
    if (!TIMER.drawPaused) requestAnimationFrame(timerUpdate);

}

function updateInnerTime() {
    drawInnerTime($timer_digits, 'digits');
    drawInnerTime($timer_chinese_chars, 'chinese', 'chars');
    drawInnerTime($timer_chinese_pinyin, 'chinese', 'pinyin');
}

function responsiveUpdate() {
    
    if (window.innerWidth > 1400)       fontSizeMax = '4.5rem';
    else if (window.innerWidth > 1080)  fontSizeMax = '3.5rem';
    else if (window.innerWidth > 840)   fontSizeMax = '3rem';
    else                                fontSizeMax = '2.4rem';

    if (window.innerWidth > 840 && window.innerHeight > 540) border_thickness = '5px';
    else border_thickness = '3px';
}

function realTimeUpdate() {
    
    // ** Update frame : real time **
    responsiveUpdate();
    centerBody(1, 1.618);
    
    setRootStyle('--font-size', `min(${fontSizeBase}, ${fontSizeMax})`);
    setRootStyle('--case-size', `min(${getBodyFontSize() * case_font_ratio}px, ${case_size_max})`);
    setRootStyle('--border-thickness', border_thickness);

    // request next frame
    requestAnimationFrame(realTimeUpdate);
}
