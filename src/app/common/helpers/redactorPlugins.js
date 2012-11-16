(function() {
  if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


  this.RedactorPlugins.mathjax = new (function(){
    var redactorScope;
    this.init = function() {
      console.warn("initing MATHJAX", this);
      redactorScope = this;
      var target = null;

      var callback = (function() {

        var math = null;
        this.saveSelection();

        if (target)
          $('#redactor_modal .formula').val($(target).attr('data-formula'));

        // MathJAX initialization stupidity
        var coinNode = $('#redactor_modal .preview')[0];
        $('#redactor_modal .preview').html('`{}`');

        MathJax.Hub.Typeset(coinNode, function() {
          math = MathJax.Hub.getAllJax(coinNode)[0];
          math.Text($('#redactor_modal .formula').val());
        });

        $('#redactor_modal .formula').on('input', function() {
          if (!math) {
            return;
          }

          math.Text($(this).val());
        });

        $('#redactor_modal .redactor_btn_modal_insert').bind('click', function() {

          insertFromMyModal($('#redactor_modal .formula').val(), target);
        }.bind(this));

      }.bind(this));


      this.addBtn('mathjax', 'AsciiMath', function(obj, e) {
        target = obj.getBtn('mathjax').data('target');
        obj.getBtn('mathjax').data('target', null);

        obj.modalInit('AsciiMath', '#redactor-mathjax', 500, callback);
      });

      this.addBtnSeparatorBefore('mathjax');
    };

    var insertFromMyModal = function(formula, target) {
      console.warn("Mathjax inserting form modal", this);
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
  })();

  this.RedactorPlugins.tat = new (function(){
    this.init = function() {
      console.warn("initing TAT", this);
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
        target = obj.getBtn('tat').data('target') ? $(obj.getBtn('tat').data('target')) : null;
        obj.getBtn('tat').data('target', null);

        obj.modalInit('Texte à trous', '#redactor-tat', 500, callback);
      });
    };

    var untagTat = (function(el) {
      el.replaceWith(el.text());
      this.modalClose();
    }.bind(this));

    var insertFromMyModal = (function(el) {
      console.warn("INSERTING FROM MODAL", this);
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
    }.bind(this));

  })();

}).apply(this);
