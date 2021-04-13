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