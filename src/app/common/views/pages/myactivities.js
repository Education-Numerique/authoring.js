(function() {
  /*global moment:false*/
  'use strict';
  var t = this.lxxlPageView('pages/myactivities');

  var doPreview = function(node, activity) {
    var a = new LxxlLib.Masher();
    a.setupViewport(node, true);
    a.setupTemplate('{PUKE-PACKAGE-VERSION}/activity/activity.tpl');

    // LxxlLib.service.activities.readUrl(activity.id)
    a.showActivity(activity, function() {
    });
  };

  // Le moins qu'on puisse dire est que ce n'est ni très joli, ni très utile .... (JBT)
  var popoverContent = '<div class="thumbnail">{thumbnail}</div>' +
      '<h5>{nickname}</h5>' +
      '<div><span>{duration}</span>&nbsp;<span>{difficulty}</span></div>' +
      //'<div class="avatar">{useravatar}</div>' +
      '<div>{description}</div>';


  var will = function(arr, start, removeCount/*, addCount*/) {
    var nn = $('.mydrafts.data-table').dataTable();
    if (arr == pactivities) {
      nn = $('.mypublished.data-table').dataTable();
    }
    for (var x = start + removeCount - 1; x >= start; x--)
      nn.fnDeleteRow(x);
  };


  var did = function(arr, start, removeCount, addCount) {

    var nn = $('.mydrafts.data-table').dataTable();
    var cc = '.mydrafts';
    if (arr == pactivities) {
      nn = $('.mypublished.data-table').dataTable();
      cc = '.mypublished';
    }
    // console.warn(nn);
    //

    for (var x = start, item, infos; x < start + addCount; x++) {
      item = arr[x]; 
      //console.log(start+addCount); //TOTAL DES ACTIVITE draft et published
      if (cc == '.mydrafts')
        infos = item.draft;
      else
        infos = item.published;
      
      nn.fnAddData([
        '',
        '',
        infos.title,
        //        infos.duration.title,
        infos.difficulty.title,
        infos.matter.title, //Matière
        infos.level.title, //Niveau
        item.publicationDate || item.creationDate,
        //        item.seenCount,
        //        item.author.username,
        item.id
      ]);
     // console.log(nn.fnAddData);


    }

    nn.fnSort([[7, 'desc']]);
  };

  var TABLE_OPTIONS = {
    'fnRowCallback': function(nRow, aData/*, iDisplayIndex, iDisplayIndexFull*/) {
      var id = aData[aData.length - 1];
      // boucle sur toutes MyActivities
      // console.log(nRow);

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
          /* falls through */
        case 'normal':
          df += needle;
          /* falls through */
        default:
          /* falls through */
        case 'easy':
          df += needle;
          break;
      }
      ct = ct.replace('{difficulty}', df);
      ct = ct.replace('{useravatar}', item.author.avatarUrl ?
          '<img src="' + item.author.avatarUrl + '" />' :
          '');  // not used (JBT)
      ct = ct.replace('{description}', infos.description);
      preview.attr('data-html', ct);
      preview.attr('data-placement', 'right');
      preview.attr('rel', 'popover');

      preview.bind('click', function(/*e*/) {
        $('#modal-preview').modal({keyboard: false, backdrop: true});
        doPreview($('#modal-preview-body'), item);
        // Reset on exit
        $('#modal-preview').on('hide', function(e) {
          if ($(e.target).attr('id') == 'modal-preview') {
            infos.pages.forEach(function(p) {
              p.score = null;
              p.completed = null;
              if (p.questions)
                p.questions.forEach(function(q) {
                  q.score = null;
                  q.completed = false;
                });
            });
          }
        });

      });

      var button = $(nRow).find('td:eq(0)');
      button.html('<button class="icon-edit"></button>');

      button.bind('click', function(/*e*/) {
        LxxlApp.router.send('showActivityEdit', item);
      });

      if (infos.blobs.media.length || infos.blobs.attachments.length)
        return;
      /* WRENCH DESACTIVATE */
      // button = $(nRow).find('td:eq(2)');
      // button.html('<button class="icon-wrench" rel="tooltip" data-placement="right" ' +
      //    'title="Créer une nouvelle activité à partir de ce modèle"></button>');
      //
      // button.bind('click', function(/*e*/) {
      //   var onCreate = function() {
      //     act.draft = infos;// .toObject();
      //     act.push(function() {
      //       // Something is rotten in Denmark
      //        //act = LxxlLib.factories.activities.getActivity({id: act.id});
      //       LxxlApp.router.send('showActivityEdit', act);
      //     });
      //     act.removeObserver('id', onCreate);
      //   };

      //   var act = LxxlLib.factories.activities.getActivity();
      //   act.addObserver('id', onCreate);
      //   act.push();
      //   /* WRENCH DESACTIVATE */
        
      //   // Ember.run.next(function() {
      //   // });


      //   // LxxlApp.router.send('showActivityEdit', item);
      // });

      // console.log(preview.html('bite'));
    },
    'aoColumns': [
      null,
      null,
      null,
      null,
      null,
      null,
      { 'sType': 'date', 'mRender':
            function(date, type) {
              if (type == 'display')
                return moment(date).fromNow();

              return date;
            }
      },
      null
    ]
  };


  var activities,
      pactivities,
      dactivities;

  t.activities = [];

  var hookBack = function(id) {
    return activities.filter(function(item) {
      return item.id == id;
    }).pop();
  };

  t.willDestroyElement = function() {
    this.publishedActivities.removeArrayObserver(this, { willChange: will, didChange: did});
    this.draftActivities.removeArrayObserver(this, { willChange: will, didChange: did});
  };


  t.didInsertElement = function() {
    activities = this.activities;
    this.activities.replace(0, this.activities.length);
    pactivities = this.publishedActivities = [];
    dactivities = this.draftActivities = [];
    this.get('publishedActivities').addArrayObserver(this, { willChange: will, didChange: did});
    this.get('draftActivities').addArrayObserver(this, { willChange: will, didChange: did});

    // XXX listMine
    LxxlLib.service.activities.listMine(function(d) {
      activities.replace(0, activities.length);
      d.forEach(function(item) {
        var act = LxxlLib.factories.activities.getActivity(item);
        activities.pushObject(act);
        if (act.isPublished)
          pactivities.pushObject(act);
        else
          dactivities.pushObject(act);
      });
    }, Em.K);

    LxxlLib.behaviors.bindBehaviors(this.get('element'), TABLE_OPTIONS);
    this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.myactivities.title'));

    this._super();
  };

  this.MyActivitiesView = Ember.View.extend(t);

}).apply(LxxlApp);


