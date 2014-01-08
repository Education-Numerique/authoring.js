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

(function () {
    /*because of chosen...*/
    /*jshint camelcase:false*/
    'use strict';

    if ('undefined' === typeof LxxlLib) {
        window.LxxlLib = {};
    }

    LxxlLib.Ember = LxxlLib.Em = {};
    LxxlLib.utils = {};
    LxxlLib.Em.TextField = Em.TextField.extend({
        attributeBindings: ['min', 'max']
    });
    LxxlLib.Em.Checkbox = Em.Checkbox.extend({

        didInsertElement: function () {
            this.$().uniform({'checkboxClass': this.$().attr('class') + ' checker'});
        },

        checkedUpdate: function () {
            Ember.run.next(this, function () {
                $.uniform.update(this.$());
            });
        }.observes('checked')
    });

    LxxlLib.Em.Select = Em.Select.extend({
        didInsertElement: function () {
            this.$().chosen({
                max_selected_options: 3
            });
        },

        contentUpdated: function () {
            this.$().trigger('liszt:updated');
        }.observes('content.@each'),

        selectionUpdated: function () {
            if (!this.get('selection.id'))
                return;

            this.$().val(this.get('selection.id'));
            this.$().trigger('liszt:updated');
        }.observes('selection')
    });

    Ember.GroupedSelect = Ember.CollectionView.extend({
        classNames: ['ember-grouped-select'],
        tagName: 'select',
        multiple: true,
        _forceRefresh: 0,
        rawContent: [],
        _rawSelection: [],

        attributeBindings: ['multiple'],
        itemViewClass: Em.View.extend({
            tagName: 'option',
            attributeBindings: ['content.value:value', 'content.selected:selected'],
            classNameBindings: ['content.className'],

            defaultTemplate: Ember.Handlebars.compile('{{unbound view.content.title}}')
        }),

        didInsertElement: function () {
            this.$().chosen({
                max_selected_options: 3
            });

            this.set('_forceRefresh', new Date().getTime());
        },

        _getObjectFromId: function (id) {
            var c = this.get('rawContent');
            var result = null;
            var BreakException = {};
            try {
                c.forEach(function (item) {
                    if (item.id == id) {
                        result = item;
                        throw BreakException;
                    }

                    if (item.content && item.content.length) {
                        item.content.forEach(function (subitem) {
                            if (subitem.id == id) {
                                result = subitem;
                                throw BreakException;
                            }
                        });
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }

            return result;
        },

        _isSelected: function (search) {
            if (!this.get('selection.length'))
                return false;

            var c = this.get('selection');
            var result = false;

            c.forEach(function (item) {
                if (item.id == search.id)
                    result = true;
            });
            return result;
        },


        change: function (/*e*/) {
            var options = this.$('option:selected'),
                content = this.get('rawContent'),
                selection = this.get('selection');

            if (!content) {
                return;
            }
            if (options) {
                var selectedIndexes = options.map(function () {
                    return $(this).attr('value');
                }).toArray();

                var newSelection = [];

                selectedIndexes.forEach(function (item) {
                    newSelection.pushObject(this._getObjectFromId(item));
                }, this);

                if (Em.isArray(selection)) {
                    Em.EnumerableUtils.replace(selection, 0, selection.get('length'), newSelection);
                } else {
                    this.set('selection', newSelection);
                }
            }

        },

        content: (function (key, value) {
            // console.log('================== content init', arguments);
            // if (arguments.length === 1) {
            //   var value = this.get('_rawContent');
            // } else {
            //   console.error('****** set content', value);
            //   this.set('_rawContent', value);

            // }

            // XXX ????
            value = this.get('rawContent');
            // XXX ????
            var c = value;
            var list = [];

            if (!c)
                return [];

            c.forEach(function (item) {
                list.pushObject({
                    title: item.title,
                    value: item.id,
                    className: 'group-result',
                    selected: this._isSelected(item)
                });

                if (item.content && item.content.length) {
                    item.content.forEach(function (subitem) {
                        list.pushObject({
                            title: subitem.title,
                            value: subitem.id,
                            className: 'active-result',
                            selected: this._isSelected(subitem)
                        });
                    }, this);
                }
            }, this);

            return list;
        }.property('rawContent', '_forceRefresh')),


        contentUpdated: function () {
            Ember.run.next(this, function () {
                if (this.get('state') == 'inDOM')
                    this.$().trigger('liszt:updated');
            });

        }.observes('content.@each')
    });

    LxxlLib.Em.Wysiwyg = Em.TextArea.extend({
        autoresize: true,
        plugins: '',
        maxLength: null,
        air: false,
        oneLine: false,

        buttons: '',

        _infoBox: null,
        _timer: null,

        didInsertElement: function () {
            var plugins, buttons;
            plugins = buttons = [];

            if (this.get('plugins').trim()) {
                plugins = this.get('plugins').trim().split(',').filter(function (item) {
                    return !!item.trim();
                }).map(function (item) {
                        return item.trim().toLowerCase();
                    });
            }

            if (this.get('buttons').trim()) {
                buttons = this.get('buttons').trim().split(',').filter(function (item) {
                    return !!item.trim();
                }).map(function (item) {
                        return item.trim().toLowerCase();
                    });
            }

            if (!buttons.length) {
                buttons = ['formatting', '|', 'bold', 'italic', 'deleted', '|',
                    'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                    'video', 'file', 'table', 'link', '|',
                    'fontcolor', 'backcolor', '|', 'alignment', '|', 'horizontalrule'];
            }
            if (LxxlApp.get('router.applicationController.isAdmin'))
                buttons.push('html');

            this._timer = new LxxlLib.utils.Timer(500, function () {

                if (this.get('state') != 'inDOM')
                    return;

                this.updateCharCount();

                if (this.get('value') == this.$().getCode())
                    return;

                this.set('value', this.$().getCode());
            }.bind(this));


            this.$().redactor({
                lang: 'fr',
                imageUpload: true,
                autoresize: this.get('autoresize'),
                air: this.get('air'),
                focus: false,
                plugins: plugins,
                airButtons: ['bold', 'italic'],
                buttons: buttons
            });


            var api = this.$().redactor().getObject();

            var editor = this.$().redactor().getEditor();

            if (this.get('oneLine')) {
                editor.parent().addClass('one-line');
            }


            if (this.get('maxLength') && !this.$().parent().find('.infobox').length) {
                this.$().parent().append('<div class="infobox" />');
                this.set('_infoBox', this.$().parent().find('.infobox'));
            }


            // BEGIN of "Text à trous" plugin
            Object.getPrototypeOf(api).observesTat = function () {
                var showTatAir = (function (e) {
                    ensureTatAir();
                    this.$editor.tatAir.hide();

                    if (!this.getSelectedHtml().trim())
                        return;


                    var width = this.$editor.tatAir.innerWidth();
                    var left = e.clientX;

                    if ($(document).width() < (left + width)) {
                        left = left - width;
                    }

                    this.$editor.tatAir.css({ left: left + 'px', top: (e.clientY + $(document).scrollTop() +
                        14) + 'px' }).show();
                    return true;
                }.bind(this));


                // var hideTatAir = (function() {
                //   ensureTatAir();
                //   this.$editor.tatAir.hide();
                // }.bind(this));

                var ensureTatAir = (function () {
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

                        this.$editor.tatAir.find('a').click(function (/*e*/) {
                            api.getBtn('tat').click();
                            this.$editor.tatAir.hide();
                        }.bind(this));
                    }
                }.bind(this));

                this.$editor.bind('textselect', showTatAir.bind(this));

                this.$editor.bind('textunselect', function (/*e*/) {
                    this.$editor.tatAir.hide();
                    return true;
                }.bind(this));


            };


            if (plugins.indexOf('tat') != -1) {
                $(editor).on('click.tat-click-handler', '[data-type=tat]', function (e) {
                    api.getBtn('tat').data('target', e.target);
                    api.getBtn('tat').click();
                });
                api.observesTat();

            }
            // END of "Text à trous" plugin


            if (plugins.indexOf('mathjax') != -1) {
                $(editor).on('click.mathredactor', '[data-type=math]', function (e) {
                    api.getBtn('mathjax').data('target', e.target);
                    api.getBtn('mathjax').click();
                });
            }


            this.updateContent();
            this._timer.start();
            // this.$().getEditor().focus(function() {
            //   timer.start();
            // });

            // this.$().getEditor().focusout(function() {
            //   timer.stop();
            // });

            $(document).focus();
            $(document).blur();

        },

        updateCharCount: function () {
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


        willDestroyElement: function () {
            this._timer.stop();
            if (this.get('state') != 'inDOM' || !this.$().data('redactor'))
                return;

            var value = this.$().getCode();

            var editor = this.$().redactor().getEditor();

            $(editor).unbind('click.mathredactor');
            $(editor).unbind('click.tat-click-handler');
            $(editor).unbind('click.perf-click-handler');

            if (editor.tatAir) {
                $(editor.tatAir).remove();
                editor.tatAir = null;
            }

            if (editor.perfButton) {
                $(editor.perfButton).remove();
                editor.perfButton = null;
            }


            this.$().destroyEditor();

            if (this.get('value') == value)
                return;

            this.set('value', value);


        },

        updateContent: function () {
            if (!this.$().data('redactor'))
                return;

            if (this.get('value') == this.$().getCode())
                return;

            var value = this.get('value');

            if (!value && !this.get('oneLine'))
                value = '<p><br/></p>';

            this.$().getEditor().html(value);
            this.$().data('redactor').syncCode();
            this.updateCharCount();
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

        didInsertElement: function () {
            this.$('input').attr('id', 'radio-' + this.get('elementId'));
            this.$('input').uniform();
        },


        change: function () {
            this._updateElementValue();
        },

        upstreamChanged: (function () {
            Ember.run.next(this, function () {
                // this will be executed at the end of the RunLoop, when bindings are synced
                $.uniform.update(this.$('input'));
            });

        }.observes('checked')),

        _updateElementValue: function () {
            this.set('group', this.get('value'));
        }
    });

    LxxlLib.Em.RadioButton = Em.RadioButton.extend({

    });


    LxxlLib.utils.poll = function (condition, callback, limit) {
        var delay = 1;
        var pos = 0;
        var poller = function () {
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

    LxxlLib.utils.Timer = function (delay, callback) {
        var ref = null;
        var status = 0;

        var poller = function () {
            if (status != 1)
                return;

            callback();
            ref = window.setTimeout(poller, delay);
        };

        this.start = function () {
            if (status == 1)
                return;

            status = 1;
            poller();
        };

        this.stop = function () {
            status = 0;
            clearTimeout(ref);
        };

    };

})();
