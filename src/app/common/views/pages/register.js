(function() {
  var t = this.lxxlPageView('register');

  t.doOnInsert = function() {
    $('#form-wizard').formwizard({
      formPluginEnabled: true,
      validationEnabled: true,
      focusFirstInput: true,
      disableUIStyles: true,
      /*
      formOptions :{
        success: function(data){
          $("#status").fadeTo(500,1,function(){
            $(this).html("<span>Form was submitted!</span>").fadeTo(5000, 0);
          })
        },
        beforeSubmit: function(data){
          $("#submitted").html("<span>Form was submitted with ajax. Data sent to the server: " +
          $.param(data) + "</span>");
        },
        dataType: 'json',
        resetForm: true
      },
      */
      validationOptions: {
        rules: {
          email: {
            required: true,
            email: true
          },
          password: 'required',
          password2: {
            required: true,
            equalTo: '#password'
          },
          eula: 'required',
          username: 'required'
        },
        messages: {
          username: "Merci de fournir un nom d'utilisateur",
          password: 'Vous devez choisir un mot de passe',
          password2: {
            required: 'Merci de répéter le mot de passe choisi',
            equalTo: 'Le mot de passe saisi est différent'
          },
          email: {
            required: 'Merci de fournir votre email',
            email: "Le format d'email correct est nom@domaine.com"
          },
          eula: 'Vous devez accepter les conditions générales'
        },
        errorClass: 'help-inline',
        errorElement: 'span',
        highlight: function(element, errorClass, validClass) {
          $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parents('.control-group').removeClass('error');
        }
      }
    });

    var setProgress = function(c) {
      if (!c)
        c = ($('#form-wizard').formwizard('state').activatedSteps.length - 1) / 4 * 100;
      if (!c)
        c = 5;
      $('#register-progress').width(c + '%');
      if (c < 20)
        $('.form-actions').hide();
    };

    $('#next,#back').on('click', setProgress);

    $('#register-regular').on('click', function() {
      $('#form-wizard').formwizard('show', 'step-regular');
      $('.form-actions').show();
      setProgress();
    });

    $('#register-facebook').on('click', function() {
      $('#form-wizard').formwizard('show', 'step-facebook');
      $('.form-actions').show();
      setProgress();
    });

    $('.form-actions').hide();
    // XXX debugging
    // $('#form-wizard').formwizard('show', 'step-conclusion');


    $('#form-wizard').on('submit', function() {
      $('#form-wizard input').attr('disabled', 'disabled');
      // XXX do the actual registration
      // console.warn($('#form-wizard').formwizard('state'));
      var submitor = {};
      Array.prototype.forEach.call(document.getElementsByTagName('form')[0], function(item) {
        if ((item.name != 'Submit') && (item.name != 'Back'))
          submitor[item.name] = item.value;
      });
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
          $('#creation-error').fadeTo(1000, 1/*, function(){
            $(this).fadeTo(10000, 0, function(){
              $(this).hide();
            });
          }*/);
          break;
        default:
        case this.get('controller').UNKNOWN:
          $('#creation-error').html(
              'Something went wrong on the server side. Sorry. Please try again later.');
          $('#creation-error').fadeTo(1000, 1);
          break;
      }
    }.bind(this));

    var onsuccess = (function(type) {
      setProgress(100);
      $('#form-wizard').fadeTo(500, 0, function() {
        $(this).hide();
      });
      $.gritter.add({
        title: 'Compte créé',
        text: 'Votre compte a bien été créé. Vous recevrez sous peu un mail de validation.',
        // image:  'assets/demo/envelope.png',
        sticky: false
      });
      if (type == 'regular') {
        $('#success-regular').fadeTo(500, 1);
        return;
      }
      $('#success-facebook').fadeTo(500, 1, function() {
        $(this).fadeTo(2000, 0.9, function() {
          // XXX navigate login page
        });
      });


    }.bind(this));

  };

  this.RegisterView = Ember.View.extend(t);
}).apply(LxxlApp);
