if (window.location.pathname === '/quize.html') {
  //Contries from contriesArray.js
  //Class FlagQuize from classQuize.js

  //Tooltip https://atomiks.github.io/tippyjs/
  tippy('#tip', {
    content: 'Вы можете использовать подсказку. У вас только одна подсказка',
  });

  const btnStartQuize = document.querySelector('#start-quzie');

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuize() {
    const startPage = document.querySelector('#start-page');
    const quizePage = document.querySelector('.quize');
    const flagPlace = document.querySelector('.quize__flag-img');
    const buttons = document.querySelectorAll('.answers__item');
    const btnNextQuestion = document.querySelector('.quize__next-question');
    const time = document.querySelector('.quize__time');
    const answersField = document.querySelector('.answers');

    startPage.style.display = 'none';
    quizePage.style.display = 'block';

    // class FlagQuize {
    //   constructor(options) {
    //     this.contries = shuffleArray(options);
    //     this.counter = 0;
    //   }

    //   generateFlag() {
    //     console.log(this.contries);
    //     console.log(contries[0].flag);
    //     console.log(this.contries[0].flag)
    //     flagPlace.style.backgroundImage = `url("${this.contries[this.counter].flag}")`;
    //   }

    //   generateAnswers() {
    //     console.log(this.counter);
    //     const shuffledContries = shuffleArray(this.contries);
    //     for (let i = 0; i < buttons.length; i++) {
    //       buttons[i].textContent = shuffledContries[i].name;
    //     }

    //     const contriesList = [];
    //     for (const button of buttons) {
    //       contriesList.push(button.textContent);
    //     }
        
    //     console.log(this.contries[this.counter].name);
    //     // if (!contriesList.includes(this.contries[this.counter].name)) {
    //     //   buttons[Math.round(Math.random() * 3)].textContent = this.contries[this.counter].name;
    //     // }
    //   }
    // }
    class FlagQuize {

      constructor(options) {
        // TOKNOW: why array contries changes
        this.contries = options.slice();
        this.counter = 0;

        this.timer();
        shuffleArray(this.contries);
      }

      timer() {
        let seconds = 0;
        let minutes = 0;

        const timerId = setInterval(function(){
          seconds++;
          if (seconds === 60) {
            minutes++;
            seconds = 0;
          }

          //TODO: improve
          if (seconds < 10 && minutes < 10) {
            time.textContent = `Время: 0${minutes}:0${seconds}`;
          } else if (minutes < 10) {
            time.textContent = `Время: 0${minutes}:${seconds}`;
          } else if (minutes > 10 && seconds < 10){
            time.textContent = `Время: ${minutes}:0${seconds}`;
          } else if (minutes === 10) {
            time.textContent = `Время: ${minutes}:0${seconds}`;
          } else {
            time.textContent = `Время: ${minutes}:${seconds}`;
          }
          
          
        }, 1000);
      }

      generateFlag() {
        flagPlace.style.backgroundImage = `url("${this.contries[this.counter].flag}")`;
      }

      generateAnswers() {
        const answersContries = [];

        for (const contry of this.contries) {
          answersContries.push(contry.name);
        }

        shuffleArray(answersContries);
        
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].textContent = answersContries[i];
        }

        
        let rightAnswer;
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i].textContent === this.contries[this.counter].name) {
            rightAnswer = buttons[i];
          }
        }

        
        if (!rightAnswer) {
          rightAnswer = buttons[Math.round(Math.random() * 3)].textContent = this.contries[this.counter].name;
        }
        
        console.log(rightAnswer);
        
        
      }

      checkAnswer() {

        //TODO: use closure
        let thisContries = this.contries;
        let thisCounter = this.counter;

        answersField.addEventListener('click', function(evt) {
          let target = evt.target;

          if (!target.matches('.answers__item')) return;

          console.log(thisContries[thisCounter].name);
          if (target.textContent === thisContries[thisCounter].name) {
            target.style.backgroundColor = '#48E445';
          }
            

          // target.style.backgroundColor = '#FFB800';
        });

        this.counter++;
      }

      endGame() {
        alert('That\'s all');
      }
    }


    const quize = new FlagQuize(contries);
    quize.generateFlag();
    quize.generateAnswers();
    quize.checkAnswer();

    let counter = 0;
    btnNextQuestion.addEventListener('click', function() {
      
      quize.generateFlag();
      quize.generateAnswers();
      
      counter++;
      
      console.log(counter);
      if (counter === 6) {
        quize.endGame();
      }
    });

  }
  btnStartQuize.addEventListener('click', startQuize);
}
