(function() {
  'use strict';

  var t = this.lxxlPageView('account/reminder');

  t.doOnInsert = function() {
    $('#form-wizard').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var email = $('#email').val();
      $('#email-wrapper').removeClass('error');
      $('#creation-error').hide();
      LxxlLib.service.user.reminderRequestPassword(function() {
        LxxlApp.router.accountReminderValidateController.set('content', email);
        LxxlApp.router.transitionTo('account.reminder.validate');
      },
      function() {
        $('#email-wrapper').addClass('error');
        $('#creation-error').show();
      }, email);

      return false;
    });
  };


  this.AccountReminderLookupView = Ember.View.extend(t);

  var t = this.lxxlPageView('account/remindervalidate');

  t.doOnInsert = function() {

    $('#form-wizard').formwizard({
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
            maxlength: 128
          },
          password: {
            required: true,
            minlength: 6,
            maxlength: 25
          },
          password2: {
            required: true,
            equalTo: '#password'
          },
          code: {
            required: true,
            minlength: 16,
            maxlength: 16
          }
        },
        messages: {
          password: 'Vous devez choisir un mot de passe (6 à 25 caractères)',
          password2: {
            required: 'Merci de répéter le mot de passe choisi',
            equalTo: ''
          },
          email: {
            required: 'Merci de fournir votre adresse électronique',
            email: ''
          },
          code: {
            required: 'Merci d\'entrer le code d\'activation que vous avez reçu.',
            minlength: 'Le code contient 16 caractères.'
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



    $('#form-wizard').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var email = $('#email').val();
      var code = $('#code').val();
      var password = $('#password').val();

      $('#email-wrapper').removeClass('error');
      $('#creation-error').hide();
      LxxlLib.service.user.reminderChangePassword(function() {
        $('#success-validation').show();
        $('#form-wizard').hide();
      },
      function(e) {
        var error = ((e.details || {}).data || {}).error;

        if (error == 'unknown user')
          $('#creation-error').html('Aucun compte n\'est associé à cette adresse email').show();
        else if (error == 'wrong code')
          $('#creation-error').html('Ce code n\'est pas valide').show();

      }, email, code, password);

      return false;
    });
  };


  this.AccountReminderValidateView = Ember.View.extend(t);
}).apply(LxxlApp);
