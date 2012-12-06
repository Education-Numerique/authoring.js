(function() {
  'use strict';
  this.AccountLoginController = Ember.ObjectController.extend({
    tryLogin: function(email, password, successCbk, failureCbk) {
      LxxlApp.get('router.meController').login(email, password, successCbk, failureCbk);
      // failureCbk(this.ALREADY_USED_NICK);// or facebook
      // console.warn(JSON.stringify(data));
    },

    sendReminder: function(email) {
    }
  });

}).apply(LxxlApp);
