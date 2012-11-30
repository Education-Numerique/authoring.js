jsBoot.use('jsBoot.types.TypedMutable');
jsBoot.use('jsBoot.types.getPooledMutable');
jsBoot.use('jsBoot.types.ArrayMutable');
jsBoot.use('jsBoot.types.utils');
jsBoot.use('jsBoot.core.Error');
jsBoot.use('LxxlLib.service.activities', true).as('service');
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
    isQRM: false,
    answers: api.ArrayMutable.bind({}, this.Answer)
  });

  this.Page = api.TypedMutable.bind({}, {
    flavor: this.Flavor,
    title: 'Titre par défaut',
    subtitle: '',
    advice: '',
    hasDocument: false,
    document: '',
    tat: '',
    limitedTime: 0,// // 0 == infinity - X seconds = time
    coef: 0,
    sequencing: -1,// -1 = follow through | 0 = random sur la totalité | X = random sur un subset
    displayHoles: false,
    displayHolesRandomly: false, // false = alphabetical, true = random

    displayAll: false,
    questions: api.ArrayMutable.bind({}, this.Question)
  });

  var Activity = api.TypedMutable.bind({}, {
    id: '',
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

  var success = function(){
    console.log('Successful activity creation');
  };

  var failure = function(){
    throw new api.Error('CREATION_FAILURE', 'Failed saving activity to service');
  };

  this.Activity = function(initialMesh){
    var i = new Activity(initialMesh);
    i.pull = function(){
      if(!this.id || !api.service)
        return;
      api.service.read(function(d){
        console.warn("wooo reading data", d);
      }, failure, this.id);
    };

    i.push = function(){
      if(!api.service)
        return;
      if(!this.id){
        api.service.create((function(d){
          this.set('id', d.id);
        }.bind(this)), failure, this.toObject());
      }else{
        var p = this.toObject();
        delete p.id;
        api.service.patch(success, failure, this.id, p);
      }
    };

    var d = i.destroy;
    i.destroy = function(){
      d.apply(this);
      if(!this.id || !api.service)
        return;
      api.service.remove(success, failure, this.id);
      // XXX should reset the object entirely though...
      this.id = null;
    };


    i.seen = function(){
      if(!this.id || !api.service)
        return;
      api.service.seen(success, failure, this.id);
    };

    i.report = function(){
      if(!this.id || !api.service)
        return;
      api.service.report(success, failure, this.id);
    };

    i.seen = function(){
      if(!this.id || !api.service)
        return;
      api.service.seen(success, failure, this.id);
    };

    // Should imply a push
    i.publish = function(){
      if(!this.id || !api.service)
        return;
      api.service.publish(success, failure, this.id);
    };

    i.unpublish = function(){
      if(!this.id || !api.service)
        return;
      api.service.unpublish(success, failure, this.id);
    };

    return i;
  };

  
});