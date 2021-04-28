console.log(document.getElementById('quize-page'));
if (document.getElementById('quize-page')) {
  //Contries from contriesArray.js
  //Class FlagQuize from classQuize.js

  //Tooltip https://atomiks.github.io/tippyjs/
  tippy('#tip', {
    content: 'Вы можете использовать подсказку. У вас только одна подсказка',
  });

  tippy('#usedTip', {
    content: 'Вы уже использовали подсказку!',
  });

  tippy('#time', {
    content: 'Время. Поспешите',
  });

  tippy('.quize__life', {
    content: 'Жизнь'
  });

  tippy('#next-question', {
    content: 'Перейти к следующему вопросу',
  });

  tippy('#finish-game', {
    content: 'Закончить викторину и подвести итоги',
  });

  console.log('click');
  const startPage = document.querySelector('.start-page');
  const quizePage = document.querySelector('.quize');
  const flagPlace = document.querySelector('.quize__flag-img');
  const lifes = document.querySelectorAll('.quize__life');
  const tip = document.getElementById('tip');
  const buttons = document.querySelectorAll('.answers__item');
  const btnNextQuestion = document.querySelector('.quize__next-question');
  const btnFinishGame = document.getElementById('finish-game');
  const time = document.querySelector('.quize__time');
  const answersField = document.querySelector('.answers');
  const btnStartQuize = document.querySelector('#start-quzie');
  const stats = document.querySelector('.stats');

  const totalAnswers = document.querySelector('.table__questions');
  const usedTime = document.querySelector('.table__time');
  const midTime = document.querySelector('.table__mid-time');
  const leftLifes = document.querySelector('.table__left-lifes');

  class FlagQuize {

    constructor(options) {
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
      console.log('class counter: ',this.counter);
      console.log(this.contries);
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
          rightAnswer = buttons[i].textContent;
        }
      }

      
      if (!rightAnswer) {
        rightAnswer = buttons[Math.round(Math.random() * 3)].textContent = this.contries[this.counter].name;
      }
      
      
      console.log(rightAnswer);
      
      this.rightAnswer = rightAnswer;
      this.counter++;
      this.lifes = lifes.length;
    }

    // Uses when user chooses a tip
    showAnswer() {
      buttons.forEach(element => {
        if (element.textContent === this.rightAnswer) {
          element.style.backgroundColor = '#48E445';
          btnNextQuestion.style.display = 'block';
        }
      });
    }

    checkAnswer() {
      
      answersField.addEventListener('click', (evt) => {
        let target = evt.target;

        if (!target.matches('.answers__item')) return;

        console.log(this.rightAnswer);
        if (target.textContent === this.rightAnswer) {
          console.log(target);
          target.style.backgroundColor = '#48E445';
          if (this.counter === 10) {
            btnFinishGame.style.display = 'block'
          } else {
            btnNextQuestion.style.display = 'block';
          }
        } else {
          lifes[this.lifes - 1].style.color = 'white';
          this.lifes--;
          if (this.lifes === 0) {
            this.endGame();
          }
        }
      });
    }

    startGame() {
      this.generateFlag();
      this.generateAnswers();
    }

    showStats() {
      totalAnswers.textContent = this.contries.length;
      usedTime.textContent = time.textContent;
      leftLifes.textContent = this.lifes;
    }

    endGame() {
      stats.style.display = 'block';
      quizePage.style.display = 'none';
      
      this.showStats();
    }
  }

  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuize() {
    startPage.style.display = 'none';
    quizePage.style.display = 'block';

    const quize = new FlagQuize(contries);
    quize.startGame();
    quize.checkAnswer();

    btnNextQuestion.addEventListener('click', function() {
      
      quize.generateFlag();
      quize.generateAnswers();
      

      buttons.forEach(element => {
        element.style.backgroundColor = '#FFB800';
      });
      btnNextQuestion.style.display = 'none';
    });

    btnFinishGame.addEventListener('click', function() {
      quize.endGame();
    });

    // Counter for tips
    let tipCounter = 1;
    tip.addEventListener('click', function() {
      if (tipCounter >= 1) {
        tipCounter--;
        quize.showAnswer();
        console.log(tipCounter);
        tip.id = 'usedTip';
      } else {
        console.log('STOP THIS SHIT!');
      }
    });  


  }
  btnStartQuize.addEventListener('click', startQuize);
}
