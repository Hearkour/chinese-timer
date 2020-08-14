/*** Buttons! ***/

const $border = $('border');

const sp = { // switching (root) properties
    opab: [ border_opacity, 0 ],
    bbtn: bbtn_content, // border btn
    i: 0,
    switch: function() { return sp.i = sp.i ? 0 : 1; }
}

$border.innerHTML = sp.bbtn[0];

$border.addEventListener('click', function() {
    let i = sp.switch();

    setRootStyle('--border-opacity', sp.opab[i]);
    $border.innerHTML = sp.bbtn[i];
});
