/**
 * @file
 * @summary Ember helpers
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/helpers/ember-addons.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';

  if ('undefined' === typeof LxxlLib) {
    window.LxxlLib = {};
  }

  LxxlLib.Ember = LxxlLib.Em = {};
  LxxlLib.utils = {};

  LxxlLib.Em.Checkbox = Em.Checkbox.extend({

    didInsertElement: function() {
      this.$().uniform({'checkboxClass' : this.$().attr('class') + ' checker'});
    },

    checkedUpdate: function() {
      Ember.run.next(this, function() {
        $.uniform.update(this.$());
      });
    }.observes('checked')
  });

  LxxlLib.Em.Select = Em.Select.extend({
    didInsertElement: function() {
      this.$().chosen();
    },

    contentUpdated: function() {
      this.$().trigger('liszt:updated');
    }.observes('content.@each'),

    selectionUpdated: function() {
      this.$().val(this.get('selection.id') || 0);
      this.$().trigger('liszt:updated');
    }.observes('selection')
  });

  Ember.GroupedSelect = Ember.Select.extend({
    classNames: ['ember-grouped-select'],
    multiple: true,
    attributeBindings: ['multiple'],
    defaultTemplate: Ember.Handlebars.compile(
        '{{#if view.prompt}}<option value>{{view.prompt}}</option>{{/if}}{{#each view.content}}' +
        '{{view Ember.SelectOptGroup labelBinding="title" contentBinding="view.content"}}{{/each}}'),
    didInsertElement: function() {
      this.$().chosen();
    },
    contentUpdated: function() {
      this.$().trigger('liszt:updated');
    }.observes('content.@each')
  });

  Ember.SelectOptGroup = Ember.View.extend({
    tagName: 'optgroup',
    classNames: [],
    attributeBindings: ['label'],
    defaultTemplate: Ember.Handlebars.compile(
        '{{#each view.content}}{{view Ember.SelectOption contentBinding="view.content"}}{{/each}}'
    ),

    didInsertElement: function() {
      this.get('parentView').$().trigger('liszt:updated');
    },

    // proxy to the Select
    optionLabelPath: function() {
      return Ember.get(this, 'parentView.optionLabelPath');
    }.property('parentView.optionLabelPath'),
    optionValuePath: function() {
      return Ember.get(this, 'parentView.optionValuePath');
    }.property('parentView.optionValuePath'),
    selection: function() {
      return Ember.get(this, 'parentView.selection');
    }.property('parentView.selection'),
    multiple: function() {
      return Ember.get(this, 'parentView.multiple');
    }.property('parentView.multiple')
  });

  LxxlLib.Em.Wysiwyg = Em.TextArea.extend({
    imageUpload: '/file_upload.php',
    autoresize: true,
    activeTat: false,
    maxLength: null,

    _infoBox: null,

    didInsertElement: function() {

      var timer = new LxxlLib.utils.Timer(500, function() {
        this.updateCharCount();
        if (!this.$())
          return;

        if (this.get('value') == this.$().getCode())
          return;

        this.set('value', this.$().getCode());
      }.bind(this));

      this.$().redactor({
        imageUpload: this.get('imageUpload'),
        autoresize: this.get('autoresize'),
        air: this.get('air'),
        focus: false,
        plugins: ['mathjax', 'tat']
        // modal_tat: String() +
        //     '<form id="redactorInsertVideoForm">' +
        //     '<label>Word</label>' +
        //             '<input id="tat-selection" class="redactor_input" />' +
        //             '<label>Clue</label>' +
        //             '<input id="tat-clue" class="redactor_input" />' +
        //             '<label>Alternatives</label>' +
        //             '<input id="tat-alt" class="redactor_input" />' +
        //     '</form>' +
        //     '<div id="redactor_modal_footer">' +
        //             '<span class="redactor_btns_box">' +
        //     '<input type="button" id="redactor_insert_video_btn" value="' + RLANG.insert + '" />' +
        //     '<input  type="button"  id="tat-untag" value="Supprimer" />' +
        //     '<a href="javascript:void(null);" id="redactor_btn_modal_close">' + RLANG.cancel + '</a>' +
        //             '</span>' +
        //     '</div>',
      });

      var api = this.$().redactor().getObject();

      var editor = this.$().redactor().getEditor();

      $(editor).on('click.mathredactor', '[data-type=math]', function(e) {
        api.getBtn('mathjax').data('target', e.target);
        api.getBtn('mathjax').click();
      });

      $(editor).on('click.tat-click-handler', '[data-type=tat]', function(e) {
        api.getBtn('tat').data('target', e.target);
        api.getBtn('tat').click();
      });



      if (this.get('maxLength') && !this.$().parent().find('.infobox').length) {
        this.$().parent().append('<div class="infobox" />');
        this.set('_infoBox', this.$().parent().find('.infobox'));
      }


      Object.getPrototypeOf(api).observesTat = function() {

        var showTatAir = (function(e) {

          this.$editor.tatAir.hide();

          if (!this.getSelectedHtml().trim())
            return;


          var width = this.$editor.tatAir.innerWidth();
          var left = e.clientX;

          if ($(document).width() < (left + width))
          {
            left = left - width;
          }

          this.$editor.tatAir.css({ left: left + 'px', top: (e.clientY + $(document).scrollTop() +
                14) + 'px' }).show();
          return true;
        }.bind(this));


        var hideTatAir = (function() {
          this.$editor.tatAir.hide();
        }.bind(this));

        if (!this.$editor.tatAir) {
          this.$editor.tatAir = $('<div class="redactor_air redactor_tat_air" style="">' +
              '<ul class="redactor_toolbar">' +
              '<li>' +
              '<a href="javascript:void(null);" title="Texte à trous" class="redactor_btn_tat"></a>' +
              '</li>' +
              '</ul>' +
              '</div>');
          $('body').prepend(this.$editor.tatAir);
          this.$editor.tatAir.hide();

          this.$editor.tatAir.find('a').click(function(e) {
            api.getBtn('tat').click();
            this.$editor.tatAir.hide();
          }.bind(this));
        }
        this.$editor.bind('textselect', showTatAir.bind(this));

        this.$editor.bind('textunselect', function(e) {
          this.$editor.tatAir.hide();
          return true;
        }.bind(this));


      };

      //if (this.get('activeTat'))
      api.observesTat();

      this.updateContent();
      this.updateCharCount();

      this.$().getEditor().focus(function() {
        timer.start();
      });

      this.$().getEditor().focusout(function() {
        timer.stop();
      });

      $(document).focus();
      $(document).blur();

    },

    updateCharCount: function() {
      if (this.get('maxLength') > 0) {
        var len = this.$().getText().trim().length;
        var cnt = this.get('maxLength') - len;

        if (cnt < 0) {
          this.get('_infoBox').removeClass('ok').addClass('ko');
        } else {
          this.get('_infoBox').removeClass('ko').addClass('ok');
        }
        this.get('_infoBox').html('<span>' + cnt + '</span>');
      }
    },


    willDestroyElement: function() {
      if (this.get('state') != 'inDOM' || !this.$().data('redactor'))
        return;

      var value = this.$().getCode();

      var editor = this.$().redactor().getEditor();

      $(editor).unbind('click.mathredactor');

      // if (this.$().getEditor().tatAir)
      //   this.$().getEditor().tatAir.remove();

      // $(document).unbind('click.tat-click-handler');

      this.$().destroyEditor();

      if (this.get('value') == value)
        return;

      this.set('value', value);


    },

    updateContent: function() {
      if (!this.$().data('redactor'))
        return;

      if (this.get('value') == this.$().getCode())
        return;

      this.$().getEditor().html(this.get('value'));
      this.$().data('redactor').syncCode();
    }.observes('value')
  });

  Ember.RadioButton = Ember.View.extend({
    title: null,
    checked: false,
    name: 'radio_button',
    disabled: false,

    classNames: ['ember-radio-button'],

    defaultTemplate: Ember.Handlebars.compile('<label><input type="radio" {{ ' +
        'bindAttr disabled="view.disabled" name="view.name" checked="view.checked"}} />' +
        '{{view.title}}</label>'),

    change: function() {
      Ember.run.once(this, this._updateElementValue);
    },

    upstreamChanged: (function() {
      Ember.run.next(this, function() {
        // this will be executed at the end of the RunLoop, when bindings are synced
        $.uniform.update(this.$('input'));
      });

    }.observes('checked')),

    _updateElementValue: function() {
      this.set('group', this.get('value'));
    }
  });

  LxxlLib.Em.RadioButton = Em.RadioButton.extend({

    didInsertElement: function() {
      this.$('input').uniform();
    }
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
    };

    this.stop = function() {
      status = 0;
      clearTimeout(ref);
    };

  });

})();
