class Question {
  text: string;
  choices: Array<string>;
  answer: string;

  constructor(text: string, choices: Array<string>, answer: string) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isAnswerCorrect(userChoice: string) {
    return (this.answer = userChoice);
  }
}

class Quiz {
  text: string;
  score: number;
  questions: Array<any>;
  currentQuestionIndex: number;
  constructor(questions: Array<any>) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  submitAnswer(userChoice: string) {
    if (this.getCurrentQuestion().answer === userChoice) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Display functions

const display = {
  /**
   * Write HTML in Element
   * @param {string} elementId
   * @param {string} innerText
   */
  showElement: function (elementId: string, innerText: string) {
    const element = document.getElementById(elementId);
    element.innerHTML = innerText;
  },
  /**
   * Show result screen
   */
  endGame: function () {
    this.showElement(
      "quiz",
      `<h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`
    );
  },
  /**
   * Show current question
   */
  showQuestion: function () {
    this.showElement("question", quiz.getCurrentQuestion().text);
  },
  handleClick: function (id: string, submittedAnswer: string) {
    document.getElementById(id).onclick = () => {
      quiz.submitAnswer(submittedAnswer);
      app.init();
    };
  },
  showChoices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    for (let i = 0; i < choices.length; i++) {
      this.showElement("choice" + i, choices[i]);
      this.handleClick("guess" + i, choices[i]);
    }
  },
};

const app = {
  init: function () {
    if (quiz.hasEnded()) {
      display.endGame();
    } else {
      display.showQuestion();
      display.showChoices();
    }
  },
};

let questions = [
  new Question(
    "Quelle est la vitesse maximale qu’un chat peut atteindre en courant ?",
    ["60 Km/h ", "50 Km/h", "37 Km/h", "35 Km/h"],
    "50 Km/h"
  ),
  new Question(
    "Pourquoi se mettent-ils toujours dans des boîtes en carton ?",
    [
      "Pour voyager avec la Poste",
      "Parce que ça les rassurent",
      "Pour se cacher",
      "Parce qu'ils voudraientt être livreur",
    ],
    "Parce que ça les rassurent"
  ),
  new Question(
    "Combien le chat dort-il en moyenne d'heures par jour ?",
    ["8 à 10", "10 à 15", "15 à 18", "18 à 20"],
    "15 à 18"
  ),
  new Question(
    "Quelle race de chats adore se baigner ?",
    [
      "Le Siamois",
      "le chat todo",
      "Le chat turc du lac de Van",
      "Le chat des forêts norvégiennes",
    ],
    "Le chat turc du lac de Van"
  ),
];

const quiz = new Quiz(questions);

// document.addEventListener("domContentLoaded", app.init);

app.init();
