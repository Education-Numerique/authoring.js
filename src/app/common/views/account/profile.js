(function() {
  'use strict';
  var t = this.lxxlPageView('account/profile');


  t.doOnInsert = function () {
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
  };

  this.ProfileView = Ember.View.extend(t);


}).apply(LxxlApp);
