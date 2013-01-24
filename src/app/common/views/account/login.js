(function() {
  'use strict';
  var t = this.lxxlPageView('account/login');

  t.doOnInsert = function() {
    $('#loginform').formwizard({
      formPluginEnabled: false,
      validationEnabled: true,
      focusFirstInput: true,
      disableUIStyles: true,

      validationOptions: {
        rules: {
          email: {
            required: true,
            email: true,
            minlength: 4,
            maxlength: 45
          },
          password: {
            required: true,
            minlength: 6,
            maxlength: 25
          }
        },
        messages: {
          password: 'Le mot de passe contient de 6 à 25 caractères',
          email: {
            required: 'Merci de fournir votre email',
            email: 'Le format d\'email correct est nom@domaine.com'
          }
        },
        errorClass: 'help-inline',
        errorElement: 'span',
        highlight: function(element/*, errorClass, validClass*/) {
          $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element/*, errorClass, validClass*/) {
          $(element).parents('.control-group').removeClass('error');
        }
      }
    });

    this.get('controller').addObserver('isAttemptFailed', function() {
      if (!!this.get('controller.isAttemptFailed'))
        $('.login-error-box').fadeIn().delay(3000).fadeOut();
    }.bind(this));

    this.get('controller').addObserver('isAttemptSuccessful', function() {
      if (!!this.get('controller.isAttemptSuccessful')) {
        Ember.run.next(function() {
          LxxlApp.get('router').transitionTo('dashboard');
        });
      }
    }.bind(this));

    // switch(appc.get('status')){
    //   case appc.USER_READY:
    //   break;
    //   case appc.USER_FAIL:
    //   break;
    // }

    $('#loginform').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.get('controller').tryLogin($('#email').val(), $('#password').val());
      return false;
    }.bind(this));
  };


  this.AccountLoginView = Ember.View.extend(t);
}).apply(LxxlApp);
