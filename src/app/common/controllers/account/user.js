(function() {
  'use strict';
  this.UserController = Ember.ObjectController.extend({
    _forceRefreshAvatar: null,

    save: function() {
      var d = this.get('content').toObject().profile;
      LxxlLib.service.user.profile.push(Em.K, Em.K, d, this.get('content.uid'));
    },

    discipline: (function(key, value) {
      if (value)
        this.set('content.profile.discipline', value);

      var current = this.get('content.profile.discipline');
      if (!current)
        return {id: '', title: ''};

      return LxxlLib.factories.metadata.discipline.filter(function(i) {
        return (i.id == current.id);
      }).pop();
    }).property('content.profile'),

    disciplines: Em.Object.create({
      content: LxxlLib.factories.metadata.discipline
    }),

    avatar: (function() {
      if (!this.get('content.hasAvatar'))
        return false;

      var bust = (this.get('_forceRefreshAvatar') ? '?bust=' + this.get('_forceRefreshAvatar') : '');
      return LxxlLib.service.user.avatar.getUrl(this.get('content.uid')) + bust;
    }.property('content.uid', 'content.hasAvatar', '_forceRefreshAvatar')),

    setAvatar: function(blob) {
      LxxlLib.service.user.avatar.push(function() {
        this.set('_forceRefreshAvatar', new Date().getTime());
        this.set('content.hasAvatar', true);
      }.bind(this), function() {

      }, blob, this.get('content.uid'));
    }
  });

}).apply(LxxlApp);
