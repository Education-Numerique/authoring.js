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
        activeTat : false,

        didInsertElement : function () {

            var timer = new LxxlLib.utils.Timer(1000, function () {
                if (this.get('value') == this.$().getCode())
                    return;

                this.set('value', this.$().getCode());
            }.bind(this));
            
            var api = this.$();

            
            this.$().redactor({
                imageUpload : this.get('imageUpload'),
                autoresize : this.get('autoresize'),
                air : this.get('air'),
                modal_tat: String() + 
                  '<form id="redactorInsertVideoForm">' +
                    '<label>Word</label>' +
                    '<input id="tat-selection" class="redactor_input" />' +
                    '<label>Clue</label>' +
                    '<input id="tat-clue" class="redactor_input" />' +
                    '<label>Alternatives</label>' +
                    '<input id="tat-alt" class="redactor_input" />' +
                  '</form>' +
                  '<div id="redactor_modal_footer">' +
                    '<span class="redactor_btns_box">' +
                      '<input type="button" id="redactor_insert_video_btn" value="' + RLANG.insert + '" />' +
                      '<input  type="button"  id="tat-untag" value="Supprimer" />' +
                      '<a href="javascript:void(null);" id="redactor_btn_modal_close">' + RLANG.cancel + '</a>' +
                    '</span>' +
                  '</div>',
            });

            if (!('showTat' in api)) {
              Object.getPrototypeOf(api.data('redactor')).showTat = function (e) {
                var $el = $(e.target);
                
                this.modalInit('Texte à trous', 'tat', 600, $.proxy(function()
                  {
                    console.log('=====> showTat', e, $el);
                    if ($el.attr('data-type') == 'tat') {
                      $('#tat-selection').val($el.text());
                      $('#tat-clue').val($el.attr('data-clue'));
                      $('#tat-alt').val($el.attr('data-alt'));
                    } else {
                      this.saveSelection();
                      $('#tat-selection').val(this.getSelectedHtml());
                    }

                    $('#tat-untag').click(function () {
                      $el.replaceWith($el.text());
                      this.observesTat();
                      this.modalClose();
                    }.bind(this));
                    $('#redactor_insert_video_btn').click(function () {
                      this.insertTat($el);
                    }.bind(this));
                  }, this),
                  
                  function()
                  {
                    $('#redactor_insert_video_area').focus();
                  }
                );
              }

              Object.getPrototypeOf(api.data('redactor')).insertTat = function ($el) {
                console.error('???', $el);
                var word = $('#tat-selection').val();
                var clue = $('#tat-clue').val();
                var alts = $('#tat-alt').val();
                var markup = '<a data-type="tat" data-clue="'+this.stripTags(clue)+'" data-alt="'+this.stripTags(alts)+'">'+word+'</a>';

                if ($el.attr('data-type') == 'tat') {
                  $el.replaceWith(markup);
                } else {
                  this.restoreSelection();
                  this.execCommand('inserthtml', markup);
                }
                
                this.observesTat();
                this.modalClose();
              }

              Object.getPrototypeOf(api.data('redactor')).observesTat = function () {

                var showTatAir = function (e) {
                  this.$editor.tatAir.hide();
                  var width = this.$editor.tatAir.innerWidth();
                  var left = e.clientX;
                  
                  if ($(document).width() < (left + width))
                  {
                    left = left - width;
                  }
                  
                  this.$editor.tatAir.css({ left: left + 'px', top: (e.clientY + $(document).scrollTop() + 14) + 'px' }).show();
                  return true;
                }.bind(this);


                var hideTatAir = function () {
                  this.$editor.tatAir.hide();
                }.bind(this);

                if (!this.$editor.tatAir) {
                  this.$editor.tatAir = $('<div class="redactor_air redactor_tat_air" style="">     \
                    <ul class="redactor_toolbar">                                                   \
                      <li>                                                                          \
                        <a href="javascript:void(null);" title="Texte à trous" class="redactor_btn_tat"></a> \
                      </li> \
                    </ul> \
                  </div>');
                  $('body').prepend(this.$editor.tatAir);

                  this.$editor.tatAir.find('a').click(function (e) {
                    this.showTat(e);
                    this.$editor.tatAir.hide();
                  }.bind(this));
                }
                this.$editor.bind('textselect', showTatAir.bind(this));

                this.$editor.bind('textunselect', function (e) {
                  this.$editor.tatAir.hide();
                  return true;
                }.bind(this));

                this.$editor.find('[data-type=tat]').on('click', function(s)
                {
                  this.showTat(s);
                }.bind(this));
              }
            }

            if (this.get('activeTat'))
              api.data('redactor').observesTat();
            
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