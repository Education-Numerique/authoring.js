/**
 * @file
 * @summary Sandbox controller
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/controllers/pages/sandbox.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';

  // All that stupid gymnastic is meant to splice together damn dataTable and Handlebars together.
  // Technically, both do manipulate the DOM in incompatible ways, so, we have to override HB
  // entirely and replace it with DT inner methods calls.
  var ctl = new (function() {

    var ach = this.activities = [];
    var fach = this.filteredActivities = [];

    var colors = ['#abbd2b', '#79961e', '#af4227', '#8e2f1c', '#d23a95', '#b13d7b', '#6eb4ce', '#3b86ae'];

    var matterRestrict;
    var hashMatters = Ember.Object.create({});
    var innerMatters = [];

    var allM = 'toutes les matières';
    this.displayMatter = allM;

    this.domReady = false;
    this.dataReady = false;



    this._drawIt = (function() {
      if (this.get('domReady') && this.get('dataReady')) {
        drawPie();
        drawPieLevel();
      }
    }.observes('domReady', 'dataReady'));

    this.matters = (function() {
      if (!innerMatters.length) {
        LxxlLib.factories.metadata.matters.forEach(function(item, idx) {
          var mt = Ember.Object.create({
            id: item.id,
            title: item.title,
            count: 0
            /*, (idx * 2 + 1) % colors.length]*/
          });
          hashMatters.set(item.id, mt);
          innerMatters.pushObject(mt);
        });
      }
      innerMatters.forEach(function(i) {
        i.set('count', 0);
      });
      var a = this.get('activities');
      a.forEach(function(j) {
        hashMatters[j.published.matter.id].set('count', hashMatters[j.published.matter.id].get('count') + 1);
      });

      var x = 0;
      innerMatters.forEach(function(i) {
        if (i.get('count')) {
          i.set('style', 'background-color: ' + colors[(x * 2) % colors.length]);
          i.set('index', x);
          x++;
        }else {
          i.set('index', -1);
        }
      });

      return innerMatters;
    }).property('LxxlLib.factories.metadata.matters.@each', 'activities.@each');

    this.clickyClickMatter = function(d) {
      matterRestrict = (d.context == 'reset') ? null : d.context;
      this.set('displayMatter', matterRestrict ? hashMatters[matterRestrict].title : allM);
      // console.warn('Click on my ass', d, d.target, $(d.target).parent());
      d = $(d.target);
      d.parent().parent().children('li').removeClass('active');
      d.parent().addClass('active');
      if (matterRestrict)
        piePie.onclick(piePie.controllers[hashMatters[matterRestrict].index]);
      levelRestrict = null;
      this.set('displayLevel', allL);
      LxxlApp.router.sandboxController.set('_dirtyTrick', Date.now());
      rehash();
    };

    var active = null;

    var piePie;
    var drawPie = function() {
      piePie = new LxxlLib.widgets.ApplePie($('#piepie')[0]);
      piePie.halign = piePie.CENTER;
      piePie.reverse = false;
      piePie.fill = true;
      piePie.mode = piePie.FULL;
      piePie.addColor('#abbd2b', '#79961e');
      piePie.addColor('#af4227', '#8e2f1c');
      piePie.addColor('#d23a95', '#b13d7b');
      piePie.addColor('#6eb4ce', '#3b86ae');
      piePie.bind({array: innerMatters, valueKey: 'count', labelKey: 'title'});

      piePie.onover = function(sector) {
        if (!sector.active) {
          sector.doMouseOver();
          $($('#piepie + ul li')[sector.index]).addClass('hovering');
        }
      };
      piePie.onout = function(sector) {
        if (!sector.active) {
          sector.doMouseOut();
          $($('#piepie + ul li')[sector.index]).removeClass('hovering');
        }
      };
      piePie.onclick = function(sector) {
        if (active && active != sector) {
          active.doMouseOut();
          $($('#piepie + ul li')[active.index]).removeClass('active');
          active.active = null;
        }
        $($('#piepie + ul li')[sector.index]).removeClass('hovering');
        $($('#piepie + ul li')[sector.index]).addClass('active');
        sector.doMouseOver();
        sector.active = true;

        active = sector;
        matterRestrict = innerMatters.filter(function(item) {
          return item.index == sector.index;
        }).pop().id;
        LxxlApp.router.sandboxController.set('displayMatter', hashMatters[matterRestrict].title);
        LxxlApp.router.sandboxController.set('_dirtyTrick', Date.now());
        rehash();
      };
    };





    var levelRestrict;
    var hashLevels = Ember.Object.create({});
    var innerLevels = [];

    this._dirtyTrick = null;
    var allL = 'tous les niveaux';
    this.displayLevel = allL;

    this.levels = (function() {
      if (!innerLevels.length) {
        LxxlLib.factories.metadata.levels.forEach(function(item, idx) {
          var mt = Ember.Object.create({
            id: item.id,
            title: item.title,
            count: 0
            /*, (idx * 2 + 1) % colors.length]*/
          });
          hashLevels.set(item.id, mt);
          innerLevels.pushObject(mt);
        });
      }
      innerLevels.forEach(function(i) {
        i.set('count', 0);
      });
      var a = this.get('activities');
      a.forEach(function(j) {
        if (!matterRestrict || j.published.matter.id == matterRestrict)
          hashLevels[j.published.level.id].set('count', hashLevels[j.published.level.id].get('count') + 1);
      });

      var x = 0;
      innerLevels.forEach(function(i) {
        if (i.get('count')) {
          i.set('style', 'background-color: ' + colors[(x * 2) % colors.length]);
          i.set('index', x);
          x++;
        }else {
          i.set('index', -1);
        }
      });

      return innerLevels;
    }).property('LxxlLib.factories.metadata.levels.@each', 'activities.@each', '_dirtyTrick');

    this.clickyClickLevel = function(d) {
      levelRestrict = (d.context == 'reset') ? null : d.context;
      this.set('displayLevel', levelRestrict ? hashLevels[levelRestrict].title : allL);
      // console.warn('Click on my ass', d, d.target, $(d.target).parent());
      d = $(d.target);
      d.parent().parent().children('li').removeClass('active');
      d.parent().addClass('active');
      if (levelRestrict)
        piePieLev.onclick(piePieLev.controllers[hashLevels[levelRestrict].index]);
      rehash();
    };

    var activeLevel = null;

    var piePieLev;
    var drawPieLevel = function() {
      console.warn('drawing piepie');
      piePieLev = new LxxlLib.widgets.ApplePie($('#piepielevel')[0]);
      piePieLev.halign = piePieLev.CENTER;
      piePieLev.reverse = false;
      piePieLev.fill = true;
      piePieLev.mode = piePieLev.FULL;
      piePieLev.addColor('#abbd2b', '#79961e');
      piePieLev.addColor('#af4227', '#8e2f1c');
      piePieLev.addColor('#d23a95', '#b13d7b');
      piePieLev.addColor('#6eb4ce', '#3b86ae');
      piePieLev.bind({array: innerLevels, valueKey: 'count', labelKey: 'title'});

      piePieLev.onover = function(sector) {
        if (!sector.active) {
          sector.doMouseOver();
          $($('#piepielevel + ul li')[sector.index]).addClass('hovering');
        }
      };
      piePieLev.onout = function(sector) {
        if (!sector.active) {
          sector.doMouseOut();
          $($('#piepielevel + ul li')[sector.index]).removeClass('hovering');
        }
      };
      piePieLev.onclick = function(sector) {
        if (activeLevel && activeLevel != sector) {
          activeLevel.doMouseOut();
          $($('#piepielevel + ul li')[activeLevel.index]).removeClass('active');
          activeLevel.active = null;
        }
        $($('#piepielevel + ul li')[sector.index]).removeClass('hovering');
        $($('#piepielevel + ul li')[sector.index]).addClass('active');
        sector.doMouseOver();
        sector.active = true;

        activeLevel = sector;
        levelRestrict = innerLevels.filter(function(item) {
          return item.index == sector.index;
        }).pop().id;
        LxxlApp.router.sandboxController.set('displayLevel', hashLevels[levelRestrict].title);
        rehash();
      };
    };

    // var hashLevels = Ember.Object.create({});
    // var innerLevels = [];

    // this.levels = (function(){
    //   if(!innerLevels.length){
    //     LxxlLib.factories.metadata.levels.forEach(function(item, idx){
    //       var mt = Ember.Object.create({
    //         id: item.id,
    //         title: item.title,
    //         count: 0
    //         /*, (idx * 2 + 1) % colors.length]*/
    //       });
    //       hashLevels.set(item.id, mt);
    //       innerLevels.pushObject(mt);
    //     });
    //   }
    //   innerLevels.forEach(function(i){
    //     i.set('count', 0);
    //   });
    //   var a = this.get('activities');
    //   a.forEach(function(j){
    //     hashLevels[j.published.level.id].set('count', hashLevels[j.published.level.id].get('count') + 1);
    //   });
    //   return innerLevels;
    // }).property('LxxlLib.factories.metadata.levels', 'activities');







    this.pull = function() {
      if (piePie) {
        piePie.destroy();
        try {
          piePie.underpie.remove();
        }catch (e) {

        }
        piePie = null;
      }
      if (piePieLev) {
        piePieLev.destroy();
        try {
          piePieLev.underpie.remove();
        }catch (e) {

        }
        piePieLev = null;
        this.set('dataReady', false);
      }

      matterRestrict = null;
      levelRestrict = null;
      this.set('displayLevel', allL);
      this.set('displayMatter', allM);
      innerMatters.replace(0, innerMatters.length);
      innerLevels.replace(0, innerLevels.length);
      hashMatters = Ember.Object.create({});
      hashLevels = Ember.Object.create({});
      LxxlLib.service.activities.listPublished((function(d) {
        this.activities.replace(0, this.activities.length);
        d.forEach(function(item) {
          var act = LxxlLib.factories.activities.getActivity(item);
          if (act.isPublished) {
            this.activities.pushObject(act);
          }
        }, this);
        this.set('dataReady', true);
      }.bind(this)), function() {
        // Errrr
      });


    };

    var doPreview = function(node, activity) {
      var a = new LxxlLib.Masher();
      a.setupViewport(node, true);
      // a.addStyle('body{background-color: blue;}');
      /*
    a.addStyle('http://static.loft.sn.ackitup.net:4242/lib/frameworks/normalize/normalize-2.0.css');
    */
      a.setupTemplate('{PUKE-PACKAGE-VERSION}/activity/activity.tpl');

      a.showActivity(activity.published, function() {
        console.warn('All set baby!');
      });
    };

    var will = function(arr, start, removeCount, addCount) {
      var nn = $('.sandbox.data-table').dataTable();
      for (var x = start + removeCount - 1; x >= start; x--)
        nn.fnDeleteRow(x);
    };

    // var clickHandler = function(e){
    //   var t = e.target;
    // };

    // XXX
    // $('.data-table button').bind('click', clickHandler)


    var popoverContent = '<div class="thumbnail">{thumbnail}</div>' +
        '<h5>{nickname}</h5>' +
        '<div><span>{duration}</span>&nbsp;<span>{difficulty}</span></div>' +
        '<div class="avatar">{useravatar}</div>' +
        '<div>{description}</div>';

    var did = function(arr, start, removeCount, addCount) {

      var nn = $('.sandbox.data-table').dataTable({
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
          console.log(arguments);
        }
      });
      for (var x = start, item; x < start + addCount; x++) {
        item = arr[x];
        if (!item.published.duration)
          item.published.duration = {title: '', id: 0};

        if (!item.published.difficulty)
          item.published.difficulty = {title: '', id: 0};

        nn.fnAddData([
          '',
          '',
          item.published.title,
          moment(item.publicationDate).fromNow(),
          item.seenCount,
          /*item.published.duration.title,
          item.published.difficulty.title,
          item.author.username,*/
          item.id
        ]);
        var s = $('.sandbox.data-table tbody tr:last-of-type td:first-child+td');
        s.attr('data-title', item.published.title);
        var ct = popoverContent.replace('{nickname}', item.author.username);
        ct = ct.replace('{thumbnail}', item.published.thumbnailUrl ?
            '<img src="' + item.published.thumbnailUrl + '" />' :
            '');
        ct = ct.replace('{duration}', item.published.duration.title);
        var needle = '<span class="icon-warning-sign" />';
        var df = '';
        switch (item.published.difficulty.id) {
          case 'hard':
            df += needle;
          case 'normal':
            df += needle;
          default:
          case 'easy':
            df += needle;
            break;
        }
        ct = ct.replace('{difficulty}', df);
        ct = ct.replace('{useravatar}', item.author.avatarUrl ?
            '<img src="' + item.author.avatarUrl + '" />' :
            '');
        ct = ct.replace('{description}', item.published.description);
        s.attr('data-html', ct);
        s.attr('data-placement', 'right');
        s.attr('rel', 'popover');
      }

      $('.sandbox.data-table tr>td:first-child').each(function(ind, item) {
        item = $(item);
        if (!item.html()) {
          item.html('<button class="icon-edit"></button>');
          item.bind('click', function(e) {
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            LxxlApp.router.send('showActivityEdit', {id: id});
          });
        }
      });

      $('.sandbox.data-table tr>td:first-child+td').each(function(ind, item) {
        item = $(item);
        if (!item.html()) {
          item.html('<button class="icon-eye-open"></button>');
          item.bind('click', function(e) {
            $('#modal-preview').modal({keyboard: false, backdrop: true});
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            var a = ach.filter(function(item) {
              return item.id == id;
            }).pop();
            doPreview($('#modal-preview-body'), a);
          });
        }
      });

      /*
      */
      // $('.sandbox')html
    };

    this.filteredActivities.addArrayObserver(this, { willChange: will, didChange: did});


    var rehash = function() {
      fach.replace(0, fach.length);
      ach.forEach(function(item) {
        if ((!matterRestrict || item.published.matter.id == matterRestrict) &&
            (!levelRestrict || item.published.level.id == levelRestrict))
          fach.pushObject(item);
      });
    };

    this.activities.addArrayObserver(this, { willChange: function() {}, didChange: rehash});

  })();

  window.SHIT = this.SandboxController = Ember.ObjectController.extend(ctl);


  // {{#collection contentBinding="activities" tagName="tbody"}}
  //     <td class="user-reviewer"><button {{action showActivityEdit this href=true}} class="icon-edit"></button></td>
  //     <td><button {{action showPlayQTI this href=true}} class="icon-eye-open"></button></td>
  //     <td>{{view.content.title}}</td>
  //     <td>
  //       {{moment view.content.controller.publicationDate fromNow="false"}}
  //     </td>
  //     <td>{{view.content.controller.seenCount}}</td>
  //     <td>{{view.content.length.title}}</td>
  //     <td>{{view.content.difficulty.title}}</td>
  //     <td>{{view.content.controller.author.username}}</td>
  // {{/collection}}


  /*
    qti: (function() {
      var ret = [
        {id: 'abc', author: 'Roger Doe', title: 'Stuff', category: 'Anglais pas littéraire'},
        {id: 'cde', author: 'Jane Doe', title: 'Stuff 2', category: 'Maths'}
      ];
      for (var x = 0; x < 150; x++)
        ret.push({id: x, author: 'Roger', title: 'Stuff' + x, category: 'Maths > ' + Math.round(10 * Math.random())});
      return ret;
    })(),

    authors: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.author in o))
          o[item.author] = 0;
        o[item.author]++;
      });
      return o;
    }.property('qti'),

    categories: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.category in o))
          o[item.category] = 0;
        o[item.category]++;
      });
      return o;
    }.property('qti'),

    nbActivities: function() {
      return this.get('qti').length;
    }.property('qti'),

    nbCategories: function() {
      return Object.keys(this.get('categories')).length;
    }.property('categories'),

    nbAuthors: function() {
      return Object.keys(this.get('authors')).length;
    }.property('authors')
    */


}).apply(LxxlApp);
