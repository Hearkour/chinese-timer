/*** Buttons! ***/

const $btn_timer = $('btn-timer');
const $btn_resetTime = $('btn-resetTime');
const $btn_border = $('btn-border');

class Button {

    constructor($btnId, toggleOff, toggleOn=toggleOff, icon1=null, icon2=null) {
        this.$btnId = $btnId;
        this.iconName = [ icon1, icon2 ];
        
        this.i = 0;
        this.state = [ toggleOff, toggleOn ];
        this.setInnerHTML();
    }

    click() {
        this.switchState();
        this.setInnerHTML();
        return this.i;
    }
    
    switchState() {
        return this.i = this.i ? 0 : 1;
    }

    getIconName() {
        return this.iconName[0] == null ? `${this.$btnId.id}` : `${this.$btnId.id}-${this.iconName[this.i]}`;
    }

    setInnerHTML() {
        this.$btnId.innerHTML = `
            <svg style="width: var(--case-size); height: var(--case-size);">
                <use xlink:href="icons/${this.getIconName()}.svg#레이어_1"></use>
            </svg>
        `;
    }
};

var btnTimer = new Button($btn_timer, TIMER.isActive, 1, 'start', 'stop');
var btnResetTime = new Button($btn_resetTime, TIMER.timeout);
var btnBorder = new Button($btn_border, border_alpha, 0, 'none', 'solid');

$btn_timer.addEventListener('click', function() {
    let i = btnTimer.click();
    TIMER.isActive = btnTimer.state[i];

    if (!TIMER.isActive) TIMER.stoppedTime = getTimeSeconds();
    else TIMER.initialTime += TIMER.interval;
});

$btn_resetTime.addEventListener('click', function() {
    TIMER.reset();
});

$btn_border.addEventListener('click', function() {
    let i = btnBorder.click();
    setRootStyle('--border-alpha', `rgba(${baseColor}, ${btnBorder.state[i]})`);
});
