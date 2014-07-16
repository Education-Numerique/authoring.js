(function() {
  'use strict';

  window.LxxlScoring = {};

  // Mix&Match / Glisser Déposer
  LxxlScoring.mixScore = function(total) {
    console.warn('[scoring.js mixScore] creating', total);
    var penalty = 0;

    this.addPenalty = function() {
      penalty++;
      console.warn('[scoring.js mixScore] penalty increment to', penalty);
    };

    this.getResult = function(correct) {
      console.warn('[scoring.js mixScore] result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };
  };

  // Texte a trous
  LxxlScoring.tatScore = function(total) {
    console.warn('[scoring.js tatScore] creating score for total:', total);
    var penalty = 0;

    this.addPenalty = function() {
      penalty++;
      console.warn('[scoring.js tatScore] penalty increment to', penalty);
    };

    this.getResult = function(correct) {
      console.warn('[scoring.js tatScore] result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };

  };

  // QUIZ (QRM/QCM)
  LxxlScoring.questionScore = function(nbAnswers) {
    console.warn('[scoring.js questionScore] creating score for total:', nbAnswers);
    var points = nbAnswers;
    var isAnswered = false;

    this.markAnswered = function() {
      isAnswered = true;
    };

    this.addPenalty = function() {
      console.warn('[scoring.js questionScore] penalty for wrong answer');
      points /= 2;
    };

    this.getResult = function() {
      console.warn('[scoring.js questionScore] returning total');
      return isAnswered ? (points / nbAnswers * 100) : 0;
    };
  };


  LxxlScoring.quizzScore = function(total) {
    this.qna = [];
    for (var x = 0; x < total; x++) {
      this.qna[x] = new this.questionScore();
    }

    console.warn('[scoring.js quizzScore] creating score for quizz total', total);

    this.getResult = function() {
      var result;
      this.qna.forEach(function(q) {
        result += q.getResult();
      });
      result /= total * 100;
      console.warn('[scoring.js quizzScore] result, correct', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(result);
    };
  };


})();
