const progressContainer = document.querySelector('.progress-container');

if (progressContainer) {
  window.addEventListener('scroll', scrollIndicator);

  function scrollIndicator() {
    if (document.documentElement.scrollTop === 0) {
      progressContainer.style.display = 'none';
    } else {
      progressContainer.style.display = 'block';

    }
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('myBar').style.width = scrolled + '%';
  }  
}
