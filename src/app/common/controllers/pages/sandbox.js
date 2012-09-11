(function() {
  this.SandboxController = Ember.ObjectController.extend({
    qti: (function(){
      var ret = [
        {author: "Roger Doe", title: 'Stuff', category: 'Anglais pas littéraire'},
        {author: "Jane Doe", title: 'Stuff 2', category: 'Maths'}
      ];
      for(var x = 0; x < 150; x++)
        ret.push({author: 'Roger', title: 'Stuff' + x, category: 'Maths > ' + Math.random()});
      return ret;
    })()
  });

}).apply(LxxlApp);
