(function() {
  'use strict';
  var t = this.lxxlPageView('account/validation');

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
            maxlength: 25
          },
          code: {
            required: true,
            minlength: 16,
            maxlength: 16
          }
        },
        messages: {
          code: {
            required: 'Merci de fournir un le code d\'activation',
            minlength: 'Le code doit contenir 16 caractères'
          },

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

    $('#form-wizard').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $('#form-wizard input').attr('disabled', 'disabled');
      var email = $('#email').val();
      var code = $('#code').val();


      this.get('controller').tryValidate(email, code, function() {
        $('#success-validation').fadeIn();
        $('#form-wizard').hide();
      }, function(error) {
        $('#form-wizard input').removeAttr('disabled');
        switch (error) {
          case this.get('controller').INVALID_EMAIL:
            $('#creation-error').html(
                'Cette adresse email n\'existe pas');
            $('#creation-error').fadeTo(1000, 1);
            break;
          case this.get('controller').INVALID_CODE:
            // XXX maybe do something here
            $('#creation-error').html('Ce code est invalide');
            $('#creation-error').fadeTo(1000, 1);
            break;
          default:
            $('#creation-error').html(
                'Malheur! Quelque chose n\'a pas fonctionné correctement. Merci de réessayer plus tard...');
            $('#creation-error').fadeTo(1000, 1);
            break;
        }
      }.bind(this));
      return false;
    }.bind(this));
  };

  this.AccountValidationView = Ember.View.extend(t);
}).apply(LxxlApp);
