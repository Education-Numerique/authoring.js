/**
 * @file app/common/helpers/redactorPlugins.js
 * @summary Ember helpers
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}app/common/helpers/redactorPlugins.js{PUKE-GIT-REVISION}
 */

 (function () {
    /*global MathJax, html2canvas*/
    'use strict';
    if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


    // PERFORMANCE PLUGIN

    RedactorPlugins.perf = {
        init: function()
        {
            this.addBtn('icon-star', 'Performance', this.insertAdvancedHtml);
        },
        insertAdvancedHtml: function(obj, e)
        {
            $('#'+obj.$el.context.id).prev().append("Voici les résultats que tu as obtenus aux exercices de cette activité : <p class='mystats'>{{activite.note}} ou encore : {{activite.note[/20]}}</p> Remarques sur ta Performance : <br /> Suggestions pour aller plus loin : <br />Crédits (textes, photos) :<br/>");
            // ------------------------------------------------------------------------------------------------------------------------------------------
            var pageTypes = ['page-quizz', 'page-jmt', 'page-tat'];
            var nbPage = $('.pages-list > li').length;
            $( ".pages-list > li" ).each(function( index )
            {
                if ($.inArray($(this).attr('class').split(' ').pop(), pageTypes) != -1)
                {
                    $('.mystats').append("<p>Page "+ (index+1) +": {{activite.pages["+(index+1)+"].note[/20]}} </p>");
                }
            });
            // $( ".pages-list > li" ).each(function( index )
            // {
            //     if ($.inArray($(this).attr('class').split(' ').pop(), pageTypes) != -1)
            //     {
            //         $('#'+obj.$el.context.id).prev().append("Page "+ (index+1) +": {{activite.pages["+(index+1)+"].note[/20]}} <br/>");
            //     }
            // });
        }
    }

    //END PERFORMANCE PLUGIN

    this.RedactorPlugins.imagemanager = new (function () {
        this.init = function () {
            var redactorScope;

            var callback = (function () {
                var nodeContainer = $('#redactor_modal');
                var dropZone = nodeContainer.find('.redactor_dropareabox');
                this.saveSelection();

                var gallery = nodeContainer.find('#redactor_image_box');
                gallery.empty();
                LxxlApp.get('router.activityEditController.content').blobs.media.forEach(function (e) {
                    var img = $('<img />');
                    var blobId = e.split('/');
                    blobId.pop();
                    blobId = blobId.pop();
                    img.attr('src', e);
                    img.attr('data-blobid', blobId);
                    img.click(function () {
                        insertImage($(this).attr('src'), $(this).attr('data-blobid'));

                    });
                    gallery.append(img);
                });
                nodeContainer.find('.redactor_imageupload').fileupload();
                nodeContainer.find('.redactor_imageupload').fileupload('option', {
                    dropZone: dropZone[0],
                    limitMultiFileUploads: 1,
                    maxFileSize: 2500000, //2,5Mo
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    process: [
                        {
                            action: 'load',
                            fileTypes: /^image\/(gif|jpeg|png)$/,
                            maxFileSize: 2500000 // 20MB
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
                    add: function (e, data) {
                        $(this).fileupload('process', data).done(function () {
                            LxxlApp.get('router.activityEditController.content').controller.addMedia(data.files[0],
                                function (url, blobId) {
                                    insertImage(url, blobId);
                                }, function () {
                                    // console.log('=========> error', arguments);
                                });
                        });
                    }
                });

                $('#redactor_modal .redactor_dropareabox').bind('dragover', function (/*e*/) {
                    dropZone.addClass('hover');
                });
                $('#redactor_modal .redactor_dropareabox').bind('dragleave', function (/*e*/) {
                    dropZone.removeClass('hover');
                });
                $('#redactor_modal .redactor_dropareabox').bind('drop', function (/*e*/) {
                    dropZone.removeClass('hover').addClass('drop');
                });


                var insertImage = (function (link, blobId) {
                    this.restoreSelection();
                    var html = '<img src="' + link + '" data-blobid="' + blobId + '"/>';

                    this.execCommand('inserthtml', html);
                    this.$editor.focus();
                    this.modalClose();
                    this.observeImages();
                }.bind(this));
            }.bind(this));

            this.addBtnBefore('video', 'imagemanager', 'Insérer une image', function (obj/*, e*/) {
                redactorScope = obj;
                obj.modalInit('Insérer une image', '#redactor-imagemanager', 500, callback);
            });

        };
    })();


    this.RedactorPlugins.mathjax = new (function () {
        this.init = function () {
            var redactorScope;
            var target = null;

            var callback = (function () {
                var isAsciiMath = true;
                var math = null;
                this.saveSelection();


                var drawIt = function () {
                    var nodePreview;
                    // MathJAX initialization stupidity
                    if (isAsciiMath) {
                        nodePreview = $('#redactor_modal .preview');
                        nodePreview.html('`{}`');
                    } else {
                        nodePreview = $('#redactor_modal .preview');
                        nodePreview.html('$${}$$');
                    }


                    MathJax.Hub.Typeset(nodePreview[0], function () {
                        math = MathJax.Hub.getAllJax(nodePreview[0])[0];
                        math.Text($('#redactor_modal .formula').val());
                    });

                };

                $('#redactor_modal_content .redactor_tabs a').bind('click', function () {
                    console.warn($(this).siblings().attr('class'));
                    $(this).siblings().removeClass('redactor_tabs_act');
                    $(this).addClass('redactor_tabs_act');

                    if ($(this).hasClass('asciimath')) {
                        isAsciiMath = true;
                    } else {
                        isAsciiMath = false;
                    }

                    drawIt();
                });

                if (target) {
                    $('#redactor_modal .formula').val($(target).attr('data-formula'));
                    if ($(target).attr('data-format') == 'latex') {
                        $('#redactor_modal .redactor_tabs a.latex').click();
                    }

                }

                drawIt();

                $('#redactor_modal .formula').on('input', function () {
                    math.Text($(this).val());
                });


                $('#redactor_modal .redactor_btn_modal_insert').bind('click', function () {

                    insertFromMyModal($('#redactor_modal .formula').val(), target, isAsciiMath);
                }.bind(this));

            }.bind(this));


            this.addBtn('mathjax', 'Math', function (obj/*, e*/) {
                redactorScope = obj;
                target = obj.getBtn('mathjax').data('target');
                obj.getBtn('mathjax').data('target', null);

                obj.modalInit('Math', '#redactor-mathjax', 500, callback);
            });

            this.addBtnSeparatorBefore('mathjax');

            var insertFromMyModal = function (formula, target, isAsciiMath) {
                redactorScope.restoreSelection();

                var ready = function (node) {
                    if (target)
                        $(target).replaceWith(node[0]);
                    else
                        redactorScope.execCommand('inserthtml', node[0].outerHTML);

                    redactorScope.modalClose();
                };

                html2canvas([$('#redactor_modal .preview')[0]], {
                    onrendered: function (canvas) {
                        var img = $('<img />');

                        img.attr('src', canvas.toDataURL());
                        img.attr('data-type', 'math');
                        img.attr('data-format', isAsciiMath ? 'asciimath' : 'latex');
                        img.attr('data-formula', formula);
                        img.attr('uneditable', 'true');
                        ready(img);
                    }
                });
            };


        };

    })();

    this.RedactorPlugins.tat = new (function () {
        this.init = function () {
            var redactorScope;
            var target = null;
            var callback = (function () {

                if (target) {
                    $('#redactor_modal .word').val(target.text());
                    $('#redactor_modal .clue').val(target.attr('data-clue'));
                    $('#redactor_modal .alternatives').val(target.attr('data-alt'));
                    $('#redactor_modal .redactor_btn_modal_remove').show();
                } else {
                    this.saveSelection();
                    var tmp = $('<p />');
                    tmp.html(this.getSelectedHtml());
                    $('#redactor_modal .word').val(tmp.text());
                    $('#redactor_modal .redactor_btn_modal_remove').hide();
                }

                $('#redactor_modal .redactor_btn_modal_insert').bind('click', function () {
                    insertFromMyModal(target);
                });

                $('#redactor_modal .redactor_btn_modal_remove').bind('click', function () {
                    untagTat(target);
                });

            }.bind(this));


            this.addBtn('tat', 'Texte à trous', function (obj, e) {
                this.saveSelection();
                console.log(this.getSelectedHtml());
                var str = this.getSelectedHtml();
                var len = 0;
                redactorScope = obj;
                var temp = $('#'+redactorScope.$el.context.id).val();
                var match = temp.match(/data-clue/g);
                if (match != null)
                    len = match.length;
                target = obj.getBtn('tat').data('target') ? $(obj.getBtn('tat').data('target')) : null;
                obj.getBtn('tat').data('target', null);

                if (len <= 16)
                {
                    console.log(this);
                    if (str.indexOf('<img') != -1 || str.indexOf('<a') != -1)
                    {
                        alert("Vous ne pouvez pas trouer cela.");
                    }
                    else
                    {
                        obj.modalInit('Texte à trous', '#redactor-tat', 500, callback);
                    }
                }
                else
                {
                    alert('Nombre de trous maximum atteint');
                }
            }.bind(this));

            var untagTat = function (el) {
                el.replaceWith(el.html());
                redactorScope.modalClose();
            };

            var insertFromMyModal = function (el) {
                var word = $('#redactor_modal .word').val();
                var clue = $('#redactor_modal .clue').val();
                var alts = $('#redactor_modal .alternatives').val();
                var markup = $('<div><a data-type="tat" />&nbsp</div>');
                markup.find('a').attr('data-clue', redactorScope.stripTags(clue));
                markup.find('a').attr('data-alt', redactorScope.stripTags(alts));
                markup.find('a').text(word);

                if (el && el.attr('data-type') == 'tat') {
                    el.replaceWith(markup.html());
                } else {
                    redactorScope.restoreSelection();
                    redactorScope.execCommand('inserthtml', markup.html());
                }
                redactorScope.modalClose();
            };
        };


    })();

    this.RedactorPlugins.tooltip = new (function () {
        this.init = function () {
            var redactorScope;
            var text = '';
            var target;

            var callback = (function () {

                var container = $('#redactor_modal');

                if ($.uniform) {
                    $('input[type=radio]', container).uniform();
                }

                $('.redactor_btn_modal_remove', container).hide();

                this.saveSelection();
                var sel = this.getSelection();


                // if ($.browser.msie)
                // {
                //     var parent = this.getParentNode();
                //     if (parent.nodeName === 'A')
                //     {
                //         this.insert_link_node = $(parent);
                //         text = this.insert_link_node.text();
                //         url = this.insert_link_node.attr('href');
                //         target = this.insert_link_node.attr('target');
                //     }
                //     else
                //     {
                //         if (this.oldIE())
                //         {
                //             text = sel.text;
                //         }
                //         else
                //         {
                //             text = sel.toString();
                //         }
                //     }
                // }
                // else
                // {
                if (sel && sel.anchorNode && sel.anchorNode.parentNode.tagName === 'A') {
                    target = sel.anchorNode.parentNode;
                    text = $(target).text();
                    $('.redactor_btn_modal_remove', container).show();
                }

                else
                {
                    target = $('<a />');
                    text = this.getSelectedHtml();
                    var tmp = $('<p />');
                    tmp.html(text);
                    text = tmp.text();
                    tmp = null;
                }

                $('.text', container).val(text);
                $('.content', container).val($(target).attr('title'));

                var placement = $(target).attr('data-placement');
                if (placement) {
                    $('[name=placement]', container).removeAttr('checked');
                    $('[name=placement][value=' + placement + ']', container).attr('checked', 'checked');
                    $.uniform.update($('[name=placement]', container));
                }


                $('#redactor_modal .redactor_btn_modal_insert').bind('click', function () {
                    insertFromMyModal(target);
                });

                $('#redactor_modal .redactor_btn_modal_remove').bind('click', function () {
                    untagTat(target);
                });

            }.bind(this));


            this.addBtn('tooltip', 'Tooltip', function (obj/*, e*/) {
                redactorScope = obj;
                obj.getBtn('tat').data('target', null);

                obj.modalInit('Tooltip', '#redactor-tooltip', 500, callback);
            });

            var untagTat = function (el) {
                redactorScope.$editor.focus();
                redactorScope.restoreSelection();
                if ($(el).attr('href')) {
                    $(el).removeAttr('rel');
                    $(el).removeAttr('title');
                    $(el).removeAttr('data-placement');
                } else {
                    $(el).replaceWith($(el).html());
                }
                redactorScope.syncCode();
                redactorScope.modalClose();
            };

            var insertFromMyModal = function (el) {
                var container = $('#redactor_modal');
                var text = $('.text', container).val();
                var tooltip = $('.content', container).val();
                var placement = $('[name=placement]:checked').val();
                redactorScope.$editor.focus();
                redactorScope.restoreSelection();

                $(el).attr('rel', 'tooltip');
                $(el).attr('title', tooltip);
                $(el).attr('data-placement', placement);
                $(el).text(text);


                if (!$(el).closest('html').length) {
                    redactorScope.execCommand('inserthtml', $(el)[0].outerHTML + '&nbsp;');
                }
                redactorScope.syncCode();
                redactorScope.modalClose();
            };
        };


    })();

}).apply(this);
