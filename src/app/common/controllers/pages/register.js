(function() {
  this.RegisterController = Ember.ObjectController.extend({
    ALREADY_USED_EMAIL: 'email',
    UNKNOWN: 'crap',
    ALREADY_USED_NICK: 'nick',
    tryRegister: function(data, successCbk, failureCbk) {
      successCbk('regular');// or facebook
      // console.warn(JSON.stringify(data));
    }
  });

}).apply(LxxlApp);
