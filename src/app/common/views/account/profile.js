(function() {
  'use strict';
  var t = this.lxxlPageView('account/profile');

  t.canDelete = (function() {
    if (LxxlApp.get('router.applicationController.user.uid') == this.get('controller.content.uid'))
      return false;

    return LxxlApp.get('router.applicationController.isAdmin');
  }.property('content.uid'));


  t.deactivateUser = function() {
    console.warn('BAMMMMMMMM');

    LxxlLib.service.user.deactivate(Em.K, Em.K, this.get('controller.content.uid'));
    LxxlApp.router.transitionTo('dashboard');
  };

  t.doOnInsert = function() {
    var self = this;
    $('#fileupload').fileupload();
    $('#fileupload').fileupload('option', {
      dropZone: this.$('.thumbnail-uploader .dropzone')[0],
      limitMultiFileUploads: 1,
      // maxFileSize: 5000000,
      // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      process: [
        {
                  action: 'load',
                  fileTypes: /^image\/(gif|jpeg|png)$/,
                  maxFileSize: 20000000 // 20MB
        },
        {
                  action: 'resize',
                  maxWidth: 800,
                  maxHeight: 800,
                  minWidth: 40,
                  minHeight: 40
        },
        {
                  action: 'save'
        }
      ],
      add: function(e, data) {
        $(this).fileupload('process', data).done(function() {
          self.get('controller').setAvatar(data.files[0]);
        });
      }

    });

    $('#profile-form').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.get('controller').save();

      LxxlApp.router.transitionTo('dashboard');

      return false;
    }.bind(this));


    $('#password-form').formwizard({
      formPluginEnabled: false,
      validationEnabled: true,
      focusFirstInput: false,
      disableUIStyles: true,
      textSubmit: 'Changer mon mot de passe',
      textNext: 'Changer mon mot de passe',

      validationOptions: {
        rules: {

          password: {
            required: true,
            minlength: 6,
            maxlength: 25
          },
          password2: {
            required: true,
            equalTo: '#password'
          }

        },
        messages: {
          password: 'Vous devez choisir un mot de passe (6 à 25 caractères)',
          password2: {
            required: 'Merci de répéter le mot de passe choisi',
            equalTo: 'Merci de répéter le mot de passe choisi'
          }
        },
        errorClass: 'help-inline',
        errorElement: 'span',
        highlight: function(element/*, errorClass, validClass*/) {
          $('#password-form input[type=submit]').attr('disabled', 'disabled');
          $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element/*, errorClass, validClass*/) {
          $(element).parents('.control-group').removeClass('error');
          $('#password-form input[type=submit]').removeAttr('disabled');
        }
      }
    });



    $('#password-form').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.warn('change pwd', $('#password').val());
      LxxlLib.service.user.changePassword(Em.K, Em.K, this.get('controller.content.uid'), $('#password').val());
      var me = LxxlApp.get('router.applicationController.user.email');

      if (LxxlApp.get('router.applicationController.user.uid') == this.get('controller.content.uid')) {
        jsBoot.controllers.application.logout();
        window.setTimeout(function() {
          jsBoot.controllers.application.login(me, $('#password').val(), true);
          LxxlApp.router.transitionTo('dashboard');
        }, 600);
      }
      return false;
    }.bind(this));
  };

  this.ProfileView = Ember.View.extend(t);


}).apply(LxxlApp);
