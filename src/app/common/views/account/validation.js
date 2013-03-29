(function() {
  'use strict';
  var t = this.lxxlPageView('account/validation');

  t.doOnInsert = function() {

    $('#email').val(window.prefillHack['email']);
    $('#code').val(window.prefillHack['code']);
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
          code: {
            required: true,
            minlength: 16,
            maxlength: 16
          }
        },
        messages: {
          code: {
            required: 'Merci d\'entrer le code d\'activation que vous avez reçu.',
            minlength: 'Le code contient 16 caractères.'
          },

          email: {
            required: 'Merci de fournir votre adresse électronique.',
            email: ''
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

    $('#form-wizard').submit();

  };

  this.AccountValidationView = Ember.View.extend(t);
}).apply(LxxlApp);
