(function() {
  'use strict';

  window.API = {};
  ['Initialize', 'Terminate', 'GetValue', 'SetValue', 'Commit', 'GetLastError', 'GetErrorString', 'GetDiagnostic'].forEach(function(key){
    window.API[key] = function(){
      console.log('Fake LMS API debug. Method:', key, 'args', arguments);
    };
  });

  /*
  SCORM 2004 (API_1484_11)

  Initialize( “” ) : bool
  Terminate( “” ) : bool
  GetValue( element : CMIElement ) : string
  SetValue( element : CMIElement, value : string) : string
  Commit( “” ) : bool
  GetLastError() : CMIErrorCode
  GetErrorString( errorCode : CMIErrorCode ) : string
  GetDiagnostic( errocCode : CMIErrorCode ) : string

  SCORM 1.1 / SCORM 1.2

  LMSInitialize( “” ) : bool
  LMSFinish( “” ) : bool
  LMSGetValue( element : CMIElement ) : string
  LMSSetValue( element : CMIElement, value : string) : string
  LMSCommit( “” ) : bool
  LMSGetLastError() : CMIErrorCode
  LMSGetErrorString( errorCode : CMIErrorCode ) : string
  LMSGetDiagnostic( errocCode : CMIErrorCode ) : string
  */

  var findAPI = function(win) {
    var findAPITries = 0;
    while (!('API_1484_11' in win) && !('API' in win) && win.parent && (win.parent != win))
    {
      findAPITries++;
      if (findAPITries > 10)
        return null;

      win = win.parent;
    }
    return (('API_1484_11' in win) && win.API_1484_11) || (('API' in win) && win.API);
  };

  // local variable definitions
  var api;

  var initHandler = function( ){
    if(!api){
      api = findAPI(window) || (window.opener && findAPI(window.opener));
      // Mapping of 1.1 / 1.2 into 2004 API
      if(api && ('LMSInitialize' in api)){
        api.Initialize = api.LMSInitialize;
        api.Terminate = api.LMSFinish;
        api.GetValue = api.LMSGetValue;
        api.SetValue = api.LMSSetValue;
        api.Commit = api.LMSCommit;
        api.GetLastError = api.LMSGetLastError;
        api.GetErrorString = api.LMSGetErrorString;
        api.GetDiagnostic = api.LMSGetDiagnostic;
        scormAPI.deprecated = true;
      }
    }
    scormAPI.hasAPI = !!api;
  };

  var scormAPI = {};

  scormAPI.hasAPI = false;
  scormAPI.deprecated = false;

  scormAPI.errors = {
    NO_ERROR: 0,
    GENERAL_EXCEPTION: 101,
    GENERAL_INITIALIZATION_FAILURE: 102,
    ALREADY_INITIALIZED: 103,
    CONTENT_INSTANCE_TERMINATED: 104,
    GENERAL_TERMINATION_FAILURE: 111,
    TERMINATION_BEFORE_INITIALIZATION: 112,
    TERMINATION_AFTER_TERMINATION: 113,
    RETRIEVE_DATA_BEFORE_INITIALIZATION: 122,
    RETRIEVE_DATA_AFTER_TERMINATION: 123,
    STORE_DATA_BEFORE_INITIALIZATION: 132,
    STORE_DATA_AFTER_TERMINATION: 133,
    COMMIT_BEFORE_INITIALIZATION: 142,
    COMMIT_AFTER_TERMINATION: 143,
    GENERAL_ARGUMENT_ERROR: 201, // 1.1 / 1.2 was invalid argument error
    ELEMENT_CANNOT_HAVE_CHILDREN: 202, // 1.1 / 1.2 only
    ELEMENT_NOT_AN_ARRAY: 203, // 1.1 / 1.2 only
    GENERAL_GET_FAILURE: 301, // 1.1 / 1.2 was Not initialized
    GENERAL_SET_FAILURE: 351,
    GENERAL_COMMIT_FAILURE: 391,
    UNDEFINED_DATA_MODEL_ELEMENT: 401, // 1.1 / 1.2 was not implemented
    UNIMPLEMENTED_DATA_MODEL_ELEMENT: 402,// 1.1 / 1.2 was Invalid set value, element is a keyword
    DATA_MODEL_ELEMENT_VALUE_NOT_INITIALIZED: 403,// 1.1 / 1.2 was Element is read only.
    DATA_MODEL_ELEMENT_IS_READ_ONLY: 404,// 1.1 / 1.2 was Element is write only
    DATA_MODEL_ELEMENT_IS_WRITE_ONLY: 405,// 1.1 / 1.2 was Incorrect Data Type
    DATA_MODEL_ELEMENT_TYPE_MISMATCH: 406,
    DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE: 407,
    DATA_MODEL_DEPENDENCY_NOT_ESTABLISHED: 408
  };

  /**
   * This higher level API doesn't allow double init or double close, and provide a simplified model for manipulating
   * values
   */

  var initialized = false;
  scormAPI.boot = function(){
    initHandler();
    if(!api)
      return;
    return initialized || (initialized = api.Initialize(''));
  };

  scormAPI.shutdown = function(){
    if(!api)
      return;
    // Failure to terminate will leave initialized at true and api as it was.
    return (!initialized || !(initialized = !api.Terminate(''))) && !(api == null);
  };


  scormAPI.getLastError = function()
  {
    if (!api)
      return {
        code: scormAPI.errors.GENERAL_EXCEPTION,
        name: 'GENERAL_EXCEPTION',
        message: 'Unable to locate the LMS\'s API Implementation. Cannot determine LMS error code.'
      };

    var code = api.GetLastError();
    if (code == scormAPI.errors.NO_ERROR)
      return null;

    return {code: code, name: api.GetErrorString(code).toUpperCase().replace(/ /g, '_'), message: api.GetDiagnostic(code)};
  };

  scormAPI.getValue = function(name)
  {
    if(!api)
      return;
    var result = api.GetValue(name);
    // Might throw / should do something smarter
    if (api.GetLastError() != scormAPI.errors.NO_ERROR)
      return;
    return result;
  };

  scormAPI.setValue = function(name, value)
  {
    if(!api)
      return;
    return api.SetValue(name, value.toString());
  };

  scormAPI.commit = function(name, value)
  {
    if(!api)
      return;
    return api.Commit('');
  };


  scormAPI.status = {
    PASSED: 'passed',
    COMPLETED: 'completed',
    FAILED: 'failed',
    INCOMPLETE: 'incomplete',
    BROWSED: 'browsed',
    NO_ATM: 'not attempted'
  };

  scormAPI.statusKeys = {};
  Object.keys(scormAPI.status).forEach(function(key){
    scormAPI.statusKeys[scormAPI.status[key]] = key;
  });

  var statusPool = LxxlLib.model.getPooledMutable({
    id: '',
    title: ''
  });

  var getStatus = function(id){
    return new statusPool({id: id});
  };

  // Init status
  Object.keys(scormAPI.status).forEach(function(id){
    new status({id: id, title: scormAPI.status[id]});
  });

  scormAPI.mode = {
    BROWSER: 'browse',
    NORMAL: 'normal',
    REVIEW: 'review'
  };

  scormAPI.exit = {
    TIME_OUT: 'time-out',
    SUSPEND: 'suspend',
    LOGOUT: 'logout',
    NULL: ''
  };


  var mapper = function(cacheHolder, key, mapping, parse, serialize, value){
    if(arguments.length < 5){
      if(scormAPI.hasAPI && !cacheHolder.hasOwnProperty(key)){
        cacheHolder[key] = scormAPI.getValue('cmi.' + mapping);
        if(parse)
          parse(cacheHolder[key]);
      }
      return cacheHolder[key];
    }
    if(scormAPI.hasAPI)
      scormAPI.setValue('cmi.' + mapping, serialize ? serialize(value) : value);
    cacheHolder[key] = value;
    return value;
  };

  var getScormMutable = function(descriptor){
    var innerMapper = mapper.bind({}, {});
    var innerDescriptor = {};
    Object.keys(descriptor).forEach(function(key){
      var parse = descriptor[key].read;
      if(typeof descriptor[key] != 'object'){
        innerDescriptor[key] = descriptor[key];
        return;
      }
      if(descriptor[key].read === undefined)
        parse = function(){
          throw new Error('Write-only');
        };
      var serialize = descriptor[key].write;
      if(descriptor[key].write === undefined)
        serialize = function(){
          throw new Error('Write-only');
        };
      innerDescriptor[key] = innerMapper.bind({}, key, descriptor[key].mapping, parse, serialize);
    });
    return api.TypedMutable.bind({}, innerDescriptor);
  };

  var score = function(prefix){
    return getScormMutable({
      raw: {
        mapping: prefix + 'raw',
        read: null,
        write: null
      },
      max: {
        mapping: prefix + 'max',
        read: null,
        write: null
      },
      min: {
        mapping: prefix + 'min',
        read: null,
        write: null
      }
    });
  };

  var status = function(prefix){
    return getScormMutable({
      mapping: prefix,
      read: function(value){
        return getStatus(scormAPI.statusKeys[value]);
      },
      write: function(value){
        return scormAPI.status[value.id];
      }
    };
  };

  // This is dead tricky. Each objective will own its type (binded because of the scorm mutable and the id).
  var objective = function(mesh, idx){
    var mutant = getScormMutable({
      id: {
        mapping: 'core.objectives.' + idx + '.id',
        read: null,
        write: null,
      },
      score: score('core.objectives.' + idx + '.score'),
      status: status('core.objectives.' + idx + '.status')
    });
    return new mutant(mesh);
  };

  var interaction = function(mesh, idx){
    // XXX total crap - this spec is a fucking shit train freak accident godamn it
    var mutant = getScormMutable({
      id: {
        mapping: 'core.interactions.' + idx + '.id',
        read: null,
        write: null,
      },
      weight: {
        mapping: 'core.interactions.' + idx + '.weighting',
        read: null,
        write: null,
      }/*,
      type: {
        mapping: 'core.interactions.' + idx + '.type',
        read: null,
        write: null,
      },
      // timestamp*/
    });
    return new mutant(mesh);
  };


// cmi.interactions._children (id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description, RO) Listing of supported data model elements
// cmi.interactions._count (non-negative integer, RO) Current number of interactions being stored by the LMS
// cmi.interactions.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the interaction
// cmi.interactions.n.type (“true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”, RW) Which type of interaction is recorded
// cmi.interactions.n.objectives._count (non-negative integer, RO) Current number of objectives (i.e., objective identifiers) being stored by the LMS for this interaction
// cmi.interactions.n.objectives.n.id (long_identifier_type (SPM: 4000), RW) Label for objectives associated with the interaction
// cmi.interactions.n.timestamp (time(second,10,0), RW) Point in time at which the interaction was first made available to the learner for learner interaction and response
// cmi.interactions.n.correct_responses._count (non-negative integer, RO) Current number of correct responses being stored by the LMS for this interaction
// cmi.interactions.n.correct_responses.n.pattern (format depends on interaction type, RW) One correct response pattern for the interaction
// cmi.interactions.n.weighting (real (10,7), RW) Weight given to the interaction relative to other interactions
// cmi.interactions.n.learner_response (format depends on interaction type, RW) Data generated when a learner responds to an interaction
// cmi.interactions.n.result (“correct”, “incorrect”, “unanticipated”, “neutral”) or a real number with values that is accurate to seven significant decimal figures real. , RW) Judgment of the correctness of the learner response
// cmi.interactions.n.latency (timeinterval (second,10,2), RW) Time elapsed between the time the interaction was made available to the learner for response and the time of the first response
// cmi.interactions.n.description (localized_string_type (SPM: 250), RW) Brief informative description of the interaction





// * cmi.core.student_id (CMIString (SPM: 255), RO) Identifies the student on behalf of whom the SCO was launched
// * cmi.core.student_name (CMIString (SPM: 255), RO) Name provided for the student by the LMS
// * cmi.core.credit (“credit”, “no-credit”, RO) Indicates whether the learner will be credited for performance in the SCO
// * cmi.core.entry (“ab-initio”, “resume”, “”, RO) Asserts whether the learner has previously accessed the SCO
// * cmi.core.total_time (CMITimespan, RO) Sum of all of the learner’s session times accumulated in the current learner attempt
// * cmi.core.lesson_mode (“browse”, “normal”, “review”, RO) Identifies one of three possible modes in which the SCO may be presented to the learner
// * cmi.launch_data (CMIString (SPM: 4096), RO) Data provided to a SCO after launch, initialized from the dataFromLMS manifest element

  var cmi = getScormMutable({
    studentId: {
      mapping: 'core.student_id',
      read: null
    },

    studentName: {
      mapping: 'core.student_name',
      read: null
    },

    credit: {
      mapping: 'core.credit',
      read: function(){
        return value == 'credit';
      }
    },

    resume: {
      mapping: 'core.entry',
      read: function(){
        return value == 'resume';
      }
    },

    totalTime: {
      mapping: 'core.total_time',
      read: function(){
        return new Date(value);
      }
    },

    mode: {
      mapping: 'core.lesson_mode',
      read: null
    },

    launchData: {
      mapping: 'core.launch_data',
      read: null
    },

// * cmi.core.lesson_location (CMIString (SPM: 255), RW) The learner’s current location in the SCO
// * cmi.core.lesson_status (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW) Indicates whether the learner has completed and satisfied the requirements for the SCO
// * cmi.core.score.raw (CMIDecimal, RW) Number that reflects the performance of the learner relative to the range bounded by the values of min and max
// * cmi.core.score.max (CMIDecimal, RW) Maximum value in the range for the raw score
// * cmi.core.score.min (CMIDecimal, RW) Minimum value in the range for the raw score
// * cmi.core.exit (“time-out”, “suspend”, “logout”, “”, WO) Indicates how or why the learner left the SCO
// * cmi.core.session_time (CMITimespan, WO) Amount of time that the learner has spent in the current learner session for this SCO
// * cmi.suspend_data (CMIString (SPM: 4096), RW) Provides space to store and retrieve data between learner sessions

    location: {
      mapping: 'core.lesson_location',
      read: null,
      write: null
    },

    status: status('core.lesson_status'),

    score: score('core.score'),

    exit: {
      mapping: 'core.exit',
      read: null,
      write: null
    },

    sessionTime: {
      mapping: 'core.session_time',
      read: function(value){
        return new Date(value);
      },
      write: function(value){
        return value.toString();
      }
    },

  // var crapTime = function(seconds) {
  //   seconds = Math.round(seconds / 1000);
  //   var S = seconds % 60;
  //   seconds -= S;
  //   if (S < 10) {
  //     S = '0' + S;
  //   }
  //   var M = (seconds / 60) % 60;
  //   if (M < 10) {M = '0' + M;}
  //   var H = Math.floor(seconds / 3600);
  //   if (H < 10) {H = '0' + H;}
  //   return H + ':' + M + ':' + S;
  // };

    suspendData: {
      mapping: 'core.suspend_data',
      read: function(value){
        return JSON.parse(value);
      },
      write: function(value){
        return JSON.stringify(value);
      }
    },

    objectives: LxxlLib.model.ArrayMutable.bind({}, objective)
  });

  LxxlLib.session = function(){
    var cmi;
    var startTime;
    this.start = function(activity){
      startTime = (new Date()).getTime();
      scormAPI.boot();
      // Create inner session object to be manipulate the learner session 
      cmi = new cmi({
        objectives: [
          {
            id: 0
          }
        ]
      });
      cmi.status = getStatus('BROWSED');
      cmi.score.min = 0;
      cmi.score.max = 100;
      scormAPI.commit();
    };

    Object.defineProperty(this, 'content', {
      enumerable: true,
      get: function(){
        return cmi;
      }
    });

    this.pause = function(){
    };

    this.end = function(){
      scormAPI.shutdown();
      startTime = null;
    };
  };
})();





    // Object.keys(descriptor).forEach(function(item){
    //   var inner = {};
    //   Object.defineProperty(this, {
    //     enumerable: true,
    //     get: function(){
    //       if(scormAPI.hasAPI && !inner.hasOwnProperty(key))
    //         inner[item] = scormAPI.getValue('cmi.' + descriptor[item].name);
    //       return inner[item];

    //     },
    //     set: function(value){
    //       if(scormAPI.hasAPI)
    //         scormAPI.setValue('cmi.' + descriptor[item].name, value);
    //       inner[item] = value;
    //     }
    //   });
    // }, this);

  // Object.keys(LxxlLib.model.Mutable.prototype).forEach(function(x) {
  //   cmi.prototype[x] = LxxlLib.model.Mutable.prototype[x];
  // }, this);

/*
* cmi.core.student_id (CMIString (SPM: 255), RO) Identifies the student on behalf of whom the SCO was launched
* cmi.core.student_name (CMIString (SPM: 255), RO) Name provided for the student by the LMS
* cmi.core.credit (“credit”, “no-credit”, RO) Indicates whether the learner will be credited for performance in the SCO
* cmi.core.entry (“ab-initio”, “resume”, “”, RO) Asserts whether the learner has previously accessed the SCO


* cmi.core.total_time (CMITimespan, RO) Sum of all of the learner’s session times accumulated in the current learner attempt
* cmi.core.lesson_mode (“browse”, “normal”, “review”, RO) Identifies one of three possible modes in which the SCO may be presented to the learner

* cmi.core.lesson_location (CMIString (SPM: 255), RW) The learner’s current location in the SCO
* cmi.core.lesson_status (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW) Indicates whether the learner has completed and satisfied the requirements for the SCO
* cmi.core.score.raw (CMIDecimal, RW) Number that reflects the performance of the learner relative to the range bounded by the values of min and max
* cmi.core.score.max (CMIDecimal, RW) Maximum value in the range for the raw score
* cmi.core.score.min (CMIDecimal, RW) Minimum value in the range for the raw score
* cmi.core.exit (“time-out”, “suspend”, “logout”, “”, WO) Indicates how or why the learner left the SCO
* cmi.core.session_time (CMITimespan, WO) Amount of time that the learner has spent in the current learner session for this SCO


* cmi.suspend_data (CMIString (SPM: 4096), RW) Provides space to store and retrieve data between learner sessions
* cmi.launch_data (CMIString (SPM: 4096), RO) Data provided to a SCO after launch, initialized from the dataFromLMS manifest element


cmi.objectives._children (id,score,status, RO) Listing of supported data model elements
cmi.objectives._count (non-negative integer, RO) Current number of objectives being stored by the LMS
cmi.objectives.n.id (CMIIdentifier, RW) Unique label for the objective
cmi.objectives.n.score._children (raw,min,max, RO) Listing of supported data model elements
cmi.objectives.n.score.raw (CMIDecimal, RW) Number that reflects the performance of the learner, for the objective, relative to the range bounded by the values of min and max
cmi.objectives.n.score.max (CMIDecimal, Rw) Maximum value, for the objective, in the range for the raw score
cmi.objectives.n.score.min (CMIDecimal, RW) Minimum value, for the objective, in the range for the raw score
cmi.objectives.n.status (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW) Indicates whether the learner has completed or satisfied the objective


cmi.student_data._children (mastery_score, max_time_allowed, time_limit_action, RO) Listing of supported data model elements
cmi.student_data.mastery_score (CMIDecimal, RO) Passing score required to master the SCO
cmi.student_data.max_time_allowed (CMITimespan, RO) Amount of accumulated time the learner is allowed to use a SCO
cmi.student_data.time_limit_action (exit,message,” “exit,no message”,” continue,message”, “continue, no message”, RO) Indicates what the SCO should do when max_time_allowed is exceeded
cmi.student_preference._children (audio,language,speed,text, RO) Listing of supported data model elements
cmi.student_preference.audio (CMISInteger, RW) Specifies an intended change in perceived audio level
cmi.student_preference.language (CMIString (SPM: 255), RW) The student’s preferred language for SCOs with multilingual capability
cmi.student_preference.speed (CMISInteger, RW) The learner’s preferred relative speed of content delivery
cmi.student_preference.text (CMISInteger, RW) Specifies whether captioning text corresponding to audio is displayed
cmi.interactions._children (id,objectives,time,type,correct_responses,weighting,student_response,result,latency, RO) Listing of supported data model elements
cmi.interactions._count (CMIInteger, RO) Current number of interactions being stored by the LMS
cmi.interactions.n.id (CMIIdentifier, WO) Unique label for the interaction
cmi.interactions.n.objectives._count (CMIInteger, RO) Current number of objectives (i.e., objective identifiers) being stored by the LMS for this interaction
cmi.interactions.n.objectives.n.id (CMIIdentifier, WO) Label for objectives associated with the interaction
cmi.interactions.n.time (CMITime, WO) Point in time at which the interaction was first made available to the student for student interaction and response
cmi.interactions.n.type (“true-false”, “choice”, “fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric”, WO) Which type of interaction is recorded
cmi.interactions.n.correct_responses._count (CMIInteger, RO) Current number of correct responses being stored by the LMS for this interaction
cmi.interactions.n.correct_responses.n.pattern (format depends on interaction type, WO) One correct response pattern for the interaction
cmi.interactions.n.weighting (CMIDecimal, WO) Weight given to the interaction relative to other interactions
cmi.interactions.n.student_response (format depends on interaction type, WO) Data generated when a student responds to an interaction
cmi.interactions.n.result (“correct”, “wrong”, “unanticipated”, “neutral”, “x.x [CMIDecimal]“, WO) Judgment of the correctness of the learner response
cmi.interactions.n.latency (CMITimespan, WO) Time elapsed between the time the interaction was made available to the learner for response and the time of the first response


cmi.comments (CMIString (SPM: 4096), RW) Textual input from the learner about the SCO
cmi.comments_from_lms (CMIString (SPM: 4096), RO) Comments or annotations associated with a SCO

 */



/*
Data Model
cmi._version (characterstring, RO) Represents the version of the data model
cmi.comments_from_learner._children (comment,location,timestamp, RO) Listing of supported data model elements
cmi.comments_from_learner._count (non-negative integer, RO) Current number of learner comments
cmi.comments_from_learner.n.comment (localized_string_type (SPM: 4000), RW) Textual input
cmi.comments_from_learner.n.location (characterstring (SPM: 250), RW) Point in the SCO to which the comment applies
cmi.comments_from_learner.n.timestamp (time (second,10,0), RW) Point in time at which the comment was created or most recently changed
cmi.comments_from_lms._children (comment,location,timestamp, RO) Listing of supported data model elements
cmi.comments_from_lms._count (non-negative integer, RO) Current number of comments from the LMS
cmi.comments_from_lms.n.comment (localized_string_type (SPM: 4000), RO) Comments or annotations associated with a SCO
cmi.comments_from_lms.n.location (characterstring (SPM: 250), RO) Point in the SCO to which the comment applies
cmi.comments_from_lms.n.timestamp (time(second,10,0), RO) Point in time at which the comment was created or most recently changed
cmi.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) Indicates whether the learner has completed the SCO
cmi.completion_threshold (real(10,7) range (0..1), RO) Used to determine whether the SCO should be considered complete
cmi.credit (“credit”, “no-credit”, RO) Indicates whether the learner will be credited for performance in the SCO
cmi.entry (ab_initio, resume, “”, RO) Asserts whether the learner has previously accessed the SCO
cmi.exit (timeout, suspend, logout, normal, “”, WO) Indicates how or why the learner left the SCO
cmi.interactions._children (id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description, RO) Listing of supported data model elements
cmi.interactions._count (non-negative integer, RO) Current number of interactions being stored by the LMS
cmi.interactions.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the interaction
cmi.interactions.n.type (“true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”, RW) Which type of interaction is recorded
cmi.interactions.n.objectives._count (non-negative integer, RO) Current number of objectives (i.e., objective identifiers) being stored by the LMS for this interaction
cmi.interactions.n.objectives.n.id (long_identifier_type (SPM: 4000), RW) Label for objectives associated with the interaction
cmi.interactions.n.timestamp (time(second,10,0), RW) Point in time at which the interaction was first made available to the learner for learner interaction and response
cmi.interactions.n.correct_responses._count (non-negative integer, RO) Current number of correct responses being stored by the LMS for this interaction
cmi.interactions.n.correct_responses.n.pattern (format depends on interaction type, RW) One correct response pattern for the interaction
cmi.interactions.n.weighting (real (10,7), RW) Weight given to the interaction relative to other interactions
cmi.interactions.n.learner_response (format depends on interaction type, RW) Data generated when a learner responds to an interaction
cmi.interactions.n.result (“correct”, “incorrect”, “unanticipated”, “neutral”) or a real number with values that is accurate to seven significant decimal figures real. , RW) Judgment of the correctness of the learner response
cmi.interactions.n.latency (timeinterval (second,10,2), RW) Time elapsed between the time the interaction was made available to the learner for response and the time of the first response
cmi.interactions.n.description (localized_string_type (SPM: 250), RW) Brief informative description of the interaction
cmi.launch_data (characterstring (SPM: 4000), RO) Data provided to a SCO after launch, initialized from the dataFromLMS manifest element
cmi.learner_id (long_identifier_type (SPM: 4000), RO) Identifies the learner on behalf of whom the SCO was launched
cmi.learner_name (localized_string_type (SPM: 250), RO) Name provided for the learner by the LMS
cmi.learner_preference._children (audio_level,language,delivery_speed,audio_captioning, RO) Listing of supported data model elements
cmi.learner_preference.audio_level (real(10,7), range (0..*), RW) Specifies an intended change in perceived audio level
cmi.learner_preference.language (language_type (SPM 250), RW) The learner’s preferred language for SCOs with multilingual capability
cmi.learner_preference.delivery_speed (real(10,7), range (0..*), RW) The learner’s preferred relative speed of content delivery
cmi.learner_preference.audio_captioning (“-1″, “0″, “1″, RW) Specifies whether captioning text corresponding to audio is displayed
cmi.location (characterstring (SPM: 1000), RW) The learner’s current location in the SCO
cmi.max_time_allowed (timeinterval (second,10,2), RO) Amount of accumulated time the learner is allowed to use a SCO
cmi.mode (“browse”, “normal”, “review”, RO) Identifies one of three possible modes in which the SCO may be presented to the learner
cmi.objectives._children (id,score,success_status,completion_status,description, RO) Listing of supported data model elements
cmi.objectives._count (non-negative integer, RO) Current number of objectives being stored by the LMS
cmi.objectives.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the objective
cmi.objectives.n.score._children (scaled,raw,min,max, RO) Listing of supported data model elements
cmi.objectives.n.score.scaled (real (10,7) range (-1..1), RW) Number that reflects the performance of the learner for the objective
cmi.objectives.n.score.raw (real (10,7), RW) Number that reflects the performance of the learner, for the objective, relative to the range bounded by the values of min and max
cmi.objectives.n.score.min (real (10,7), RW) Minimum value, for the objective, in the range for the raw score
cmi.objectives.n.score.max (real (10,7), RW) Maximum value, for the objective, in the range for the raw score
cmi.objectives.n.success_status (“passed”, “failed”, “unknown”, RW) Indicates whether the learner has mastered the objective
cmi.objectives.n.completion_status (“completed”, “incomplete”, “not attempted”, “unknown”, RW) Indicates whether the learner has completed the associated objective
cmi.objectives.n.progress_measure (real (10,7) range (0..1), RW) Measure of the progress the learner has made toward completing the objective
cmi.objectives.n.description (localized_string_type (SPM: 250), RW) Provides a brief informative description of the objective
cmi.progress_measure (real (10,7) range (0..1), RW) Measure of the progress the learner has made toward completing the SCO
cmi.scaled_passing_score (real(10,7) range (-1 .. 1), RO) Scaled passing score required to master the SCO
cmi.score._children (scaled,raw,min,max, RO) Listing of supported data model elements
cmi.score.scaled (real (10,7) range (-1..1), RW) Number that reflects the performance of the learner
cmi.score.raw (real (10,7), RW) Number that reflects the performance of the learner relative to the range bounded by the values of min and max
cmi.score.min (real (10,7), RW) Minimum value in the range for the raw score
cmi.score.max (real (10,7), RW) Maximum value in the range for the raw score
cmi.session_time (timeinterval (second,10,2), WO) Amount of time that the learner has spent in the current learner session for this SCO
cmi.success_status (“passed”, “failed”, “unknown”, RW) Indicates whether the learner has mastered the SCO
cmi.suspend_data (characterstring (SPM: 64000), RW) Provides space to store and retrieve data between learner sessions
cmi.time_limit_action (“exit,message”, “continue,message”, “exit,no message”, “continue,no message”, RO) Indicates what the SCO should do when cmi.max_time_allowed is exceeded
cmi.total_time (timeinterval (second,10,2), RO) Sum of all of the learner’s session times accumulated in the current learner attempt
adl.nav.request (request(continue, previous, choice, jump, exit, exitAll, abandon, abandonAll, suspendAll _none_), RW) Navigation request to be processed immediately following Terminate()
adl.nav.request_valid.continue (state (true, false, unknown), RO) Used by a SCO to determine if a Continue navigation request will succeed.
adl.nav.request_valid.previous (state (true, false, unknown), RO) Used by a SCO to determine if a Previous navigation request will succeed.
adl.nav.request_valid.choice.{target=} (state (true, false, unknown), RO) Used by a SCO to determine if a Choice navigation request for the target activity will succeed.
adl.nav.request_valid.jump.{target=} (state (true, false, unknown), RO) Used by a SCO to determine if a Jump navigation request for the target activity will succeed.
 */




  /**
   * Scorm stuff - untested
   */
/*
  this.LxxlLib.scorm = new (function() {
    this.INIT = 'Initialize';
    this.FINISH = 'Finish';
    this.GET = 'GetValue';
    this.SET = 'SetValue';
    this.COMMIT = 'Commit';


    this.TIME_OUT = 'time-out';
    this.SUSPEND = 'suspend';
    this.LOGOUT = 'logout';
    this.BLANK = '';

    var isFunctional = true;

    // Wrap shitny API
    this.execute = function(statement, data) {
      console.warn(' [scorm/lms] - about to execute', statement, data);
      if (!isFunctional) {
        console.error(' NO LMS available - just passing by');
        return;
      }
      var ret = window['doLMS' + statement].apply(this, data);
      console.warn(' [scorm/lms] - returned', ret);
      if (!ret && (statement == this.INIT)) {
        console.error('LMS initialization fail - disabling scorm entirely');
        isFunctional = false;
      }
      return ret;
      // var err = doLMSGetLastError();
      // console.warn(' [scorm/lms] - last err', err, doLMSGetErrorString(err));
    };

    var startTime = (new Date()).getTime();
    this.start = function() {
      this.execute(this.INIT);
      this.execute(this.SET, ['cmi.core.lesson_status', this.BROWSED]);
      this.execute(this.SET, ['cmi.core.score.min', 0]);
      this.execute(this.SET, ['cmi.core.score.max', 100]);
      this.execute(this.COMMIT);
    };

    this.end = function(status) {
      switch (status) {
        case this.COMPLETED:
        case this.INCOMPLETE:
          // this.score(max, score, min, status, tokens);
          this.execute(this.SET, ['cmi.core.session_time', crapTime((new Date()).getTime() - startTime)]);
          break;
      }
      this.execute(this.COMMIT);
      this.execute(this.FINISH);
    };

    this.score = function(max, score, min, status, tokens) {
      this.execute(this.SET, ['cmi.core.score.max', max]);
      this.execute(this.SET, ['cmi.core.score.raw', score]);
      this.execute(this.SET, ['cmi.core.score.min', min]);
      tokens.forEach(function(token, idx) {
        this.execute(this.SET, ['cmi.objectives.' + idx + '.id', 'objective_' + token.id]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.max', token.max]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.raw', token.score]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.min', token.min]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.status', status]);

        this.execute(this.SET, ['cmi.interactions.' + idx + '.id', 'interaction_' + token.id]);
        this.execute(this.SET, ['cmi.interactions.' + idx + '.weighting', token.weighting]);
        // Whatever the fuck
        this.execute(this.SET, ['cmi.interactions.' + idx + '.type', 'performance']);
        this.execute(this.SET, ['cmi.interactions.' + idx + '.student_response', token.response]);
      }, this);
      this.execute(this.COMMIT);
    };

    // Stolen from hotp - highly buggy, not compliant, and inefficient
    // XXX rewrite


  })();
*/
