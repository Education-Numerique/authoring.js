(function() {
  'use strict';
  var t = this.lxxlPageView('account/register');

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
            maxlength: 256
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
          eula: 'required',
          username: {
            required: true,
            minlength: 5,
            maxlength: 25
          }
        },
        messages: {
          username: {
            required: 'Merci de fournir un nom d\'utilisateur',
            minlength: jQuery.format('Minimum {0} caractères')
          },
          password: 'Vous devez choisir un mot de passe (6 à 25 caractères)',
          password2: {
            required: 'Merci de répéter le mot de passe choisi',
            equalTo: 'Le mot de passe saisi est différent'
          },
          email: {
            required: 'Merci de fournir votre email',
            email: 'Le format d\'email correct est nom@domaine.com'
          },
          eula: 'Vous devez accepter les conditions générales'
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

    $('#form-wizard').bind('step_shown', function(e, state) {
      var currentStep = 0;

      state.steps.each(function(i, item) {
        if (item.id == state.currentStep)
          currentStep = i + 1;
      });

      var percent = (currentStep) / (state.steps.length + 1) * 100;
      $('#register-progress').width(percent + '%');
    });


    $('#form-wizard').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $('#form-wizard input').attr('disabled', 'disabled');
      var submitor = {};

      var form = document.getElementsByTagName('form')[0];
      var item;
      for (var i = 0; i < form.length; i++) {
        item = form[i];

        if (item.name == 'discipline') {
          submitor[item.name] = {id : item.value, title: $(item).find('option[value='+item.value+']').text()};
        }
        else if ((item.name != 'Submit') && (item.name != 'Back'))
          submitor[item.name] = item.value; 
      }
      
      this.get('controller').tryRegister(submitor, onsuccess, onfailure);

      return false;
    }.bind(this));

    var onfailure = (function(error) {
      switch (error) {
        case this.get('controller').ALREADY_USED_NICK:
          $('#creation-error').html(
              'Le nom d\'utilisateur choisi existe déjà. Merci d\'en choisir un autre.');
          $('#creation-error').fadeTo(1000, 1, function() {
            $(this).fadeTo(10000, 0, function() {
              $(this).hide();
            });
            $('#form-wizard').formwizard('show', 'step-basic');
          });
          break;
        case this.get('controller').ALREADY_USED_EMAIL:
          // XXX maybe do something here
          $('#creation-error').html('Cet email a déjà été utilisé pour créer un compte.');
          $('#creation-error').fadeTo(1000, 1);
          $('#form-wizard').formwizard('show', 'step-regular');
          break;
        default:
        case this.get('controller').UNKNOWN:
          $('#creation-error').html(
              'Malheur! Quelque chose n\'a pas fonctionné correctement. Merci de réessayer plus tard...');
          $('#creation-error').fadeTo(1000, 1);
          break;
      }
    }.bind(this));

    var onsuccess = (function(type) {
      $('#register-progress').width('100%');
      $('#form-wizard').fadeTo(500, 0, function() {
        $(this).hide();
      });

      if (type == 'regular') {
        $('#success-regular').fadeTo(500, 1);
        return;
      }

    }.bind(this));

  };

  this.AccountRegisterView = Ember.View.extend(t);
}).apply(LxxlApp);
