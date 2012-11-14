jsBoot.use('LxxlLib.model.defines');
jsBoot.use('LxxlLib.model');
jsBoot.pack('LxxlLib.factories', function(api) {
  'use strict';

  this.metadata = new (function() {
    var lv = api.defines.levels;
    var mt = api.defines.matters;
    var le = api.defines.lengths;
    var di = api.defines.difficulties;
    var cat = api.defines.categories;

    this.matters = Object.keys(mt).map(function(id) {
      return new api.model.Matter({id: id, title: mt[id]});
    });

    this.levels = Object.keys(lv).map(function(id) {
      return new api.model.Level({id: id, title: lv[id]});
    });

    this.lengths = Object.keys(le).map(function(id) {
      return new api.model.Length({id: id, title: le[id]});
    });

    this.difficulties = Object.keys(di).map(function(id) {
      return new api.model.Difficulty({id: id, title: di[id]});
    });


    var categories = cat.map(function(item){
      return new api.model.Category(item);
    });

    this.getTreeFor = function(matter, level) {
      if(!matter && !level)
        return categories;
      return categories.filter(function(item) {
        return (item.level.id == level) && (item.matter.id == matter);
      }).pop();
    };
  })();
});