function $(id) { return document.getElementById(id); }

const $timer_digits = $('timer-digits');
const $timer_chinese_chars = $('timer-chinese-chars');
const $timer_chinese_pinyin = $('timer-chinese-pinyin');

var heading;

// const START = performance.now();
const TIMEOUT = 180; // seconds

class FT { // Framerate Timer, statics for calc
    static stop = false;
    static frameCount = 0;
    static fpsInterval; static startTime; static now; static then; static elapsed;
}

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
        setHeading('h1');
        drawInnerTime($timer_digits, 'digits');
        drawInnerTime($timer_chinese_chars, 'chinese', 'chars');
        drawInnerTime($timer_chinese_pinyin, 'chinese', 'pinyin');
    }
}

class C { // Chinese number conversion

    static c(number) { // as characters
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

    static p(number) { // as pinyin
        let p = '';
        switch (number) {
            case 0: p = 'líng'; break;
            case 1: p = 'yī'; break;
            case 2: p = 'èr'; break;
            case 3: p = 'sān'; break;
            case 4: p = 'sì'; break;
            case 5: p = 'wǔ'; break;
            case 6: p = 'liù'; break;
            case 7: p = 'qī'; break;
            case 8: p = 'bā'; break;
            case 9: p = 'jiǔ'; break;
            case 10: p = 'shí'; break;
            default: break;
        }
        return p;
    }
}

function setHeading(heading) {
    window.heading = heading;
}

// Who knew JS didn't support function overloading?
function drawInnerTime($timer, langType, charType) {

    const NOW = Math.floor(performance.now() / 1000);
    let remains = TIMEOUT - NOW;

    let min = Math.floor(remains / 60);
    let sec = Math.floor(remains % 60);
    setInnerTime($timer, langType, charType, min, sec, heading);
}

function setInnerTime($timer, langType, charType, minutes, seconds, heading) {
    
    let innerHTML;
    let m3, m2, m1, s3, s2, s1;

    setInnerTimeChar(langType);
    setInnerTimeHTML(langType, charType);

    $timer.innerHTML = innerHTML;
    
    function setInnerTimeChar(langType) {
        
        if (langType == 'digits') {
            
            m3 = s3 = '';
            m2 = minutes < 10 ? '' : Math.floor(minutes / 10);
            s2 = seconds < 10 ? '' : Math.floor(seconds / 10);
            m1 = Math.floor(minutes % 10);
            s1 = Math.floor(seconds % 10);
        }

        else if (langType == 'chinese') {

            setInnerTimeChar('digits');

            m3 = m2 > 1 ? m2 : '';
            s3 = s2 > 1 ? s2 : '';
            m2 = m2 > 0 ? 10 : '';
            s2 = s2 > 0 ? 10 : '';
            if (m2 > 0 && m1 == 0) m1 = '';
            if (s2 > 0 && s1 == 0) s1 = '';
        }
    }

    function setInnerTimeHTML(langType, charType) {

        let minChar = '分', secChar = '秒';

        if (langType == 'chinese') {

            if (charType == 'chars') {
                m3 = C.c(m3); m2 = C.c(m2); m1 = C.c(m1);
                s3 = C.c(s3); s2 = C.c(s2); s1 = C.c(s1);
            }

            else if (charType == 'pinyin') {
                m3 = C.p(m3); m2 = C.p(m2); m1 = C.p(m1);
                s3 = C.p(s3); s2 = C.p(s2); s1 = C.p(s1);

                minChar = 'fēn';
                secChar = 'miǎo';
                $timer.setAttribute('style', 'font-size: 1.5vmax;');
            }
        }
        
        innerHTML = `
            <div class="outer">
                <div class="casing digits"> <${heading}> ${m3} </${heading}> </div>
                <div class="casing digits"> <${heading}> ${m2} </${heading}> </div>
                <div class="casing digits"> <${heading}> ${m1} </${heading}> </div>
                <div class="casing chars"> <${heading}> ${minChar} </${heading}> </div>
                <div class="casing digits"> </div>
                <div class="casing digits"> <${heading}> ${s3} </${heading}> </div>
                <div class="casing digits"> <${heading}> ${s2} </${heading}> </div>
                <div class="casing digits"> <${heading}> ${s1} </${heading}> </div>
                <div class="casing chars"> <${heading}> ${secChar} </${heading}> </div>
            </div>
        `;
    }
}
