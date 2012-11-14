jsBoot.use('jsBoot.types.TypedMutable');
jsBoot.use('jsBoot.types.getPooledMutable');
jsBoot.use('jsBoot.types.ArrayMutable');
jsBoot.use('jsBoot.types.utils');
jsBoot.pack('LxxlLib.model', function(api) {
  'use strict';

  this.Matter = api.getPooledMutable({
    id: '',
    title: ''
  });

  this.Level = api.getPooledMutable({
    id: '',
    title: ''
  });

  this.Length = api.getPooledMutable({
    id: 0,
    title: ''
  });

  this.Difficulty = api.getPooledMutable({
    id: '',
    title: ''
  });

  // Tricky deviation to handle the nesting concept of Categories
  // Having directly content: this.Category obviously wouldn't work
  var dirty = this;
  var categoriesList = api.ArrayMutable.bind({}, function(m){
    return new dirty.Category(m);
  });

  this.Category = api.TypedMutable.bind({}, {
    id: '',
    title: '',
    matter: this.Matter,
    level: this.Level,
    content: categoriesList
  });







  this.Answer = api.TypedMutable.bind({}, {
    text: '',
    comment: '',
    isCorrect: false,
    weight: 0
  });

  this.Question = api.TypedMutable.bind({}, {
    coef: 0,
    text: '',
    // XXX shit
    answers: api.ArrayMutable
  });



});