/*global Mingus*/
jsBoot.add(Mingus.xhr.digest).as('digest');

jsBoot.use('jsBoot.service.core');

jsBoot.pack('LxxlLib.service', function(api) {
  'use strict';
  var requestor = api.core.requestor;

  // User sub commands
  var SERVICE = 'users';
  var ACL = 'acl';
  var USER_PROFILE = 'profile';
  var USER_AVATAR = 'avatar';
  var USER_SETTINGS = 'settings';
  var USER_PREFERENCES = 'preferences';
  var USER_REMINDER = 'reminder';
  var USER_DEACTIVATE = 'deactivate';
  var CHANGE_PASSWORD = 'password';
  // var USER_CMD_LIST = 'list';

  this.user = new (function() {

    this.list = function(onSuccess, onFailure) {
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure
        // command: USER_CMD_LIST
      });
    };

    this.deactivate = function(onSuccess, onFailure, uid) {
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: uid,
        command: USER_DEACTIVATE
      });
    };

    this.changePassword = function(onSuccess, onFailure, uid, newPass) {
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: uid,
        command: CHANGE_PASSWORD,
        payload: {
          password: newPass
        }
      });
    };

    this.reminderChangePassword = function(onSuccess, onFailure, email, code, password) {
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        command: USER_REMINDER,
        payload: {
          email: email,
          code: code,
          password: password
        }
      });
    };

    this.reminderRequestPassword = function(onSuccess, onFailure, email) {
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        command: USER_REMINDER + '?email=' + email
      });
    };

    this.profile = new (function() {
      this.push = function(onSuccess, onFailure, payload, id) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
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

    this.acl = new (function() {
      this.push = function(onSuccess, onFailure, id, level) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id,
          command: ACL + '/' + (level == 3 ? 'admin' : 'author'),
          payload: {}
        });
      };
    })();

    this.preferences = new (function() {
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

    this.settings = new (function() {
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

    this.avatar = new (function() {

      this.push = function(onSuccess, onFailure, payload, id) {
        requestor.query(requestor.POST, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
          command: USER_AVATAR,
          payload: payload
        });
      };

      this.remove = function(onSuccess, onFailure, id) {
        requestor.query(requestor.DELETE, {
          service: SERVICE,
          onsuccess: onSuccess,
          onfailure: onFailure,
          id: id || api.core.id,
          command: USER_AVATAR
        });
      };

      this.getUrl = function(id) {
        /*jshint regexp:false*/
        var url = '/' + requestor.version + '/' + SERVICE;
        if (id)
          url += '/' + id;

        // var seed = Math.round(Math.abs((url.charCodeAt(url.length - 5) - 28) / 10));
        // var crap = requestor.hostPort.replace(/^([^.]+)(\..*)/, '$1' + seed + '$2');

        url += '/' + USER_AVATAR;
        return '//' + requestor.hostPort + url;
      };

    })();

  })();

});

