(function() {
  'use strict';
  this.AccountLoginController = Ember.ObjectController.extend({
    tryLogin: function(email, password) {
      LxxlApp.get('router.applicationController').login(email, password);
      // failureCbk(this.ALREADY_USED_NICK);// or facebook
      // console.warn(JSON.stringify(data));
    },

    isAttemptSuccessful: (function() {
      return LxxlApp.get('router.applicationController.status') ==
          LxxlApp.get('router.applicationController.USER_READY');
    }.property('LxxlApp.router.applicationController.status')),

    isAttemptFailed: (function() {
      return LxxlApp.get('router.applicationController.status') ==
          LxxlApp.get('router.applicationController.USER_FAIL');
    }.property('LxxlApp.router.applicationController.status')),

    sendReminder: function(email) {
    }
  });

}).apply(LxxlApp);
