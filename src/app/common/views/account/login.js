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
            minlength: 6,
            maxlength: 25
          },
          password: {
            required: true,
            minlength: 6,
            maxlength: 25
          }
        },
        messages: {
          password: 'Vous devez choisir un mot de passe',
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

    $('#loginform').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.get('controller').tryLogin($('#email').val(), $('#password').val(), function(){
            LxxlApp.get('router').transitionTo('account.profile');
        }, function () {
            $('.login-error-box').fadeIn().delay(3000).fadeOut();
        });
        return false;
    }.bind(this));
  };


  this.AccountLoginView = Ember.View.extend(t);
}).apply(LxxlApp);
