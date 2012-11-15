(function() {
  if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


  this.RedactorPlugins.mathjax = {
    init: function() {

      var callback = (function() {

        var math = null;
        this.saveSelection();

        MathJax.Hub.Typeset($('#redactor_modal .preview')[0], function() {
          math = MathJax.Hub.getAllJax('ragout')[0];
        });

        $('#redactor_modal .formula').on('input', function() {
          if (!math) {
            console.log('ahhhhhhh');
            return;
          }

          console.log('value', $(this).val());
          math.Text($(this).val());
        });

        $('#redactor_modal .redactor_btn_modal_insert').on('click', function() {
          this.insertFromMyModal();
        }.bind(this));

      }.bind(this));


      this.addBtn('mathjax', 'MathJax', function(obj) {
        obj.modalInit('MathJax', '#redactor-mathjax', 500, callback);
      });

      this.addBtnSeparatorBefore('mathjax');
    },
    insertFromMyModal: function(html) {
      this.restoreSelection();
      this.execCommand('inserthtml', $($('.preview')[1]).html());
      this.modalClose();
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
