(function() {
  'use strict';
  var t = this.lxxlPageView('account/profile');

  t.canDelete = function() {
    if (LxxlApp.get('router.applicationController.user.uid') == this.get('controller.content.uid'))
      return false;

    return LxxlApp.get('router.applicationController.isAdmin');
  }.property('content.uid');


  t.deactivateUser = function() {
    console.warn('BAMMMMMMMM');

    LxxlLib.service.user.deactivate(Em.K, Em.K, this.get('controller.content.uid'));
    LxxlApp.router.transitionTo('sandbox');
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
  };

  this.ProfileView = Ember.View.extend(t);


}).apply(LxxlApp);
