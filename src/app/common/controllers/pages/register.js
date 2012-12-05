(function() {
  'use strict';
  this.RegisterController = Ember.ObjectController.extend({
    ALREADY_USED_EMAIL: 'email',
    UNKNOWN: 'crap',
    ALREADY_USED_NICK: 'nick',
    tryRegister: function(data, successCbk, failureCbk) {
      console.log('======>', data);
      jsBoot.service.account.create(function() {
        successCbk('regular');
      }.bind(this), function(xhr, error) {
        if (error.error.duplicate && error.error.duplicate == 'email')
          failureCbk(this.ALREADY_USED_EMAIL);
        else if (error.error.duplicate && error.error.duplicate == 'username')
          failureCbk(this.ALREADY_USED_NICK);
        else
          failureCbk(this.UNKNOWN);
      }.bind(this), data.username, data.email, data.password);
      // successCbk('regular');// or facebook
      //failureCbk(this.ALREADY_USED_EMAIL);// or facebook
      // console.warn(JSON.stringify(data));
    }
  });

}).apply(LxxlApp);
