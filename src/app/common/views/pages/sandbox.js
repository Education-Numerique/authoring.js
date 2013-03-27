(function() {
  'use strict';
  var t = this.lxxlPageView('pages/sandbox');

  var doPreview = function(node, activity) {
    var a = new LxxlLib.Masher();
    a.setupViewport(node, true);
    a.setupTemplate('{PUKE-PACKAGE-VERSION}/activity/activity.tpl');

    // activity.published
    a.showActivity(LxxlLib.service.activities.readUrl(activity.id), function() {
      console.warn('All set baby!');
    }, true);
  };


  var popoverContent = '<div class="thumbnail">{thumbnail}</div>' +
      '<h5>{nickname}</h5>' +
      '<div><span>{duration}</span>&nbsp;<span>{difficulty}</span></div>' +
      '<div class="avatar">{useravatar}</div>' +
      '<div>{description}</div>';



  var will = function(arr, start, removeCount, addCount) {
    var nn = $('.sandbox.data-table').dataTable();
    for (var x = start + removeCount - 1; x >= start; x--)
      nn.fnDeleteRow(x);
  };


  var did = function(arr, start, removeCount, addCount) {

    var nn = $('.sandbox.data-table').dataTable();
    var cc = '.sandbox';

    for (var x = start, item, infos; x < start + addCount; x++) {
      item = arr[x];

      infos = item.published;

      nn.fnAddData([
        '',
        '',
        '',
        infos.title,
        // infos.duration.title,
        // infos.difficulty.title,
        // infos.matter.title, //Matière
        // infos.level.title, //Niveau
        moment(item.publicationDate || item.creationDate).fromNow(),
        item.seenCount,
        item.author.username,
        item.id
      ]);


    }
    // nn.fnSort([4, 'asc']);
  };

  var TABLE_OPTIONS = {
    'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var id = aData[aData.length - 1];

      if ($(nRow).attr('data-rid'))
        return;


      $(nRow).attr('data-rid', id);
      var preview = $(nRow).find('td:eq(1)');
      var item = hookBack(id);

      var infos = item.isPublished ? item.published : item.draft;

      preview.attr('data-title', infos.title);
      preview.html('<button class="icon-eye-open"></button>');
      var ct = popoverContent.replace('{nickname}', item.author.username);
      ct = ct.replace('{thumbnail}', infos.thumbnailUrl ?
          '<img src="' + infos.thumbnailUrl + '" />' :
          '');
      ct = ct.replace('{duration}', infos.duration.title);
      var needle = '<span class="icon-warning-sign" />';
      var df = '';
      switch (infos.difficulty.id) {
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
      ct = ct.replace('{useravatar}', '<div><img src="' + LxxlLib.service.user.avatar.getUrl(item.author.uid) +
          '" /></div>');
      ct = ct.replace('{description}', infos.description);
      preview.attr('data-html', ct);
      preview.attr('data-placement', 'right');
      preview.attr('rel', 'popover');

      preview.bind('click', function(e) {
        $('#modal-preview').modal({keyboard: false, backdrop: true});
        doPreview($('#modal-preview-body'), item);
      });

      var button = $(nRow).find('td:eq(0)');
      button.html('<button class="icon-edit"></button>');

      button.bind('click', function(e) {
        LxxlApp.router.send('showActivityEdit', item);
      });

      if (item.published.blobs.media.length || item.published.blobs.attachments.length)
        return;
      button = $(nRow).find('td:eq(2)');
      button.html('<button class="icon-wrench" rel="tooltip" data-placement="right" ' +
          'title="Créer une nouvelle activité à partir de ce modèle"></button>');

      button.bind('click', function(e) {
        console.warn('Fork activity', item.published.toObject());
        var onCreate = function() {
          act.draft = item.published;// .toObject();
          act.push(function() {
            // Something is rotten in Denmark
            // act = LxxlLib.factories.activities.getActivity({id: act.id});
            LxxlApp.router.send('showActivityEdit', act);
          });
          act.removeObserver('id', onCreate);
        };

        var act = LxxlLib.factories.activities.getActivity();
        act.addObserver('id', onCreate);
        act.push();
        // Ember.run.next(function() {
        // });


        // LxxlApp.router.send('showActivityEdit', item);
      });



      // console.log(preview.html('bite'));
    }
  };


  var activities = t.activities = [];

  var hookBack = function(id) {
    return activities.filter(function(item) {
      return item.id == id;
    }).pop();
  };

  t.willDestroyElement = function() {
    this.filteredActivities.removeArrayObserver(this, { willChange: will, didChange: did});
  };

  t.dataReady = false;

  var fach = t.filteredActivities = [];

  var colors = ['#abbd2b', '#79961e', '#af4227', '#8e2f1c', '#d23a95', '#b13d7b', '#6eb4ce', '#3b86ae'];

  var matterRestrict;
  var hashMatters = Ember.Object.create({});
  var innerMatters = [];

  var allM = 'toutes les matières';
  t.displayMatter = allM;

  t._drawIt = (function() {
    if (this.get('dataReady')) {
      drawPie();
      drawPieLevel();
    }
  }.observes('dataReady'));

  t.matters = (function() {
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

  t.clickyClickMatter = function(d) {
    matterRestrict = (d.context == 'reset') ? null : d.context;
    this.set('displayMatter', matterRestrict ? hashMatters[matterRestrict].title : allM);
    // console.warn('Click on my ass', d, d.target, $(d.target).parent());
    d = $(d.target);
    d.parent().parent().children('li').removeClass('active');
    d.parent().addClass('active');
    if (matterRestrict)
      piePie.onclick(piePie.controllers[hashMatters[matterRestrict].index]);
    else {
      $('#piepie + ul li').removeClass('hovering');
      $('#piepie + ul li').removeClass('active');
      active.doMouseOut();
      active.active = null;
    }
    levelRestrict = null;
    this.set('displayLevel', allL);
    this.set('_dirtyTrick', Date.now());
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
      horrible.set('displayMatter', hashMatters[matterRestrict].title);
      horrible.set('_dirtyTrick', Date.now());
      rehash();
    };
  };


  var rehash = function() {
    fach.replace(0, fach.length);
    activities.forEach(function(item) {
      if ((!matterRestrict || item.published.matter.id == matterRestrict) &&
          (!levelRestrict || item.published.level.id == levelRestrict))
        fach.pushObject(item);
    });
  };



  var levelRestrict;
  var hashLevels = Ember.Object.create({});
  var innerLevels = [];

  t._dirtyTrick = null;
  var allL = 'tous les niveaux';
  t.displayLevel = allL;

  t.levels = (function() {
    console.warn('**** using levels');
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

  t.clickyClickLevel = function(d) {
    levelRestrict = (d.context == 'reset') ? null : d.context;
    this.set('displayLevel', levelRestrict ? hashLevels[levelRestrict].title : allL);
    // console.warn('Click on my ass', d, d.target, $(d.target).parent());
    d = $(d.target);
    d.parent().parent().children('li').removeClass('active');
    d.parent().addClass('active');
    if (levelRestrict)
      piePieLev.onclick(piePieLev.controllers[hashLevels[levelRestrict].index]);
    else {
      $('#piepielevel + ul li').removeClass('hovering');
      $('#piepielevel + ul li').removeClass('active');
      activeLevel.doMouseOut();
      activeLevel.active = null;
    }
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
      horrible.set('displayLevel', hashLevels[levelRestrict].title);
      rehash();
    };
  };

  var horrible;

  t.didInsertElement = function() {
    horrible = this;
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

    console.warn('did insert stuff');
    this.activities.replace(0, this.activities.length);
    rehash();

    this.activities.replace(0, this.activities.length);
    this.get('filteredActivities').addArrayObserver(this, { willChange: will, didChange: did});

    LxxlLib.service.activities.listPublished((function(d) {
      d.forEach(function(item) {
        var act = LxxlLib.factories.activities.getActivity(item);
        if (act.isPublished) {
          this.activities.pushObject(act);
        }
      }, this);
      rehash();
      this.set('dataReady', true);
    }.bind(this)), function() {
      // Errrr
    });

    LxxlLib.behaviors.bindBehaviors(this.get('element'), TABLE_OPTIONS);
    this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.sandbox.title'));

    this._super();
  };





  this.SandboxView = Ember.View.extend(t);


}).apply(LxxlApp);


