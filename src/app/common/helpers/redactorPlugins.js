(function() {
  if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


  this.RedactorPlugins.mathjax = {
    init: function() {
      var target = null;

      var callback = (function() {

        var math = null;
        this.saveSelection();

        if (target) {
          $('#redactor_modal .formula').val($(target).attr('data-formula'));
        }

        MathJax.Hub.Typeset($('#redactor_modal .preview')[0], function() {
          math = MathJax.Hub.getAllJax('ragout')[0];
          math.Text($('#redactor_modal .formula').val());
        });

        $('#redactor_modal .formula').on('input', function() {
          if (!math) {
            return;
          }

          math.Text($(this).val());
        });

        $('#redactor_modal .redactor_btn_modal_insert').on('click', function() {

          this.insertFromMyModal($('#redactor_modal .formula').val(), target);
        }.bind(this));

      }.bind(this));


      this.addBtn('mathjax', 'AsciiMath', function(obj, e) {
        target = obj.getBtn('mathjax').data('target');
        obj.getBtn('mathjax').data('target', null);

        obj.modalInit('AsciiMath', '#redactor-mathjax', 500, callback);
      });

      this.addBtnSeparatorBefore('mathjax');
    },
    insertFromMyModal: function(formula, target) {
      this.restoreSelection();

      var ready = (function(node) {
        if (target)
          $(target).replaceWith(node[0]);
        else
          this.execCommand('inserthtml', node[0].outerHTML);

        this.modalClose();
      }.bind(this));

      html2canvas([$('#redactor_modal .preview')[0]], {
        onrendered: function(canvas) {
          var img = $('<img />');

          img.attr('src', canvas.toDataURL());
          img.attr('data-type', 'math');
          img.attr('data-format', 'ascii-math');
          img.attr('data-formula', formula);
          img.attr('uneditable', 'true');
          ready(img);
        }
      });




    }
  };


  this.RedactorPlugins.tat = {
    init: function() {
      var target = null;

      var callback = (function() {

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


        $('#redactor_modal .redactor_btn_modal_insert').on('click', function() {
          this.insertFromMyModal(target);
        }.bind(this));

        $('#redactor_modal .redactor_btn_modal_remove').on('click', function() {
          this.untagTat(target);
        }.bind(this));

      }.bind(this));


      this.addBtn('tat', 'Texte à trous', function(obj, e) {
        target = obj.getBtn('tat').data('target') ? $(obj.getBtn('tat').data('target')) : null;
        obj.getBtn('tat').data('target', null);

        obj.modalInit('Texte à trous', '#redactor-tat', 500, callback);
      });
    },

    untagTat: function(el) {
      el.replaceWith(el.text());
      this.modalClose();
    },

    insertFromMyModal: function(el) {
      var word = $('#redactor_modal .word').val();
      var clue = $('#redactor_modal .clue').val();
      var alts = $('#redactor_modal .alternatives').val();

      var markup = '<a data-type="tat" data-clue="' + this.stripTags(clue) + '" data-alt="' +
          this.stripTags(alts) + '">' + word + '</a>&nbsp';

      if (el && el.attr('data-type') == 'tat') {
        el.replaceWith(markup);
      } else {
        this.restoreSelection();
        this.execCommand('inserthtml', markup);
      }
      this.modalClose();
    }
  };

}).apply(this);
