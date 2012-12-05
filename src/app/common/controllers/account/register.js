(function() {
  'use strict';
  this.AccountRegisterController = Ember.ObjectController.extend({
    ALREADY_USED_EMAIL: 'email',
    UNKNOWN: 'crap',
    ALREADY_USED_NICK: 'nick',
    tryRegister: function(data, successCbk, failureCbk) {
      var profile = {};

      for (var key in data) {
        if (['','username', 'email', 'password', 'password2'].indexOf(key) != -1)
          continue;
        
        profile[key] = data[key];
      }

      jsBoot.service.account.create(function() {
        successCbk('regular');
      }.bind(this), function(xhr, error) {
        if (error.error.duplicate && error.error.duplicate == 'email')
          failureCbk(this.ALREADY_USED_EMAIL);
        else if (error.error.duplicate && error.error.duplicate == 'username')
          failureCbk(this.ALREADY_USED_NICK);
        else
          failureCbk(this.UNKNOWN);
      }.bind(this), data.username, data.email, data.password, profile);
      // successCbk('regular');// or facebook
      //failureCbk(this.ALREADY_USED_EMAIL);// or facebook
      // console.warn(JSON.stringify(data));
    }
  });

}).apply(LxxlApp);
