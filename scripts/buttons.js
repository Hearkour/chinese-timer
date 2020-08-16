/*** Buttons! ***/

const $btn_borderVisb = $('btn-borderVisb');

const SP = { // switching (+root) properties
    borderAlpha: [ border_alpha, 0 ],
    btn_borderVisb: [ 'none', 'solid' ], // border btn
    i: 0,
    switch: function() { return SP.i = SP.i ? 0 : 1; }
}

setBorderbtnInner(); // init

function setBorderbtnInner() {
    $btn_borderVisb.innerHTML = `
        <svg style="width: var(--case-size); height: var(--case-size);">
            <use xlink:href="icons/btn-border-${SP.btn_borderVisb[SP.i]}.svg#레이어_1"></use>
        </svg>
    `;
}

$btn_borderVisb.addEventListener('click', function() {
    SP.switch();

    setBorderbtnInner();
    setRootStyle('--border-alpha', `rgba(${baseColor}, ${SP.borderAlpha[SP.i]})`);
});
