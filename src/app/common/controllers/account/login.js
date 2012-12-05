(function() {
  'use strict';
  this.AccountLoginController = Ember.ObjectController.extend({
    tryLogin: function(data, successCbk, failureCbk) {
      successCbk();
      // failureCbk(this.ALREADY_USED_NICK);// or facebook
      // console.warn(JSON.stringify(data));
    },

    sendReminder: function(email) {
    }
  });

}).apply(LxxlApp);
