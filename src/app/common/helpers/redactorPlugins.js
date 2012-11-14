(function () {
    if (typeof this.RedactorPlugins === 'undefined') this.RedactorPlugins = {};


    this.RedactorPlugins.mathjax = {
        init : function () {

            var callback = (function () {
                console.log('=====> modal inited');
            }.bind(this));


            this.addBtn('mathjax', 'MathJax', function (obj) {
                obj.modalInit('MathJax', '#redactor-mathjax', 500, callback);
            });

            this.addBtnSeparatorBefore('mathjax');
        }
    };

}).apply(this);