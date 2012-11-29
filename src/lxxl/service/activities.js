/*global Mingus*/
jsBoot.add(Mingus.xhr.digest).as('digest');

jsBoot.use('jsBoot.service.core');

jsBoot.pack('LxxlLib.service', function(api) {
  'use strict';
  var requestor = api.core.requestor;
  var SERVICE = 'activities';
  var CMD_SEEN = 'seen';
  var CMD_REPORT = 'report';
  var CMD_PUBLISH = 'publish';
  var CMD_UNPUBLISH = 'unpublish';
  var CMD_SEEN = 'seen';
  var CMD_SEEN = 'seen';

  this.activities = new (function() {

    this.list = function(onSuccess, onFailure){
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        command: '#'
      });
    };

    this.create = function(onSuccess, onFailure, payload) {
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        // XXX Dirty trick while manu fixes his internal redirects lacking trailing slash
        command: '#',
        payload: payload || {}
      });
    };

    this.patch = function(onSuccess, onFailure, id, payload){
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        // XXX Dirty trick while manu fixes his internal redirects lacking trailing slash
        id: id,
        command: '#',
        payload: payload || {}
      });
    };

    this.read = function(onSuccess, onFailure, id){
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: '#'
      });
    };

    this.remove = function(onSuccess, onFailure, id){
      requestor.query(requestor.DELETE, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: '#'
      });
    };


    this.publish = function(onSuccess, onFailure, id){
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_PUBLISH
      });
    };

    this.unpublish = function(onSuccess, onFailure, id){
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_UNPUBLISH
      });
    };

    this.seen = function(onSuccess, onFailure, id){
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_SEEN
      });
    };

    this.report = function(onSuccess, onFailure, id){
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_REPORT
      });
    };

  })();

});