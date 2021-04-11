
function navSlide() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list__item');
    
    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle('toggle');
    });
    
}

navSlide();
const buttons = document.querySelectorAll('.ripple-link');

buttons.forEach(btn => {
    btn.addEventListener('click', function(evt) {
        let x = evt.clientX - evt.target.offsetLeft;
        let y = evt.clientY - evt.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.classList.add('ripple-effect');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        btn.appendChild(ripples);
        
        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });
});
//# sourceMappingURL=app.js.map