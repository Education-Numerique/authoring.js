(function() {
  if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


  this.RedactorPlugins.mathjax = {
    init: function() {

      var callback = (function() {

        var math = null;
        this.saveSelection();

        MathJax.Hub.Typeset($('#redactor_modal .preview')[0], function() {
          math = MathJax.Hub.getAllJax('ragout')[0];
          math.Text($('#redactor_modal .formula').val());
        });

        $('#redactor_modal .formula').on('input', function() {
          if (!math) {
            console.log('ahhhhhhh');
            return;
          }

          math.Text($(this).val());
        });

        $('#redactor_modal .redactor_btn_modal_insert').on('click', function() {

          this.insertFromMyModal($('#redactor_modal .formula').val());
        }.bind(this));

      }.bind(this));


      this.addBtn('mathjax', 'MathJax', function(obj) {
        obj.modalInit('MathJax', '#redactor-mathjax', 500, callback);
      });

      this.addBtnSeparatorBefore('mathjax');
    },
    insertFromMyModal: function(formula) {
      this.restoreSelection();

      var ready = (function(node) {
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


}).apply(this);

// $(document).ready(function () {

//     var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
//     window.math = null, box = null;    // the element jax for the math output, and the box it's in


//     //
//     //  Get the element jax when MathJax has produced it.
//     //
//     QUEUE.Push(function () {
//       window.math = MathJax.Hub.getAllJax("MathOutput")[0];
//     });

//     //
//     //  The onchange event handler that typesets the math entered
//     //  by the user.  Hide the box, then typeset, then show it again
//     //  so we don't see a flash as the math is cleared and replaced.
//     //
//     window.UpdateMath = function (TeX) {
//       QUEUE.Push(["Text",math,TeX]);
//     };

// });
