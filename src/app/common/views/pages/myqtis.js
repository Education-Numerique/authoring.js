(function() {
  'use strict';
  var t = this.lxxlPageView('qtis');

  /*var flotTip = function(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
      top: y + 5,
      left: x + 5
    }).appendTo('body').fadeIn(200);
  };*/

  t.data = (function() {
    if (!this.get('element'))
      return;
    var act = this.get('controller.categories');
    var data = [];
    Object.keys(act).forEach(function(i){
      data.push({
        label: i,
        data: act[i]
      });
    });

    $.plot($('.pie'), data, {
      series: {
        pie: {
          show: true,
          radius: 3 / 4,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: function(label, series) {
              return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' +
                  label + '<br/>' + Math.round(series.percent) + '%</div>';
            },
            background: {
              opacity: 0.5,
              color: '#000'
            }
          },
          innerRadius: 0.2
        },
        legend: {
          show: false
        }
      }
    });
  }.property('controller.categories', 'element'));

  t.stupidBinding = 'data';

  t.top = (function() {
    var a = this.get('controller.authors');
    var d = [];
    Object.keys(a).forEach(function(i){
      d.push({name: i, nb: a[i]});
    });
    d.sort(function(item, comp) {
      return item.nb < comp.nb;
    });
    d.splice(10, d.length);
    return d;
  }.property('controller.authors'));

  t.doOnInsert = function() {

    /*
    var data = [];
    var series = Math.floor(Math.random()*10)+1;
    for( var i = 0; i<series; i++)
    {
      data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 }
    }
    */
    // var pie = $.plot($(".pie"), data,{
    //     series: {
    //         pie: {
    //             show: true,
    //             radius: 3/4,
    //             label: {
    //                 show: true,
    //                 radius: 3/4,
    //                 formatter: function(label, series){
    //                     return '<div style="font-size:8pt;text-align:center;padding:2px;
    //                     color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
    //                 },
    //                 background: {
    //                     opacity: 0.5,
    //                     color: '#000'
    //                 }
    //             },
    //             innerRadius: 0.2
    //         },
    //     legend: {
    //       show: false
    //     }
    //   }
    // });
  };

  this.MyQtisView = Ember.View.extend(t);

}).apply(LxxlApp);


