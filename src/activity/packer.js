(function() {

  'use strict';

  window.ScormPacker = function(id, title, callback) {
    var list = [
      'activity/LICENSE.txt',
      'activity/scorm.html',
      'pack.js',
      'pack.css',
      'activity/activity.css',
      'activity/activity.js',
      'activity/lxxl-standalone-library.js',
      'activity/scoring.js',
      'activity/activity.tpl',
      'activity/apiwrapper.js',
      'LICENSE.txt',

      'adlcp_rootv1p2.xsd',
      'ims_xml.xsd',
      'imscp_rootv1p1p2.xsd',
      'imsmanifest.xml',
      'imsmd_rootv1p2p1.xsd',
      // location.protocol +
      '//api.education-et-numerique.fr/1.0/activities/' + id + '/public'
    ];

    //       'activity/activity.json',

    var bootRoot = '{PUKE-PACKAGE-VERSION}/';
    var zip = new JSZip();

    var count = 0;
    list.forEach(function(item) {
      var path = item;
      count++;
      if (/scorm/.test(location.href))
      {
        if (!/^\/\//.test(item))
          path = '../' + item;
      }else {
        if (!/^\/\//.test(item))
          path = bootRoot + '/' + item;
      }
      var x = new XMLHttpRequest();
      // x.open('GET', bootRoot + '/' + item, true);
      x.open('GET', path, true);
      // x.responseType = "arraybuffer";
      // x.overrideMimeType("text/plain; charset=x-user-defined");
      x.onreadystatechange = function(e) {
        var finalKey;
        var content = x.responseText;
        if ((x.readyState == x.DONE)) {
          if (/^\/\//.test(item))
            finalKey = 'activity/activity.json';
          else
            finalKey = item;

          if (/imsmanifest/.test(item)) {
            content = content.replace(/{{title}}/g, title);
          }
          zip.file(finalKey, content);
          count--;
          if (!count)
            callback(zip);
        }
      };
      x.send();
    });
  };

})();
