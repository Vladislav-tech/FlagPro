if (document.getElementById('quize-page')) {
  console.log('quize');
  const btnStart = document.getElementById('start');

  const contries = [
    {
      flag: '../img/dist/flags/USA.svg',
      name: 'США',
      facts: [],
      population: 329957441,
      capital: 'Вашингтон',
      currency: 'Американский доллар',
    },
    
    {
      flag: '../img/dist/flags/Canada.svg',
      name: 'Канада',
      facts: [],
      population: 38588930,
      capital: 'Оттава',
      currency: 'Канадский доллар',
    },

    {
      flag: '../img/dist/flags/France.svg',
      name: 'Франция',
      facts: [],
      population: 68859599,
      capital: 'Париж',
      currency: 'Евро',
    },

    {
      flag: '../img/dist/flags/Germany.svg',
      name: 'Германия',
      facts: [],
      population: 83149300,
      capital: 'Берлин',
      currency: 'Евро',
    },

    {
      flag: '../img/dist/flags/Russia.svg',
      name: 'Россия',
      facts: [],
      population: 146238185,
      capital: 'Москва',
      currency: 'Рубль',
    },

    {
      flag: '../img/dist/flags/UK.svg',
      name: 'Великобритания',
      facts: [],
      population: 66647112,
      capital: 'Лондон',
      currency: 'Фунт стерлингов',
    },
  ];

  const contriesNamesList = [
  'США', 'Россия', 'Великобритания', 
  'Германия', 'Франция', 'Люксембург', 
  'Китай', 'Япония', 'Канада', 'Польша', 
  'Испания'
  ];

  function shuffleArray(arr) {
    let j, temp;

      for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
	return arr;
  }

  class FlagQuize {
    constructor(options) {
      this.contries = shuffleArray(options.contries);
    }

    generateFlag() {
      const flagPlace = document.querySelector('.quize__flag-img');
      console.log(this.contries);
      flagPlace.style.backgroundImage = `url("${this.contries[0].flag}")`;
      console.log(this.contries[0].flag);
      
    }

    generateAnswers() {
      const buttons = document.querySelectorAll('.answers-list__item');
      let uniqueСontries = shuffleArray(contriesNamesList);

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = uniqueСontries[i];
      }

      let rightAnswer = buttons[Math.round(Math.random() * 3)];
      rightAnswer.dataset.right = 'true';
      rightAnswer.textContent = this.contries[0].name;
    }
  }



  btnStart.addEventListener('click', function() {
    const startQuizeSection = document.querySelector('.start');
    const quizeMainPage = document.querySelector('.quize');
    const quizeMainInfo = document.querySelector('.quize-info');

    btnStart.style.display = 'none';
    startQuizeSection.style.display = 'none';
    quizeMainPage.style.display = 'block';
    quizeMainInfo.style.display = 'block';

    const quize = new FlagQuize({
      contries: contries,
    });
  
    console.log(quize.generateFlag());
    quize.generateAnswers();

    if (window.innerWidth <= 848) {
      const lifes = document.querySelectorAll('.life-md');
      const timeField = document.querySelector('.quize__time-field');
      console.log(lifes, window.innerWidth);
    } else {
      const lifes = document.querySelectorAll('.life-xl');
      const timeField = document.querySelector('.quize-info__time-field_xl');
      console.log(timeField);
      console.log(lifes, window.innerWidth);
    }
    
  });
} else {
  console.log('not quize');
}