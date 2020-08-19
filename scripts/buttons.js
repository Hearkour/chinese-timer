/*** Buttons! ***/

const $btn_timer = $('btn-timer');
const $btn_resetTime = $('btn-resetTime');
const $btn_border = $('btn-border');
const $btn_setTimeout = $('btn-setTimeout');

class Button {

    constructor($btnId, toggleOff, toggleOn=toggleOff, icon1=null, icon2=null) {
        this.$btnId = $btnId;
        this.iconName = [ icon1, icon2 ];
        
        this.i = 0;
        this.states = [ toggleOff, toggleOn ];
        this.setIcon();
    }

    doclick() {
        this.switchState();
        this.setIcon();
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

    setIcon() {
        this.$btnId.innerHTML = `
            <svg style="width: var(--case-size); height: var(--case-size);">
                <use xlink:href="icons/${this.getIconName()}.svg#레이어_1"></use>
            </svg>
        `;
    }
};

var btnSetTimeout   = new Button($btn_setTimeout, false,          true,   'edit',  'resume' );
var btnTimer        = new Button($btn_timer,      TIMER.isActive, true,   'start', 'stop'   );
var btnResetTime    = new Button($btn_resetTime,  TIMER.timeout                             );
var btnBorder       = new Button($btn_border,     border_alpha,   0,      'none',  'solid'  );

$btn_setTimeout.addEventListener('click', function() {
    btnSetTimeout.doclick();
    
    editing = btnSetTimeout.getState();
    
    if (editing) {
        if (TIMER.isActive) $btn_timer.click();
        updateInnerTime();
        TIMER.drawPaused = true;
    }
    else {
        TIMER.timeout = getEditedTime();
        TIMER.reset();
        updateInnerTime();
    }
});

$btn_timer.addEventListener('click', function() {
    btnTimer.doclick();
    
    TIMER.isActive = btnTimer.getState();
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
});
