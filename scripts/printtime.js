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

const PTN = { // print time numbers

    m3:0, m2:0, m1:0,
    s3:0, s2:0, s1:0,

    convertTo: (charType) => {
        
        if (charType == 'chars') {
            PTN.m3 = C.c(PTN.m3); PTN.m2 = C.c(PTN.m2); PTN.m1 = C.c(PTN.m1);
            PTN.s3 = C.c(PTN.s3); PTN.s2 = C.c(PTN.s2); PTN.s1 = C.c(PTN.s1);
        }

        else if (charType == 'pinyin') {
            PTN.m3 = C.p(PTN.m3); PTN.m2 = C.p(PTN.m2); PTN.m1 = C.p(PTN.m1);
            PTN.s3 = C.p(PTN.s3); PTN.s2 = C.p(PTN.s2); PTN.s1 = C.p(PTN.s1);
        }
    }
}

function drawInnerTime($timer, langType, charType) {

    const NOW = Math.floor(performance.now() / 1000);
    const REMAINS = TIMEOUT - NOW;

    let min = Math.floor(REMAINS / 60);
    let sec = Math.floor(REMAINS % 60);
    setInnerTime($timer, langType, charType, min, sec);
}

function setInnerTime($timer, langType, charType, min, sec) {

    setInnerTimeChar(langType, min, sec);
    setInnerTimeHTML($timer, langType, charType);
}

function setInnerTimeChar(langType, min, sec) {
    
    if (langType == 'digits') {
        
        PTN.m3 = PTN.s3 = '';
        PTN.m2 = min < 10 ? '' : Math.floor(min / 10);
        PTN.s2 = sec < 10 ? '' : Math.floor(sec / 10);
        PTN.m1 = Math.floor(min % 10);
        PTN.s1 = Math.floor(sec % 10);
    }

    else if (langType == 'chinese') {

        setInnerTimeChar('digits', min, sec);

        PTN.m3 = PTN.m2 > 1 ? PTN.m2 : '';
        PTN.s3 = PTN.s2 > 1 ? PTN.s2 : '';
        PTN.m2 = PTN.m2 > 0 ? 10 : '';
        PTN.s2 = PTN.s2 > 0 ? 10 : '';
        if (PTN.m2 > 0 && PTN.m1 == 0) PTN.m1 = '';
        if (PTN.s2 > 0 && PTN.s1 == 0) PTN.s1 = '';
    }
}

function setInnerTimeHTML($timer, langType, charType) {

    let minChar = '分', secChar = '秒';

    if (langType == 'chinese') {

        if (charType == 'chars')
            PTN.convertTo('chars');

        else if (charType == 'pinyin') {
            PTN.convertTo('pinyin');

            minChar = 'fēn';
            secChar = 'miǎo';
            $timer.style.fontSize = `${ getComputedStyle(document.body).fontSize.slice(0, -2) / 2 }px`;
        }
    }

    $timer.innerHTML = `
        <div class="outer">
            <div class="casing digits"> ${PTN.m3} </div>
            <div class="casing digits"> ${PTN.m2} </div>
            <div class="casing digits"> ${PTN.m1} </div>
            <div class="casing chars">  ${minChar}  </div>
            <div class="casing digits"> </div>
            <div class="casing digits"> ${PTN.s3} </div>
            <div class="casing digits"> ${PTN.s2} </div>
            <div class="casing digits"> ${PTN.s1} </div>
            <div class="casing chars">  ${secChar}  </div>
        </div>
    `;
}