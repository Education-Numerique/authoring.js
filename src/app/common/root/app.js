(function() {

  this.LxxlApp = {
    rootElement: $('#lxxlroot'),
    ready: function() {
      if (jsBoot.debug)
        jsBoot.debug.tick('Ember application is ready!', true);
      this._super();
    },
    init: function() {
      if (jsBoot.debug)
        jsBoot.debug.tick('Ember application inited');
      this._super();
    }
  };

  var tpls = {};
  var cpltpl = {};

  var loadTpls = function(url, callback) {
    var xhrtpl = new XMLHttpRequest();
    xhrtpl.open('GET', url, true);
    xhrtpl.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhrtpl.onreadystatechange = function() {
      if (xhrtpl.readyState == 4 && xhrtpl.status == 200) {
        var data = xhrtpl.responseText;
        var parser = /\/[*\s]{1,}@template\s?:\s+([a-z0-9_.-\/]+)(?:[^\/]+|[^*]\/)*[*]\/((?:[^\/]+|[\/][^*])*)/g;
        var result, name, content;
        while ((parser.lastIndex < data.length) && (result = (parser.exec(data)))) {
          content = result.pop();
          name = result.pop();
          tpls[name] = content;
          Em.TEMPLATES[name] = Em.Handlebars.compile(content);
        }
        if (jsBoot.debug)
          jsBoot.debug.tick('Templates loaded');
        // And init the application
        callback();
      }
    };
    xhrtpl.send();
  };


  var getLoadedTemplate = function(name) {
    if (!(name in cpltpl))
      cpltpl[name] = Em.Handlebars.compile(tpls[name]);
    return cpltpl[name];
  };


  var getScriptBaseUrl = function(scriptName) {
    if (!scriptName)
      scriptName = document.scripts[0].src;
    var ret;
    var m = new RegExp(scriptName);
    Array.prototype.some.call(document.scripts, function(item) {
      // XXX have some IRI magic on this shit
      if (m.test(item.src)) {
        ret = item.src.split('/');
        ret.pop();
        ret = ret.join('/');
      }
      return ret;
    });
    return ret;
  };

  // XXX risky with minifier
  loadTpls(getScriptBaseUrl('lxxl') + '/lxxl.tpl', function() {
    LxxlApp = Ember.Application.create(LxxlApp);
    // LxxlApp.initialize();
  });

}).apply(this);
