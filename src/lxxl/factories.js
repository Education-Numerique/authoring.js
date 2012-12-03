jsBoot.use('LxxlLib.model.defines');
jsBoot.use('LxxlLib.model');
jsBoot.pack('LxxlLib.factories', function(api) {
  'use strict';

  this.activities = new (function() {
    this.getActivity = function(mesh) {
      mesh = mesh || {};
      return new api.model.Activity(mesh);
    };

    this.getById = function(id) {
      var ret = new api.model.Activity({id: id});
      var p1 = new api.model.Page({flavor: {id: 'simple'}});
      var p2 = new api.model.Page({flavor: {id: 'quizz'}});
      var p3 = new api.model.Page({flavor: {id: 'tat'}});
      ret.pages.pushObject(p1);
      ret.pages.pushObject(p2);
      ret.pages.pushObject(p3);
      return ret;
    };
  })();

  this.metadata = new (function() {
    var lv = api.defines.levels;
    var mt = api.defines.matters;
    var le = api.defines.lengths;
    var di = api.defines.difficulties;
    var fl = api.defines.flavors;

    this.matters = Object.keys(mt).map(function(id) {
      return new api.model.Matter({id: id, title: mt[id]});
    });

    this.levels = Object.keys(lv).map(function(id) {
      return new api.model.Level({id: id, title: lv[id]});
    });

    this.lengths = Object.keys(le).map(function(id) {
      return new api.model.Length({id: id, title: le[id]});
    });

    this.flavors = Object.keys(fl).map(function(id) {
      return new api.model.Flavor({id: id, title: fl[id]});
    });

    this.difficulties = Object.keys(di).map(function(id) {
      return new api.model.Difficulty({id: id, title: di[id]});
    });

    var categories = api.defines.categories.map(function(item) {
      return new api.model.Category(item);
    });

    this.getTreeFor = function(matter, level) {
      if ((matter == '*') && (level == '*'))
        return categories;
      return categories.filter(function(item) {
        return (item.level.id == level) && (item.matter.id == matter);
      }).pop();
    };
  })();
});
