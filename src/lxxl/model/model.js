jsBoot.use('jsBoot.types.TypedMutable');
jsBoot.use('jsBoot.types.getPooledMutable');
jsBoot.use('jsBoot.types.ArrayMutable');
jsBoot.use('jsBoot.types.utils');
jsBoot.pack('LxxlLib.model', function(api) {
  'use strict';

  /**
   * This is the base model describing activities metadata
   */

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

  this.Flavor = api.getPooledMutable({
    id: '',
    title: ''
  });

  var catDescriptor = {
    id: 0,
    title: '',
    matter: this.Matter,
    level: this.Level
  };

  this.Category = api.getPooledMutable(catDescriptor);
  // Mutate the descriptor to workaround the loop problem
  catDescriptor.content = api.ArrayMutable.bind({}, this.Category);


  /**
   * This is the activity model itself
   */
  this.Answer = api.TypedMutable.bind({}, {
    text: '',
    comment: '',
    isCorrect: false,
    weight: 0
  });

  this.Question = api.TypedMutable.bind({}, {
    coef: 0,
    text: '',
    answers: api.ArrayMutable.bind({}, this.Answer)
  });

  this.Page = api.TypedMutable.bind({}, {
    flavor: this.Flavor,
    title: 'Titre par défaut',
    subtitle: '',
    advice: '',
    document: '',
    limitedTime: 0,// // 0 == infinity - X seconds = time
    coef: 0,
    sequencing: -1,// -1 = follow through | 0 = random sur la totalité | X = random sur un subset
    displayAll: false,
    questions: api.ArrayMutable.bind({}, this.Question)
  });

  this.Activity = api.TypedMutable.bind({}, {
    id: 0,
    title: '',
    description: '',
    level: new this.Level({id: 'other'}),
    matter: new this.Matter({id: 'other'}),
    duration: new this.Length({id: 0}),
    difficulty: new this.Difficulty({id: 'easy'}),
    category: api.ArrayMutable.bind({}, this.Category),
    thumbnail: null,
    pages: api.ArrayMutable.bind({}, this.Page)
  });

});
