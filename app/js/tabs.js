const info = document.querySelector('.info'),
      tabs = document.querySelectorAll('.info__header-tab'),
      tabContent = document.querySelectorAll('.info__tab-content'),
      currentTab = document.querySelectorAll('.header-tab__current-element');
if (info) {
  function hideTabContent(a) {
    currentTab[0].style.width = 100 + '%';

    for (let i = a; i < tabs.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }

    currentTab.forEach(element => {
      element.style.animation = 'removeUnderlineTab 0.5s ease forwards';
    });
    currentTab[b].style.animation = 'AddUnderlineTab 0.5s ease forwards';
  }

  info.addEventListener('click', function(evt) {
    const target = evt.target;

    //TODO: Improve
    if (target && !target.matches('.info')) {
      if (target.matches('.info-header__tab')) {
        tabs.forEach((element, index) => {
          if (target === element) {
            hideTabContent(0);
            showTabContent(index);
          }
        });        
      } else {
        let trg = target.closest('.info__header-tab');
        tabs.forEach((element, index) => {
          if (trg === element) {
            hideTabContent(0);
            showTabContent(index);
          }
        });
      }

    }
  });  
}
