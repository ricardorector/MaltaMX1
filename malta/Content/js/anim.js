var textReveal = {
    delay: 300,
    distance: '100px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'left',
    reset: true,
    // container: '.anim'
};

var formReveal = {
    delay: 100,
    // distance : '100px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'left',
    reset: true,
    // container: '.anim'
};

var titleReveal = {
    delay: 300,
    distance: '150px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'left',
    reset: true,
    // container: '.anim'
};

var subnavReveal = {
    delay: 100,
    distance: '150px',
    easing: 'ease-in-out',
    origin: 'top',
    reset: false,
    // container: '.anim'
};

var horaReveal = {
    delay: 300,
    distance: '0px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'left',
    reset: true,
};


var actividadReveal = {
    delay: 300,
    distance: '0px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'right',
    reset: true,
};

var redesReveal = {
    delay: 300,
    distance: '10px',
    easing: 'ease-in-out',
    // rotate   : { z: 20 },
    // scale    : .9,
    origin: 'bottom',
    reset: true,
    container: '.redes'
};

window.sr = ScrollReveal();

sr.reveal('h1', { duration: 500, delay: 300, scale: 0.5, reset: true }, 400);
// sr.reveal('p', { duration: 500, delay: 300}, 400);

sr.reveal('section  p', textReveal);
sr.reveal('section h2', titleReveal);
sr.reveal('section h3', titleReveal);
sr.reveal('section h4', titleReveal);
sr.reveal('section h5', titleReveal);
// sr.reveal('h6', titleReveal);

// sr.reveal('input', formReveal);
// sr.reveal('label', formReveal);

sr.reveal('#custom-nav h2', subnavReveal);

sr.reveal('section li', { duration: 500, delay: 100, reset: true }, 200);
sr.reveal('.redes li', { duration: 500, delay: 300, reset: true }, 400);

sr.reveal('.qualian-especies img', { duration: 500, delay: 100, reset: true }, 200);