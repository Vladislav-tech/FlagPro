if (document.getElementById('quiz-page')) {
  //Contries from contriesArray.js

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

  tippy('.quiz__life', {
    content: 'Жизнь'
  });

  tippy('#finish-game', {
    content: 'Закончить викторину и подвести итоги',
  });

  tippy("#questions", {
    content: 'Информация по вопросам',
  });

  tippy("#time", {
    content: 'Информация по времени',
  });

  tippy("#score", {
    content: 'Заработанные баллы',
  });

  tippy("#info", {
    content: 'Общая информация',
  });

  const startPage = document.querySelector('.start-page');
  const quizPage = document.querySelector('.quiz');
  const flagPlace = document.querySelector('.quiz__flag-img');
  const lifes = document.querySelectorAll('.quiz__life');
  const tip = document.getElementById('tip');
  const buttons = document.querySelectorAll('.answers__item');
  const btnFinishGame = document.getElementById('finish-game');

  let timeMinutes = document.getElementById('minutes');
  let timeSeconds = document.getElementById('seconds');
  const answersField = document.querySelector('.answers');
  const btnStartquiz = document.querySelector('#start-quzie');
  const stats = document.querySelector('.stats');

  const totalQuestions = document.querySelector('.tab-content__total-questions');
  const finishedQuestions = document.querySelector('.tab-content__finished-questions');
  const usedTime = document.querySelector('.tab-content__spend-time');
  const totalTime = document.querySelector('.tab-content__total-time');
  const midTime = document.querySelector('.tab-content__mid-time');
  const leftLifes = document.querySelector('.table__left-lifes');

  const progressbar = document.querySelector('.quiz__progressbar-fill');
  const progressbarPercent = document.querySelector('.quiz__progressbar-percent');

  const difficultyLevel = document.getElementById('levels');

  progressbar.style.width = 0 + '%';

  class FlagQuiz {

    constructor(options) {
      this.difficultyLevel = Number(options.difficultyLevel);

      // Get contries with neccesary level and make copy
      this.contries = options.contries.filter(element => {
        return element.level <= this.difficultyLevel;
      }).slice();
      this.counter = 0;

      console.log('level: ', this.difficultyLevel);
      this._timer();
      shuffleArray(this.contries);
    }
    
    //Defines time for game
    _setTime() {
      switch(this.difficultyLevel) {
        case 1:
          // this.gameTime uses ms
          this.gameTime = 45000;
          break;
        case 2:
          this.gameTime = 100000;
          break;
        case 3:
          this.gameTime = 160000;
          break;
        case 4:
          this.gameTime = 220000;
          break;
        default:
          throw new Error('there is no time');
      }
    }

    //Format time in ms and returns seconds and minutes as string
    _formatTime(ms) {
      const total = {
        ms: 0,
        sec: 0,
        min: 0,
        formatted: null,
      };

      if (!isFinite(ms)) {
        total.formatted = '00: 00';
        return total;
      }

      const seconds = Math.floor((ms / 1000) % 60),
          minutes = Math.floor((ms / 1000 / 60) % 60);


      // Add zeros if it needs
      if (String(seconds).length < 2) {
        total.sec = `0${String(seconds)}`;
      } else {
        total.sec = String(seconds);
      }

      if (String(minutes).length < 2) {
        total.min = `0${String(minutes)}`;
      } else {
        total.min = String(minutes);
      }

      total.ms = ms;
      total.formatted = `${total.min}: ${total.sec}`;
      return total;
    }

    _timer() {
      this._setTime();
      
      let ms = 0;
      let seconds = 0;
      let minutes = 0;

      let time = () => {
        ms += 1000;
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / 1000 / 60) % 60);
        
        timeSeconds.textContent = seconds;
        // Show zeros if it needs
        if (timeSeconds.textContent.length < 2) {
          timeSeconds.textContent = `0${seconds}`;
        }
        timeMinutes.textContent = minutes;
        //Show zeros if it needs
        if (timeMinutes.textContent.length < 2) {
          timeMinutes.textContent = `0${minutes}`;
        }

        if (ms === this.gameTime) {
          this.endGame();
          return;
        }

        // Stop counting if the game was over
        if (this.finishedGame) {
          return;
        }

        this.ms = ms;
        timerId = setTimeout(time, 1000);
      };
      let timerId = setTimeout(time, 1000);

    }

    _generateFlag() {
      console.log('class counter: ', this.counter);
      console.log(this.contries);

      flagPlace.style.backgroundImage = `url("${this.contries[this.counter].flag}")`;
    }

    _generateAnswers() {
      // Array of contry names
      const answersContries = [];

      for (const contry of this.contries) {
        answersContries.push(contry.name);
      }

      shuffleArray(answersContries);
      
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = answersContries[i];
      }

      
      let rightAnswer;
      // If buttons contain right answer  assign it
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === this.contries[this.counter].name) {
          rightAnswer = buttons[i].textContent;
        }
      }

      // If there is no right answer take random button and contain there
      if (!rightAnswer) {
        rightAnswer = buttons[Math.round(Math.random() * 3)].textContent = this.contries[this.counter].name;
      }
      
      console.log(rightAnswer);
      
      this.rightAnswer = rightAnswer;
      this.lifes = lifes.length;
    }

    // Uses when user chooses a tip
    showAnswer() {
      if (this.counter === this.contries.length) {
        console.log('last question');
      } else {
        buttons.forEach(element => {
          if (element.textContent === this.rightAnswer) {
            element.style.backgroundColor = '#48E445';
            setTimeout(() => {
              this._nextQuestion();
            }, 600);
          }
        });
      }
    }

    checkAnswer() {      
      answersField.addEventListener('click', (evt) => {
        let target = evt.target;
        if (!target.matches('.answers__item')) return;

        if (target.textContent === this.rightAnswer) {
          target.style.backgroundColor = '#48E445';

          if (this.counter < this.contries.length - 1) {
            setTimeout(()=> {
              this._nextQuestion();
            }, 600);
          } else {
            this.counter++;
            console.log(this.counter);

            // Need to stop progressbar bigger than 100
            if (parseInt(progressbar.style.width) < 100) {
              progressbar.style.width = Math.floor(this.counter / this.contries.length * 100) + '%';
              progressbarPercent.textContent = Math.floor(this.counter / this.contries.length * 100) + '%';
            }
      
            // Property to stop count time in this.timer
            this.finishedGame = true;

            btnFinishGame.style.display = 'block';
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
      this._generateFlag();
      this._generateAnswers();
    }

    _nextQuestion() {
      this.counter++;
      this._generateFlag();
      this._generateAnswers();
      buttons.forEach(button => {
        button.style.backgroundColor = '#FFB800';
      });

      // Need to stop progressbar bigger than 100
      if (parseInt(progressbar.style.width) < 100) {
        progressbar.style.width = Math.floor(this.counter / this.contries.length * 100) + '%';
        progressbarPercent.textContent = Math.floor(this.counter / this.contries.length * 100) + '%';
      }
    }

    _showStats() {
      totalQuestions.textContent = this.contries.length;
      finishedQuestions.textContent = this.counter;
      usedTime.textContent = timeMinutes.textContent + ': ' + timeSeconds.textContent;
      totalTime.textContent = this._formatTime(this.gameTime).formatted;

      const midTimeMs = this.ms / this.counter;
      midTime.textContent = this._formatTime(midTimeMs).formatted;

      // leftLifes.textContent = this.lifes;
    }

    endGame() {
      stats.style.display = 'flex';
      quizPage.style.display = 'none';
      
      this._showStats();
    }
  }

  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuiz() {
    startPage.style.display = 'none';
    quizPage.style.display = 'block';

    const quiz = new FlagQuiz({
      contries: contries,
      difficultyLevel: difficultyLevel.value,
    });
    quiz.startGame();
    quiz.checkAnswer();

    btnFinishGame.addEventListener('click', function() {
      quiz.endGame();
    });

    // Counter for tips
    let tipCounter = 1;
    tip.addEventListener('click', function() {
      if (tipCounter >= 1) {
        tipCounter--;
        quiz.showAnswer();
        console.log(tipCounter);
        tip.id = 'usedTip';
      } else {
        // TODO: change tooltip
        console.log('Need to change tooltip on lamp');
      }
    });  


  }
  btnStartquiz.addEventListener('click', startQuiz);
}
