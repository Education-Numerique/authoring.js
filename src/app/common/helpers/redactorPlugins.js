(function() {
  if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


  this.RedactorPlugins.mathjax = new (function() {
    this.init = function() {
      var redactorScope;
      var target = null;

      var callback = (function() {

        var matha = null;
        var mathl = null;
        this.saveSelection();

        if (target)
          $('#redactor_modal .formula').val($(target).attr('data-formula'));

        // MathJAX initialization stupidity
        var asciiPreview = $('#redactor_modal .preview.am');
        asciiPreview.html('`{}`');

        var latexPreview = $('#redactor_modal .preview.lt');
        latexPreview.html('$${}$$');

        MathJax.Hub.Typeset(asciiPreview[0], function() {
          matha = MathJax.Hub.getAllJax(asciiPreview[0])[0];
          matha.Text($('#redactor_modal .formula').val());
        });

        MathJax.Hub.Typeset(latexPreview[0], function() {
          mathl = MathJax.Hub.getAllJax(latexPreview[0])[0];
          mathl.Text($('#redactor_modal .formula').val());
        });

        $('#redactor_modal .formula').on('input', function() {
          if (matha) {
            matha.Text($(this).val());
          }
          if (mathl) {
            mathl.Text($(this).val());
          }
        });

        $('#redactor_modal .redactor_btn_modal_insert').bind('click', function() {

          insertFromMyModal($('#redactor_modal .formula').val(), target);
        }.bind(this));

      }.bind(this));


      this.addBtn('mathjax', 'AsciiMath', function(obj, e) {
        redactorScope = obj;
        target = obj.getBtn('mathjax').data('target');
        obj.getBtn('mathjax').data('target', null);

        obj.modalInit('AsciiMath', '#redactor-mathjax', 500, callback);
      });

      this.addBtnSeparatorBefore('mathjax');

      var insertFromMyModal = function(formula, target) {
        redactorScope.restoreSelection();

        var ready = function(node) {
          if (target)
            $(target).replaceWith(node[0]);
          else
            redactorScope.execCommand('inserthtml', node[0].outerHTML);

          redactorScope.modalClose();
        };

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
      };


    };

  })();

  this.RedactorPlugins.tat = new (function() {
    this.init = function() {
      var redactorScope;
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


        $('#redactor_modal .redactor_btn_modal_insert').bind('click', function() {
          insertFromMyModal(target);
        });

        $('#redactor_modal .redactor_btn_modal_remove').bind('click', function() {
          untagTat(target);
        });

      }.bind(this));


      this.addBtn('tat', 'Texte à trous', function(obj, e) {
        redactorScope = obj;
        target = obj.getBtn('tat').data('target') ? $(obj.getBtn('tat').data('target')) : null;
        obj.getBtn('tat').data('target', null);

        obj.modalInit('Texte à trous', '#redactor-tat', 500, callback);
      });

      var untagTat = function(el) {
        el.replaceWith(el.text());
        redactorScope.modalClose();
      };

      var insertFromMyModal = function(el) {
        var word = $('#redactor_modal .word').val();
        var clue = $('#redactor_modal .clue').val();
        var alts = $('#redactor_modal .alternatives').val();

        var markup = '<a data-type="tat" data-clue="' + redactorScope.stripTags(clue) + '" data-alt="' +
            redactorScope.stripTags(alts) + '">' + word + '</a>&nbsp';

        if (el && el.attr('data-type') == 'tat') {
          el.replaceWith(markup);
        } else {
          redactorScope.restoreSelection();
          redactorScope.execCommand('inserthtml', markup);
        }
        redactorScope.modalClose();
      };
    };



  })();

}).apply(this);
