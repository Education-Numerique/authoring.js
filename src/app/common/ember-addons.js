(function() {

    if ('undefined' === typeof LxxlLib) {
      window.LxxlLib = {};
    }

    LxxlLib.Ember = LxxlLib.Em = {};
    LxxlLib.utils = {};

    LxxlLib.Em.Checkbox = Em.Checkbox.extend({

        didInsertElement : function () {
            this.$().uniform();
        }
    });

    LxxlLib.Em.Wysiwyg = Em.TextArea.extend({
        imageUpload: '/file_upload.php',
        autoresize: true,

        didInsertElement : function () {
            var timer = new LxxlLib.utils.Timer(1000, function () {
                if (this.get('value') == this.$().getCode())
                    return;

                this.set('value', this.$().getCode());
            }.bind(this));

            this.$().redactor({
                imageUpload : this.get('imageUpload'),
                autoresize : this.get('autoresize')
            });
            this.updateContent();

            this.$().getEditor().focus(function () {
                timer.start();
            });

            this.$().getEditor().focusout(function () {
                timer.stop();
            });

        },

        updateContent : function () {
            if (this.get('value') == this.$().getCode())
                return;

            this.$().setCode(this.get('value'));
            $(document).focus();
        }.observes('value')
    });


    LxxlLib.utils.poll = function(condition, callback, limit) {
        var delay = 1;
        var pos = 0;
        var poller = function() {
          if (condition()) {
            callback.onSuccess();
            return;
          }
          if (pos > limit) {
            callback.onTimeout();
            return;
          }
          pos++;
          window.setTimeout(poller, delay);
        };
        poller();
      };

    LxxlLib.utils.Timer = (function(delay, callback) {
        var ref = null;
        var status = 0;

        var poller = function() {
          if (status != 1)
            return;

          callback();
          ref = window.setTimeout(poller, delay);
        };

        this.start = function() {
          if (status == 1)
            return;

          status = 1;
          poller();
        }

        this.stop = function() {
          status = 0;
          clearTimeout(ref);
        }

      });

})();