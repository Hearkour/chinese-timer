/*** Buttons! ***/

const $btn_setTimeout = $('btn-setTimeout');
const $btn_timer = $('btn-timer');
const $btn_resetTime = $('btn-resetTime');
const $btn_border = $('btn-border');
const $btn_color = $('btn-color');
const $btn_wrapper = $('btn-wrapper');
var ispreview = false;

class Button {

    constructor($btnId, description, toggleOff=null, toggleOn=toggleOff, icon1=null, icon2=null) {
        this.$btnId = $btnId;
        this.description = description;

        this.states = [ toggleOff, toggleOn ];
        this.iconName = [ icon1, icon2 ];
        
        this.i = 0;
        if (toggleOff != 'UNSET') this.setupBtn();
    }

    doclick() {
        this.switchState();
        this.setupBtn();
        return this.i;
    }

    switchState() {
        return this.i = this.i ? 0 : 1;
    }

    getState() {
        return this.states[this.i];
    }

    getIconName() {
        return this.iconName[0] == null ? `${this.$btnId.id}` : `${this.$btnId.id}-${this.iconName[this.i]}`;
    }

    setupBtn() {
        this.$btnId.innerHTML = `
            <abbr title='${this.description}'>
                <svg>
                    <use xlink:href="icons/min/${this.getIconName()}.svg#레이어_1"></use>
                </svg>
            </abbr>
        `;
    }
};

var btnSetTimeout   = new Button($btn_setTimeout, '시간 설정',            false,          true,   'edit',  'resume' );
var btnTimer        = new Button($btn_timer,      '타이머 시작/일시 정지', TIMER.isActive, true,   'start', 'stop'   );
var btnResetTime    = new Button($btn_resetTime,  '타이머 초기화',         TIMER.timeout                             );
var btnBorder       = new Button($btn_border,     '윤곽선 숨기기/보이기',  border_alpha,   0,      'none',  'solid'  );
var btnColor        = new Button($btn_color,      '색 선택',              'UNSET'                                   );
var btnWrapper      = new Button($btn_wrapper,    '모서리 모양',          dwrp, !dwrp,    dwrp?'nowrap':'wrap',  dwrp?'wrap':'nowrap' );

btnColor.setupBtn = () => {
    btnColor.$btnId.innerHTML = `
        <abbr title='${btnColor.description}'>
            <div style="position: relative; display: inline-block;">
                <input id="colorpicker" type="color" value="${ColorToHex(getRootStyle('--base-color'))}">
                <label for="colorpicker">
                    <svg id="cpOuter" class="outer">
                        <use xlink:href="icons/min/btn-color-outer.svg#레이어_1"></use>
                    </svg>
                    <svg id="cpInner" class="inner">
                        <use xlink:href="icons/min/btn-color-inner.svg#레이어_1"></use>
                    </svg>
                </label>
            </div>
        </abbr>
    `;
};

btnColor.setupBtn();

$btn_setTimeout.addEventListener('click', function() {
    btnSetTimeout.doclick();
    
    TIMER.editing = btnSetTimeout.getState();
    
    if (TIMER.editing) {
        setRootStyle('--btn-setTime-alpha', `rgba(${baseColor}, ${btnSetTimeAlpha}`);
        if (TIMER.isActive) $btn_timer.click();
        updateInnerTime();
        TIMER.drawPaused = true;
    }
    else {
        if (btnBorder.getState() == 1) setRootStyle('--btn-setTime-alpha', `rgba(${baseColor}, 1`);
        else setRootStyle('--btn-setTime-alpha', `rgba(${baseColor}, ${btnAlpha}`);
        TIMER.timeout = getEditedTime();
        TIMER.reset();
        updateInnerTime();
    }

    if (TIMER.remains < 1) TIMER.remains = TIMER.timeout;
});

$btn_timer.addEventListener('click', function() {

    if (TIMER.editing) TIMER.remains = getEditedTime();

    if (TIMER.remains > 0 || TIMER.isActive) {
        btnTimer.doclick();
        TIMER.isActive = btnTimer.getState();
    }

    if (!TIMER.isActive) {
        TIMER.stoppedTime = getTimeSeconds();
    }

    else {
        if (btnSetTimeout.getState() == true) $btn_setTimeout.click();
        TIMER.initialTime += TIMER.interval;
        
        if (TIMER.drawPaused) { TIMER.drawPaused = false; timerUpdate(); }
    }
});

$btn_resetTime.addEventListener('click', function() {
    TIMER.reset();
});

$btn_border.addEventListener('click', function() {
    btnBorder.doclick();
    setRootStyle('--border-alpha', `rgba(${baseColor}, ${btnBorder.getState()})`);

    if (btnBorder.getState() == 1) {
        setRootStyle('--btn-alpha', `rgba(${baseColor}, 1)`);
        if (btnSetTimeout.getState() == false) setRootStyle('--btn-setTime-alpha', `rgba(${baseColor}, 1`);
    }
    else {
        setRootStyle('--btn-alpha', `rgba(${baseColor}, ${btnAlpha})`);
        if (btnSetTimeout.getState() == false) setRootStyle('--btn-setTime-alpha', `rgba(${baseColor}, ${btnAlpha}`);
    }
});

$btn_color.addEventListener('click', function() {
    ispreview = true;
    previewColor();
});

$('colorpicker').addEventListener('change', function() {
    ispreview = false;
    setNewColor(HexToDecimals($('colorpicker').value));
});

function previewColor() {
    $('cpOuter').style.fill = $('colorpicker').value;
    $('cpOuter').style.filter = `brightness(100%)`;
    $('cpInner').style.fill = $('colorpicker').value;
    $('cpInner').style.filter = `brightness(${txtBrightness})`;

    if (ispreview) requestAnimationFrame(previewColor);
    else {
        $('cpOuter').removeAttribute('style');
        $('cpInner').removeAttribute('style');
    }
}

$btn_wrapper.addEventListener('click', function() {
    btnWrapper.doclick();
    console.log(btnWrapper.getState());
    displayWrapper(wrapperIds, btnWrapper.getState());
});

$select_setTimeout.addEventListener('change', function() {
    if (btnSetTimeout.getState() == true) $btn_setTimeout.click();
    if (TIMER.isActive) $btn_timer.click();
    TIMER.timeout = parseInt($select_setTimeout.value);
    TIMER.reset();
    updateInnerTime();
});
