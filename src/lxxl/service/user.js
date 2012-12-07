/*global Mingus*/
jsBoot.add(Mingus.xhr.digest).as('digest');

jsBoot.use('jsBoot.service.core');

jsBoot.pack('LxxlLib.service', function(api) {
  'use strict';
  var requestor = api.core.requestor;

  // User sub commands
  var SERVICE = 'users';
  var USER_PROFILE = 'profile';
  var USER_AVATAR = 'avatar';
  var USER_SETTINGS = 'settings';
  var USER_PREFERENCES = 'preferences';
  var USER_CMD_LIST = 'list';

  this.user = new (function() {

    this.list = function(onSuccess, onFailure) {
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        command: USER_CMD_LIST
      });
    };

    this.profile = new (function(){
      this.push = function(onSuccess, onFailure, payload) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: api.core.id,
          command: USER_PROFILE,
          payload: payload
        });
      };

      this.pull = function(onSuccess, onFailure, id) {
        requestor.query(requestor.GET, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
          command: USER_PROFILE
        });
      };
    })();

    this.preferences = new (function(){
      this.push = function(onSuccess, onFailure, payload) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: api.core.id,
          command: USER_PREFERENCES,
          payload: payload
        });
      };

      this.pull = function(onSuccess, onFailure, id) {
        requestor.query(requestor.GET, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
          command: USER_PREFERENCES
        });
      };
    })();

    this.settings = new (function(){
      this.push = function(onSuccess, onFailure, payload) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: api.core.id,
          command: USER_SETTINGS,
          payload: payload
        });
      };

      this.pull = function(onSuccess, onFailure, id) {
        requestor.query(requestor.GET, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
          command: USER_SETTINGS
        });
      };
    })();

    this.avatar = new (function(){
      this.LARGE = 'large';
      this.MEDIUM = 'medium';
      this.THUMBNAIL = 'thumbnail';
      this.SQUARE = 'square';

      this.push = function(onSuccess, onFailure, payload) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: api.core.id,
          command: USER_AVATAR,
          payload: payload
        });
      };

      this.getUrl = function(w, id) {
        /*jshint regexp:false*/
        // XXX IMPLEMENT ME
        switch (w) {
          case this.THUMBNAIL:
          case this.SQUARE:
          case this.MEDIUM:
          case this.LARGE:
            break;
          default:
            w = this.THUMBNAIL;
            break;
        }

        var url = '/' + requestor.version + '/' + USER;
        if (id)
          url += '/' + id;

        var seed = Math.round(Math.abs((url.charCodeAt(url.length - 5) - 28) / 10));
        var crap = requestor.hostPort.replace(/^([^.]+)(\..*)/, '$1' + seed + '$2');

        url += '/' + USER_AVATAR + '/' + w;
        return '//' + crap + url;
      };

    })();

  })();

});

