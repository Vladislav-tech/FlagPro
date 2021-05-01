try {
    const buttonsRipple = document.querySelectorAll('.ripple');

    buttonsRipple.forEach(btnRipple => {
        btnRipple.addEventListener('click', function(evt) {
            let x = evt.clientX - evt.target.offsetLeft;
            let y = evt.clientY - evt.target.offsetTop;
    
            let ripples = document.createElement('span');
            ripples.classList.add('ripple-effect');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            btnRipple.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });
    
}
catch (e) {
    console.warn(e);
}