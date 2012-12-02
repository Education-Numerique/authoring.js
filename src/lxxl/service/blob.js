/*global Mingus*/
jsBoot.add(Mingus.xhr.digest).as('digest');

jsBoot.use('jsBoot.service.core');

jsBoot.pack('LxxlLib.service', function(api) {
  'use strict';
  var requestor = api.core.requestor;
  var SERVICE = 'blob';
  var CMD_DRAFT = 'draft';
  var CMD_PUBLISHED = 'published';

  this.blob = new (function() {

    this.update = function(onSuccess, onFailure, id, payload) {
      requestor.query(requestor.POST, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        // XXX Dirty trick while manu fixes his internal redirects lacking trailing slash
        command: '#',
        id: id,
        payload: payload || {}
      });
    };

    this.remove = function(onSuccess, onFailure, id) {
      requestor.query(requestor.DELETE, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        // XXX Dirty trick while manu fixes his internal redirects lacking trailing slash
        command: '#',
        id: id
      });
    };

    this.readDraft = function(onSuccess, onFailure, id){
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_DRAFT
      });
    };

    this.readPublished = function(onSuccess, onFailure, id){
      requestor.query(requestor.GET, {
        service: SERVICE,
        onsuccess: onSuccess,
        onfailure: onFailure,
        id: id,
        command: CMD_PUBLISHED
      });
    };

  })();

});