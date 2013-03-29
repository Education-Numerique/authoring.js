(function(){
  'use strict';

  window.LxxlScoring = {};
  LxxlScoring.mixScore = function(total){
    console.warn('[MM Score] creqting', total);
    var penalty = 0;

    this.addPenalty = function(){
      penalty++;
      console.warn('[MM Score] penalty increment to', penalty);
    };

    this.getResult = function(correct){
      console.warn('[TAT Score] Tat result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };
  };

  LxxlScoring.tatScore = function(total){
    console.warn('[TAT Score] Creating score for TAT total:', total);
    var penalty = 0;

    this.addPenalty = function(){
      penalty++;
      console.warn('[TAT Score] penalty increment to', penalty);
    };

    this.getResult = function(correct){
      console.warn('[TAT Score] Tat result, correct:', correct, 'total:', total, 'penalties:', penalty);
      return Math.round(Math.max(correct - penalty, 0) / total * 100);
    };

  };


})();
