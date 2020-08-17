/*** Chinese time print objects & functions ***/

const C = { // Chinese number conversion

    c: function(number) { // as characters
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
    },

    p: function (number) { // as pinyin
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

const TN = { // time numbers

    m3:0, m2:0, m1:0,
    s3:0, s2:0, s1:0,

    convertTo: (charType) => {
        
        if (charType == 'chars') {
            TN.m3 = C.c(TN.m3); TN.m2 = C.c(TN.m2); TN.m1 = C.c(TN.m1);
            TN.s3 = C.c(TN.s3); TN.s2 = C.c(TN.s2); TN.s1 = C.c(TN.s1);
        }

        else if (charType == 'pinyin') {
            TN.m3 = C.p(TN.m3); TN.m2 = C.p(TN.m2); TN.m1 = C.p(TN.m1);
            TN.s3 = C.p(TN.s3); TN.s2 = C.p(TN.s2); TN.s1 = C.p(TN.s1);
        }
    }
}

function drawInnerTime($timer, langType, charType) {

    if (TIMER.isActive) {
        if (!TIMER.initialTime) TIMER.initialTime = getTimeSeconds();
        TIMER.now = getTimeSeconds() - TIMER.initialTime;
    }
    else {
        if (TIMER.initialTime) TIMER.interval = getTimeSeconds() - TIMER.stoppedTime;
    }
        
    TIMER.remains = TIMER.timeout - TIMER.now;

    let min = Math.floor(TIMER.remains / 60);
    let sec = Math.floor(TIMER.remains % 60);
    setInnerTime($timer, langType, charType, min, sec);
}

function setInnerTime($timer, langType, charType, min, sec) {

    setInnerTimeChar(langType, min, sec);
    setInnerTimeHTML($timer, langType, charType);
}

function setInnerTimeChar(langType, min, sec) {
    
    if (langType == 'digits') {
        
        TN.m3 = TN.s3 = '';
        TN.m2 = min < 10 ? '' : Math.floor(min / 10);
        TN.s2 = sec < 10 ? '' : Math.floor(sec / 10);
        TN.m1 = Math.floor(min % 10);
        TN.s1 = Math.floor(sec % 10);
    }

    else if (langType == 'chinese') {

        setInnerTimeChar('digits', min, sec);

        TN.m3 = TN.m2 > 1 ? TN.m2 : '';
        TN.s3 = TN.s2 > 1 ? TN.s2 : '';
        TN.m2 = TN.m2 > 0 ? 10 : '';
        TN.s2 = TN.s2 > 0 ? 10 : '';
        if (TN.m2 > 0 && TN.m1 == 0) TN.m1 = '';
        if (TN.s2 > 0 && TN.s1 == 0) TN.s1 = '';
    }
}

function setInnerTimeHTML($timer, langType, charType) {

    let minChar, secChar;
    let digitsFont;
    
    if (langType == 'digits') {
        minChar = '분';
        secChar = '초';
        digitsFont = 'font-family: simsun; font-weight: bold';
    }

    else if (langType == 'chinese') {
        if (charType == 'chars') {
            TN.convertTo('chars');

            minChar = '分';
            secChar = '秒';
            $timer.style.fontFamily = 'simkai';
        }

        else if (charType == 'pinyin') {
            TN.convertTo('pinyin');

            minChar = 'fēn';
            secChar = 'miǎo';
            $timer.style.fontFamily = 'NotoSerif-Medium';
            $timer.style.fontSize = `${ getBodyFontSize() / 2 }px`;
        }
    }

    $timer.innerHTML = `
        <div class="outer">
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.m3)}     </div>
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.m2)}     </div>
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.m1)}     </div>
            <div ${timer_HTML_gbase} border-right: none;">                ${txtSpanDarken(minChar)}   </div>
            <div ${timer_HTML_gbase} border-right: none;">                                          </div>
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.s3)}     </div>
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.s2)}     </div>
            <div ${timer_HTML_gbase} border-right: none; ${digitsFont};"> ${txtSpanDarken(TN.s1)}     </div>
            <div ${timer_HTML_gbase}">                                    ${txtSpanDarken(secChar)}   </div>
        </div>
    `;
}
