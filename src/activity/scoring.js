(function() {
  'use strict';

  window.LxxlScoring = {};
  
  // Mix&Match / Glisser Déposer
  LxxlScoring.mixScore = function(total) {
    console.warn('[MM Score] creating', total);
    var penalty = 0;

    this.addPenalty = function() {
      penalty++;
      console.warn('[MM Score] penalty increment to', penalty);
    };

    this.getResult = function(correct) {
      console.warn('[TAT Score] result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };
  };

  // Texte à trous
  LxxlScoring.tatScore = function(total) {
    console.warn('[TAT Score] creating score for total:', total);
    var penalty = 0;

    this.addPenalty = function() {
      penalty++;
      console.warn('[TAT Score] penalty increment to', penalty);
    };

    this.getResult = function(correct) {
      console.warn('[TAT Score] result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };

  };

  // Hotpot code is impossible to understand. Penalties are defined, but never used.
  // Feedback doesn't work in some cases.
  // Scoring doesn't make sense in other cases.
  // The number of tries is used against the total number of good questions, but as QCM and QRM are not implemented
  // like that, the formula doesn't make sense in the context of the app:
  // ((TotAns-((Tries*100)/State[QNum][3]))/(TotAns-1));
  //
  // Conclusion:
  // - being wrong on a question means you loose half the remaining possible point for that question
  // - not answering at all



  // Quizz
  LxxlScoring.questionScore = function(nbAnswers) {
    console.warn('[QUIZZ Score] creating score for total:', nbAnswers);
    var points = nbAnswers;
    var isAnswered = false;

    this.markAnswered = function() {
      isAnswered = true;
    };

    this.addPenalty = function() {
      console.warn('[QUIZZ Score] penalty for wrong answer');
      points /= 2;
    };

    this.getResult = function() {
      console.warn('[QUIZZ Score] returning total');
      return isAnswered ? (points / nbAnswers * 100) : 0;
    };
  };


  LxxlScoring.quizzScore = function(total) {
    this.qna = [];
    for (var x = 0; x < total; x++) {
      this.qna[x] = new this.questionScore();
    }

    console.warn('[QUIZZ Score] creating score for quizz total', total);

    this.getResult = function() {
      var result;
      this.qna.forEach(function(q) {
        result += q.getResult();
      });
      result /= total * 100;
      console.warn('[QUIZZ Score] result, correct', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(result);
    };
  };


})();
