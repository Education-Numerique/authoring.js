(function() {
  'use strict';
  this.AccountValidationController = Ember.ObjectController.extend({
    INVALID_CODE: 1,
    INVALID_EMAIL: 2,

    tryValidate: function(email, code, success, fail) {
      jsBoot.service.account.validate(function() {
        success();
      }, function(xhr, e) {
        if (e.error.indexOf('code') != -1)
          fail(this.INVALID_CODE);
        else
          fail(this.INVALID_EMAIL);
      }.bind(this), email, code);
    }
  });

}).apply(LxxlApp);
