(function() {
  /*global Raphael:true*/
  /*jshint maxparams:15*/
  'use strict';

  // This below is trash dirty old code
  Raphael.fn.pieChart = function() {
    var paper = this;
    var rad = Math.PI / 180;
    var chart = this.set();

    var drawSector = function(cx, cy, r1, r2, startAngle, endAngle, params) {
      var x1 = cx + r1 * Math.cos(-startAngle * rad),
          y1 = cy + r1 * Math.sin(-startAngle * rad),
          x2 = cx + r1 * Math.cos(-endAngle * rad),
          y2 = cy + r1 * Math.sin(-endAngle * rad);

      var xp1 = cx + r2 * Math.cos(-startAngle * rad),
          yp1 = cy + r2 * Math.sin(-startAngle * rad),
          xp2 = cx + r2 * Math.cos(-endAngle * rad),
          yp2 = cy + r2 * Math.sin(-endAngle * rad);

      var ret = paper.path([
        'M', x1, y1,
        'L', xp1, yp1,
        'A', r2, r2, 0, + (endAngle - startAngle > 180), 0, xp2, yp2,
        'L', x2, y2,
        'A', r1, r1, 0, + (endAngle - startAngle > 180), 1, x1, y1,
        'z']).attr(params);
      return ret;
    };

    var process = function(angle, cx, cy, r1, r2, value, label, total, top, bot, segment, animation, onOver, onOut, onClick, index) {
      top = Raphael.rgb2hsb(Raphael.getRGB(top));
      bot = Raphael.rgb2hsb(Raphael.getRGB(bot));

      var angleplus = 360 * value / total * segment;
      // XXX al this crap is dirty
      if (angleplus == 360)
        angleplus = 359;

      var p = drawSector(cx, cy, r2, r1, angle, angle + angleplus, {opacity: 0, fill: '90-' + bot +
            '-' + top, stroke: bot, 'stroke-width': 2});
      p.label = label;

      p.doMouseOver = function() {
        p.toFront();
        p.stop().animate({transform: 's' + animation.factor + ' ' + animation.factor + ' ' + cx +
              ' ' + cy}, animation.ms, animation.easing);
      };

      p.doMouseOut = function() {
        p.stop().animate({transform: ''}, animation.ms, animation.easing);
      };

      p.mouseover(function() {
        // p.doMouseOver();
        if (onOver)
          onOver(p, chart);
      }).mouseout(function() {
        // p.doMouseOut();
        if (onOut)
          onOut(p, chart);
      }).click(function(){
        if (onClick)
          onClick(p, chart);
      });

      angle += angleplus;
      chart.push(p);


      p.stop().animate({transform: 's' + animation.factor + ' ' + animation.factor + ' ' + cx +
            ' ' + cy, opacity: 1}, animation.ms / 2, 'easeInOut',
      function() {
        p.stop().animate({transform: ''}, animation.ms / 2, 'easeInOut');
      }
      );
      p.index = index;
      return angle;
    };

    chart.doTheDirtyDeed = function(startAngle, limit, cx, cy, r1, r2, values, anim, onOver, onOut, onClick, revert, plain) {
      var angle = 0;
      angle = startAngle;
      var total = values.reduce(function(previousValue, currentValue) {
        return previousValue + parseInt(currentValue.value, 10);
      }, 0);

      values.forEach(function(item, idx) {
        var label = item.label;
        var value = item.value;
        var top = item.top;
        var bot = item.bottom;
        window.setTimeout(
            function() {
              angle = process(angle, cx, cy, r1, r2, parseInt(value, 10), label, total, top, bot, plain ? 1 : 0.5, anim,
                  onOver, onOut, onClick, idx);
            },
            revert ? (100 * (values.length - idx)) : (100 * idx));
      });
    };
    return [paper, chart];
  };






  LxxlLib.widgets = {};

  LxxlLib.widgets.ApplePie = function(node) {
    /*jshint newcap:false*/
    if (!node)
      throw new Error('NOT_INSERTED_NODE');
    var computed = window.getComputedStyle(node);
    if (!computed)
      throw new Error('NOT_INSERTED_NODE');

    var w = parseInt(computed.width, 10);
    var h = parseInt(computed.height, 10);
    var factor = 1.3;

    this.onover = null;
    this.onout = null;
    this.onclick = null;

    this.fill = false;
    this.reverse = false;
    this.mode = this.HALF;
    this.halign = this.CENTER;
    this.valign = this.CENTER;

    var s = Raphael(node, '100%', '100%').pieChart();
    var pap = this.underpie = s.shift();
    s = s.shift();
    this.controllers = s;

    var colors = [];
    this.addColor = function(top, bottom) {
      colors.push({
        top: top,
        bottom: bottom
      });
    };

    var bounds = [];
    this.bind = function(opt) {
      bounds.push(opt);
      if ('object' in opt) {
        opt.object.addObserver(opt.valueKey, toggle);
      }else if ('array' in opt) {
        opt.array.addObserver('@each.' + opt.valueKey, toggle);
      }
      toggle();
    };

    this.destroy = function() {
      bounds.forEach(function(opt) {
        if ('object' in opt) {
          opt.object.removeObserver(opt.valueKey, toggle);
        }else if ('array' in opt) {
          opt.array.removeObserver('@each.' + opt.valueKey, toggle);
        }
      });
      bounds = [];
      s.remove();
    };


    var tout;
    var toggle = function() {
      if (tout) {
        clearTimeout(tout);
        tout = null;
      }
      tout = setTimeout(draw, 1000);
    };

    var draw = (function() {
      var w = parseInt(computed.width, 10);
      var h = parseInt(computed.height, 10);
      var x;
      var y;
      var r2;
      var r1;

      switch (this.halign) {
        case this.CENTER:
          x = w / 2;
          break;
        case this.LEFT:
          x = 0;
          break;
        default:
          x = w;
          break;
      }

      switch (this.valign) {
        case this.CENTER:
          y = h / 2;
          break;
        case this.TOP:
          y = 0;
          break;
        default:
          y = h;
          break;
      }

      if (this.fill) {
        r2 = 0;
        r1 = Math.min(w * 2, h) / 2 / factor * 4 / 5;
      }else {
        r2 = Math.min(w * 2, h) / 2 / factor;
        r1 = Math.min(w * 2, h) / 2 / factor * 3 / 5;
      }

      var data = bounds.filter(function(item) {
        return item.object && !!(item.object.get ? item.object.get(item.valueKey) : item.object[item.valueKey]);
      }).map(function(item, idx) {
        return {
          top: colors[idx % colors.length].top,
          bottom: colors[idx % colors.length].bottom,
          value: (item.object.get ? item.object.get(item.valueKey) : item.object[item.valueKey]),
          label: item.labelKey ? (item.object.get ? item.object.get(item.labelKey) : item.object[item.labelKey]) : item.label
        };
      });

      bounds.filter(function(item) {
        return ('array' in item);
      }).forEach(function(coll) {
        coll.array.filter(function(item) {
          return !!(item.get ? item.get(coll.valueKey) : item[coll.valueKey]);
        }).forEach(function(item, idx) {
          data.push({
            top: colors[idx % colors.length].top,
            bottom: colors[idx % colors.length].bottom,
            value: item.get ? item.get(coll.valueKey) : item[coll.valueKey],
            label: !coll.labelKey || (item.get ? item.get(coll.labelKey) : item[coll.labelKey])
          });
        });
      });

      pap.clear();
      s.clear();

      s.doTheDirtyDeed(this.halign == this.RIGHT ? 90 : -90, 0.5, x, y, r1, r2, data,
          {
            ms: 500,
            factor: factor,
            easing: 'elastic'
          }, this.onover, this.onout, this.onclick, this.reverse, this.mode == this.FULL);
    }.bind(this));
  };

  LxxlLib.widgets.ApplePie.prototype.CENTER = 'center';
  LxxlLib.widgets.ApplePie.prototype.LEFT = 'left';
  LxxlLib.widgets.ApplePie.prototype.RIGHT = 'right';
  LxxlLib.widgets.ApplePie.prototype.TOP = 'top';
  LxxlLib.widgets.ApplePie.prototype.BOTTOM = 'bottom';

  LxxlLib.widgets.ApplePie.prototype.HALF = 'half';
  LxxlLib.widgets.ApplePie.prototype.FULL = 'full';


})();
