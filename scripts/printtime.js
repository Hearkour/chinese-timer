function $(id) { return document.getElementById(id); }

const $timer_digits = $('timer-digits');
const $timer_chinese = $('timer-chinese');

// const START = performance.now();
const TIMEOUT = 180; // seconds

class FT { // Framerate Timer, statics for calc
    static stop = false;
    static frameCount = 0;
    static fpsInterval; static startTime; static now; static then; static elapsed;
}

startAnimating(15);

// initialize the drawing timer variables and start the animation
function startAnimating(fps) {
    FT.fpsInterval = 1000 / fps;
    FT.then = performance.now();
    FT.startTime = FT.then;

    drawInnerTime_digits();
    drawInnerTime_chinese();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function drawInnerTime_digits() {
    requestAnimationFrame(drawInnerTime_digits);
    FT.now = performance.now();
    FT.elapsed = FT.now - FT.then;

    // if enough time has elapsed, draw the next frame
    if (FT.elapsed > FT.fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        FT.then = FT.now - (FT.elapsed % FT.fpsInterval);

        /*** Actual content here ***/
        drawInnerTime('digits', $timer_digits);
    }
}

function drawInnerTime_chinese() {
    requestAnimationFrame(drawInnerTime_chinese);

    if (FT.elapsed > FT.fpsInterval) {
        FT.then = FT.now - (FT.elapsed % FT.fpsInterval);
        drawInnerTime('chinese', $timer_chinese);
    }
}

function drawInnerTime(type, $timer) {
    const NOW = Math.floor(performance.now() / 1000);
    let remains = TIMEOUT - NOW;

    let min = Math.floor(remains / 60);
    let sec = Math.floor(remains % 60);
    // $timer.innerHTML = '<h1>' + min + ' 分 ' + addSpace(sec) + sec + ' 秒</h1>';
    $timer.innerHTML = setInnerTime(type, min, sec, 'h1');
}

function C(number) {
    let c = '';
    switch (number) {
        case 0: c = '零'; break;
        case 1: c = '一'; break;
        case 2: c = '二'; break;
        case 3: c = '三'; break;
        case 4: c = '四'; break;
        case 5: c = '五'; break;
        case 6: c = '六'; break;
        case 7: c = '七'; break;
        case 8: c = '八'; break;
        case 9: c = '九'; break;
        case 10: c = '十'; break;
        default: break;
    }
    return c;
}

function setInnerTime(type, minutes, seconds, heading) {
    
    let innerHTML;

    let m2 = minutes<10 ? '' : Math.floor(minutes/10);
    let s2 = seconds<10 ? '' : Math.floor(seconds/10);
    let m1 = Math.floor(minutes % 10);
    let s1 = Math.floor(seconds % 10);
    
    if (type == 'digits') {

        innerHTML = `
            <div class="print n"> <!--m3--> </div>
            <div class="print n"> <${heading}> ${m2} </${heading}> </div>
            <div class="print n"> <${heading}> ${m1} </${heading}> </div>
            <div class="print c"> <${heading}> 分 </${heading}> </div>
            <div class="print n"> </div>
            <div class="print n"> <!--s3--> </div>
            <div class="print n"> <${heading}> ${s2} </${heading}> </div>
            <div class="print n"> <${heading}> ${s1} </${heading}> </div>
            <div class="print c"> <${heading}> 秒 </${heading}> </div>
        `;
    }

    else if (type == 'chinese') {

        let m3 = m2>1 ? m2 : '';
        let s3 = s2>1 ? s2 : '';
        m2 = m2>0 ? 10 : '';
        s2 = s2>0 ? 10 : '';
        if (m2>0 && m1==0) m1 = '';
        if (s2>0 && s1==0) s1 = '';

        innerHTML = `
            <div class="print n"> <${heading}> ${C(m3)} </${heading}> </div>
            <div class="print n"> <${heading}> ${C(m2)} </${heading}> </div>
            <div class="print n"> <${heading}> ${C(m1)} </${heading}> </div>
            <div class="print c"> <${heading}> 分 </${heading}> </div>
            <div class="print n"> </div>
            <div class="print n"> <${heading}> ${C(s3)} </${heading}> </div>
            <div class="print n"> <${heading}> ${C(s2)} </${heading}> </div>
            <div class="print n"> <${heading}> ${C(s1)} </${heading}> </div>
            <div class="print c"> <${heading}> 秒 </${heading}> </div>
        `;
    }

    return innerHTML;
}

// function sett() {
//     $('nowpf').innerHTML = Math.floor(performance.now()/1000);
//     requestAnimationFrame(sett);
// };
// sett();