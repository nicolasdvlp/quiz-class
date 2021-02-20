var Question = /** @class */ (function () {
    function Question(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    Question.prototype.isAnswerCorrect = function (userChoice) {
        return (this.answer = userChoice);
    };
    return Question;
}());
var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    Quiz.prototype.getCurrentQuestion = function () {
        return this.questions[this.currentQuestionIndex];
    };
    Quiz.prototype.submitAnswer = function (userChoice) {
        if (this.getCurrentQuestion().answer === userChoice) {
            this.score++;
        }
        this.currentQuestionIndex++;
    };
    Quiz.prototype.hasEnded = function () {
        return this.currentQuestionIndex >= this.questions.length;
    };
    return Quiz;
}());
// Display functions
var display = {
    /**
     * Write HTML in Element
     * @param {string} elementId
     * @param {string} innerText
     */
    showElement: function (elementId, innerText) {
        var element = document.getElementById(elementId);
        element.innerHTML = innerText;
    },
    /**
     * Show result screen
     */
    endGame: function () {
        this.showElement("quiz", "<h1>Quiz termin\u00E9 !</h1>\n      <h3> Votre score est de : " + quiz.score + " / " + quiz.questions.length + "</h3>");
    },
    /**
     * Show current question
     */
    showQuestion: function () {
        this.showElement("question", quiz.getCurrentQuestion().text);
    },
    handleClick: function (id, submittedAnswer) {
        document.getElementById(id).onclick = function () {
            quiz.submitAnswer(submittedAnswer);
            app.init();
        };
    },
    showChoices: function () {
        var choices = quiz.getCurrentQuestion().choices;
        for (var i = 0; i < choices.length; i++) {
            this.showElement("choice" + i, choices[i]);
            this.handleClick("guess" + i, choices[i]);
        }
    }
};
var app = {
    init: function () {
        if (quiz.hasEnded()) {
            display.endGame();
        }
        else {
            display.showQuestion();
            display.showChoices();
        }
    }
};
var questions = [
    new Question("Quelle est la vitesse maximale qu’un chat peut atteindre en courant ?", ["60 Km/h ", "50 Km/h", "37 Km/h", "35 Km/h"], "50 Km/h"),
    new Question("Pourquoi se mettent-ils toujours dans des boîtes en carton ?", [
        "Pour voyager avec la Poste",
        "Parce que ça les rassurent",
        "Pour se cacher",
        "Parce qu'ils voudraientt être livreur",
    ], "Parce que ça les rassurent"),
    new Question("Combien le chat dort-il en moyenne d'heures par jour ?", ["8 à 10", "10 à 15", "15 à 18", "18 à 20"], "15 à 18"),
    new Question("Quelle race de chats adore se baigner ?", [
        "Le Siamois",
        "le chat todo",
        "Le chat turc du lac de Van",
        "Le chat des forêts norvégiennes",
    ], "Le chat turc du lac de Van"),
];
var quiz = new Quiz(questions);
// document.addEventListener("domContentLoaded", app.init);
app.init();
