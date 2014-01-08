(function () {
    /*jshint devel: true*/
    'use strict';
    /*
     window.API = {};
     ['Initialize', 'Terminate', 'GetValue', 'SetValue', 'Commit', 'GetLastError', 'GetErrorString',
     'GetDiagnostic'].forEach(function(key) {
     window.API[key] = function(a, b, c) {
     console.warn('Fake LMS API debug. Method:', key, 'args', a, b, c);
     return '0';
     };
     });
     */
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

    var findAPI = function (win) {
        try {
            var findAPITries = 0;
            while (!('API_1484_11' in win) && !('API' in win) && win.parent && (win.parent != win)) {
                findAPITries++;
                if (findAPITries > 10)
                    return null;

                win = win.parent;
            }
            return (('API_1484_11' in win) && win.API_1484_11) || (('API' in win) && win.API);
        } catch (e) {
            return false;
        }
    };

    // local variable definitions
    var api;

    var scormAPI = window.scorm = {};
    scormAPI.hasAPI = false;
    scormAPI.deprecated = false;

    var initHandler = function () {
        if (!api) {
            api = findAPI(window) || (window.opener && findAPI(window.opener));
            // Mapping of 1.1 / 1.2 into 2004 API
            if (api && ('LMSInitialize' in api)) {
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
    scormAPI.boot = function () {
        initHandler();
        if (!api)
            return;
        return initialized || (initialized = !!api.Initialize(''));
    };

    scormAPI.shutdown = function () {
        if (!api)
            return;
        // Failure to terminate will leave initialized at true and api as it was.
        return (!initialized || !(initialized = !api.Terminate(''))) && !(api = null);
    };


    scormAPI.getLastError = function () {
        if (!api)
            return {
                code: scormAPI.errors.GENERAL_EXCEPTION,
                name: 'GENERAL_EXCEPTION',
                message: 'Unable to locate the LMS\'s API Implementation. Cannot determine LMS error code.'
            };

        var code = api.GetLastError();
        if (code == scormAPI.errors.NO_ERROR)
            return null;

        return {
            code: code,
            name: api.GetErrorString(code).toUpperCase().replace(/ /g, '_'),
            message: api.GetDiagnostic(code)
        };
    };

    scormAPI.getValue = function (name) {
        if (!api)
            return;
        var result = api.GetValue(name);
        // Might throw / should do something smarter
        if (api.GetLastError() != scormAPI.errors.NO_ERROR)
            return;
        return result;
    };

    scormAPI.setValue = function (name, value) {
        if (!api)
            return;
        return api.SetValue(name, value.toString());
    };

    scormAPI.commit = function () {
        if (!api)
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
    Object.keys(scormAPI.status).forEach(function (key) {
        scormAPI.statusKeys[scormAPI.status[key]] = key;
    });

    var StatusPool = jsBoot.types.getPooledMutable({
        id: '',
        title: ''
    });

    var getStatus = function (id) {
        return new StatusPool({id: id});
    };

    // Init status
    Object.keys(scormAPI.status).forEach(function (id) {
        return new StatusPool({id: id, title: scormAPI.status[id]});
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


    var mapper = function (cacheHolder, key, mapping, parse, serialize, value) {
        // console.warn('gonna do something', key, arguments);
        if (value === undefined) {
            if (scormAPI.hasAPI && !cacheHolder.hasOwnProperty(key)) {
                cacheHolder[key] = scormAPI.getValue('cmi.' + mapping);
                if (parse)
                    cacheHolder[key] = parse(cacheHolder[key]);
            }
            return cacheHolder[key];
        }
        if (scormAPI.hasAPI)
            scormAPI.setValue('cmi.' + mapping, serialize ? serialize(value) : value);
        cacheHolder[key] = value;
        return value;
    };

    var getScormMutable = function (descriptor) {
        var innerMapper = mapper.bind({}, {});
        var innerDescriptor = {};
        Object.keys(descriptor).forEach(function (key) {
            var parse = descriptor[key].read;
            if (typeof descriptor[key] != 'object') {
                innerDescriptor[key] = descriptor[key];
                return;
            }
            if (descriptor[key].read === undefined)
                parse = function () {
                    throw new Error('Write-only');
                };
            var serialize = descriptor[key].write;
            if (descriptor[key].write === undefined)
                serialize = function () {
                    throw new Error('Read-only');
                };
            innerDescriptor[key] = innerMapper.bind({}, key, descriptor[key].mapping, parse, serialize);
            innerDescriptor[key].isDirty = true;
        });
        return jsBoot.types.TypedMutable.bind({}, innerDescriptor, null, true);
    };

    var score = function (prefix) {
        return getScormMutable({
            raw: {
                mapping: prefix + '.raw',
                read: function (v) {
                    return parseInt(v, 10);
                },
                write: null
            },
            max: {
                mapping: prefix + '.max',
                read: function (v) {
                    return parseInt(v, 10);
                },
                write: null
            },
            min: {
                mapping: prefix + '.min',
                read: function (v) {
                    return parseInt(v, 10);
                },
                write: null
            }
        });
    };

    var status = function (prefix) {
        return getScormMutable({
            mapping: prefix,
            read: function (value) {
                return getStatus(scormAPI.statusKeys[value]);
            },
            write: function (value) {
                return scormAPI.status[value.id];
            }
        });
    };

    // This is dead tricky. Each objective will own its type (binded because of the scorm mutable and the id).
    var objective = function (mesh, idx) {
        var Mutant = getScormMutable({
            id: {
                mapping: 'core.objectives.' + idx + '.id',
                read: null,
                write: null
            },
            score: score('core.objectives.' + idx + '.score'),
            status: {
                mapping: 'core.objectives.' + idx + '.status',
                read: function (value) {
                    return getStatus(scormAPI.statusKeys[value]);
                },
                write: function (value) {
                    return scormAPI.status[value.id];
                }
            }
            // status: status('core.objectives.' + idx + '.status')
        });
        var r = new Mutant(mesh);
        r.setBrowsed = function () {
            this.set('status', getStatus('BROWSED'));
        };
        r.setComplete = function () {
            this.set('status', getStatus('COMPLETED'));
        };
        return r;
    };

    var interaction = function (mesh, idx) {
        // XXX total crap - this spec is a fucking shit train freak accident godamn it
        var Mutant = getScormMutable({
            id: {
                mapping: 'core.interactions.' + idx + '.id',
                read: null,
                write: null
            },
            weight: {
                mapping: 'core.interactions.' + idx + '.weighting',
                read: null,
                write: null
            }/*,
             type: {
             mapping: 'core.interactions.' + idx + '.type',
             read: null,
             write: null,
             },
             // timestamp*/
        });
        return new Mutant(mesh);
    };


    // cmi.interactions._children (id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,
    // latency,description, RO) Listing of supported data model elements
    // cmi.interactions._count (non-negative integer, RO) Current number of interactions being stored by the LMS
    // cmi.interactions.n.id (long_identifier_type (SPM: 4000), RW) Unique label for the interaction
    // cmi.interactions.n.type (“true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”,
    // “sequencing”, “likert”, “numeric” or “other”, RW) Which type of interaction is recorded
    // cmi.interactions.n.objectives._count (non-negative integer, RO) Current number of objectives (i.e., objective
    // identifiers) being stored by the LMS for this interaction
    // cmi.interactions.n.objectives.n.id (long_identifier_type (SPM: 4000), RW) Label for objectives associated with the
    // interaction
    // cmi.interactions.n.timestamp (time(second,10,0), RW) Point in time at which the interaction was first made
    // available to the learner for learner interaction and response
    // cmi.interactions.n.correct_responses._count (non-negative integer, RO) Current number of correct responses
    // being stored by the LMS for this interaction
    // cmi.interactions.n.correct_responses.n.pattern (format depends on interaction type, RW) One correct response
    // pattern for the interaction
    // cmi.interactions.n.weighting (real (10,7), RW) Weight given to the interaction relative to other interactions
    // cmi.interactions.n.learner_response (format depends on interaction type, RW) Data generated when a learner
    // responds to an interaction
    // cmi.interactions.n.result (“correct”, “incorrect”, “unanticipated”, “neutral”) or a real number with values
    // that is accurate to seven significant decimal figures real. , RW) Judgment of the correctness of the learner
    // response
    // cmi.interactions.n.latency (timeinterval (second,10,2), RW) Time elapsed between the time the interaction was
    // made available to the learner for response and the time of the first response
    // cmi.interactions.n.description (localized_string_type (SPM: 250), RW) Brief informative description of the
    // interaction


    // * cmi.core.student_id (CMIString (SPM: 255), RO) Identifies the student on behalf of whom the SCO was launched
    // * cmi.core.student_name (CMIString (SPM: 255), RO) Name provided for the student by the LMS
    // * cmi.core.credit (“credit”, “no-credit”, RO) Indicates whether the learner will be credited for performance
    // in the SCO
    // * cmi.core.entry (“ab-initio”, “resume”, “”, RO) Asserts whether the learner has previously accessed the SCO
    // * cmi.core.total_time (CMITimespan, RO) Sum of all of the learner’s session times accumulated in the current
    // learner attempt
    // * cmi.core.lesson_mode (“browse”, “normal”, “review”, RO) Identifies one of three possible modes in which the
    // SCO may be presented to the learner
    // * cmi.launch_data (CMIString (SPM: 4096), RO) Data provided to a SCO after launch, initialized from the
    // dataFromLMS manifest element

    var Cmi = getScormMutable({
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
            read: function (value) {
                return value == 'credit';
            }
        },

        resume: {
            mapping: 'core.entry',
            read: function (value) {
                return value == 'resume';
            }
        },

        totalTime: {
            mapping: 'core.total_time',
            read: null /*function(value) {
             // XXX convert to int
             return new Date(value);
             }*/
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
        // * cmi.core.lesson_status (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW)
        // Indicates whether the learner has completed and satisfied the requirements for the SCO
        // * cmi.core.score.raw (CMIDecimal, RW) Number that reflects the performance of the learner relative to the
        // range bounded by the values of min and max
        // * cmi.core.score.max (CMIDecimal, RW) Maximum value in the range for the raw score
        // * cmi.core.score.min (CMIDecimal, RW) Minimum value in the range for the raw score
        // * cmi.core.exit (“time-out”, “suspend”, “logout”, “”, WO) Indicates how or why the learner left the SCO
        // * cmi.core.session_time (CMITimespan, WO) Amount of time that the learner has spent in the current learner
        // session for this SCO
        // * cmi.suspend_data (CMIString (SPM: 4096), RW) Provides space to store and retrieve data between learner
        // sessions

        location: {
            mapping: 'core.lesson_location',
            read: null,
            write: null
        },

        status: {
            mapping: 'core.lesson_status',
            read: function (value) {
                return getStatus(scormAPI.statusKeys[value]);
            },
            write: function (value) {
                return scormAPI.status[value.id];
            }
        }, // status('core.lesson_status'),

        score: score('core.score'),

        exit: {
            mapping: 'core.exit',
            read: null,
            write: null
        },

        sessionTime: {
            mapping: 'core.session_time',
            read: function (value) {
                var d = value.match(/(?:([0-9]{1,2}):)?(?:([0-9]{1,2}):)?([0-9]{1,2})/);
                if (!d)
                    return;
                return parseInt(d.pop(), 10) + parseInt(d.pop(), 10) * 60 + parseInt(d.pop(), 10) * 60 * 60;
            },
            write: function (value) {
                value = value / 1000;
                var secs = (value % 60);
                var mins = ((value - secs) / 60 % 60);
                var hours = ((value - secs - mins * 60) / 60 / 60 % (24));
                return hours + ':' + mins + ':' + Math.round(secs);
                // return value.toString();
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
            read: function (value) {
                return JSON.parse(value);
            },
            write: function (value) {
                return JSON.stringify(value);
            }
        },

        objectives: jsBoot.types.ArrayMutable.bind({}, objective),
        interactions: jsBoot.types.ArrayMutable.bind({}, interaction)
    });

    // XXX manu
    LxxlLib.sessionManager = new (function () {
        var cmip;
        var startTime;
        var dom;
        var activity;
        var pub;
        this.activity = null;

        this.bindDocument = function (d) {
            dom = d;
            // XXX manu bind behaviors if you want
            tatBehavior();
            quizzBehavior();
            menuBehavior();
            perfBehavior();
        };

        this.start = function (act, pubVersion) {
            pub = pubVersion ? 'published' : 'draft';
            startTime = (new Date()).getTime();
            activity = this.activity = ('isMutable' in act) ? act : new LxxlLib.model.Activity(act);


            window.coin = scormAPI;
            scormAPI.boot();

            // var objs = []
            // var x = 0;

            // Create inner session object to manipulate the learner session
            cmip = new Cmi({
                // objectives: [
                //   {
                //     id: 0
                //   }
                // ]
            });

            activity[pub].pages.forEach(function (page, idx) {
                switch (page.flavor.id) {
                    case 'quizz':
                    case 'tat':
                    case 'jmt':
                        var o = new objective({}, cmip.objectives.length);
                        cmip.objectives.pushObject(o);
                        o.score.max = 100;
                        o.score.min = 0;
                        break;
                    default:
                        var o = new objective({}, cmip.objectives.length);
                        cmip.objectives.pushObject(o);
                        o.score.max = 0;
                        o.score.min = 0;
                        break;
                }
            });

            if (cmip.objectives.length)
                cmip.objectives[0].setBrowsed();
            // cmip.addObjective = function(){
            //   this.objectives.pushObject(new objective({}, this.objectives.length));
            // };

            window.TOTO = cmip;

            cmip.status = getStatus('BROWSED');
            cmip.startTime = Date.now();
            cmip.score.min = 0;
            cmip.score.max = 100;
            scormAPI.commit();
        };

        // this.execute(this.SET, ['cmi.objectives.' + idx + '.max', token.max]);
        // this.execute(this.SET, ['cmi.objectives.' + idx + '.raw', token.score]);
        // this.execute(this.SET, ['cmi.objectives.' + idx + '.min', token.min]);


        Object.defineProperty(this, 'content', {
            enumerable: true,
            get: function () {
                return cmip;
            }
        });


        var onPageComplete = function (pid, score) {
            activity[pub].pages[pid].completed = true;
            activity[pub].pages[pid].score = score;
            console.warn('Page completed', pid, score);
            cmip.objectives[pid].score.raw = score;
            cmip.objectives[pid].setComplete();
            var nbPages = 0;
            var allset = activity[pub].pages.every(function (page) {
                if (page.flavor.id == 'simple')
                    return true;
                else {
                    nbPages++;
                    return !!page.completed;
                }
            });
            if (allset) {
                cmip.score.raw = totalScore;
                cmip.status = getStatus('COMPLETED');
                $('#playing').hide();
                scormAPI.shutdown();
            }
        };

        this.MixAndMatchComplete = function (pageId, score) {
            $('.modal .feedback', $('#jmt-' + pageId)).html(score + '%');
            $('#modal-on-modal-lynching').show();
            $('.modal', $('#jmt-' + pageId)).modal({
                backdrop: true
            });
            $('.modal', $('#jmt-' + pageId)).on('hide', function () {
                $('#modal-on-modal-lynching').hide();
                onPageComplete(pageId, score);
            });
        };

        this.pause = function () {
        };

        this.end = function () {
            scormAPI.shutdown();
            startTime = null;
            this.activity = activity = null;
        };

        var menuBehavior = function () {
            var acti = $('.pages-list > li', dom);
            if (acti.length) {
                $(acti[0]).addClass('active');
                // pageEnter(0);
            }


            acti = $('.pages-container > section', dom);
            if (acti.length)
                $(acti[0]).fadeIn(1000, function () {
                    console.warn('done');
                });


            // Pages navigation
            $('.pages-list > li', dom).on('click', function (event) {
                var idx;
                // TOTO.objectives[0].setBrowsed()
                // Fake LMS API debug. Method: GetValue args ["cmi.core.objectives.0.status"] debug.js:46
                // Fake LMS API debug. Method: GetLastError args [] debug.js:46
                // Fake LMS API debug. Method: SetValue args ["cmi.core.objectives.0.status", "browsed"] debug.js:46
                // undefined
                // TOTO.objectives[0].score.set('max', 100)
                // Fake LMS API debug. Method: GetValue args ["cmi.core.objectives.0.score.max"] debug.js:46
                // Fake LMS API debug. Method: GetLastError args [] debug.js:46
                // Fake LMS API debug. Method: SetValue args ["cmi.core.objectives.0.score.max", "100"] debug.js:46
                // undefined
                // TOTO.objectives[0].score.set('min', 0)
                // Fake LMS API debug. Method: GetValue args ["cmi.core.objectives.0.score.min"] debug.js:46
                // Fake LMS API debug. Method: GetLastError args [] debug.js:46
                // undefined
                // TOTO.objectives[0].score.set('raw', 14)

                $('.pages-list > li', dom).each(function (ind, item) {
                    if (item == this) {
                        $(item).addClass('active');
                        idx = ind;
                        // pageEnter(ind);
                    } else {
                        if ($(item).hasClass('active')) {
                            //pageExit(ind);
                            $(item).removeClass('active');
                        }
                    }
                }.bind(this));

                $('.pages-container > section', dom).each(function (ind, item) {
                    var page = $(item);
                    if (ind != idx) {
                        page.hide();
                    }
                    else {
                        page.fadeIn(1000, function () {
                            console.warn('done');
                        });
                        if (page.hasClass('page-perf')) {
                            refreshPerformancePage(page);
                        }
                    }
                });

                cmip.objectives[idx].setBrowsed();
                event.preventDefault();
                return false;
            });
        };

        var completeQuestion = function (pid, qid) {
            console.warn('Completed question', pid, qid);
            activity[pub].pages[pid].questions[qid].completed = true;
            var pageComplete = true;
            activity[pub].pages[pid].questions.forEach(function (item, idxxx) {
                console.warn('Is this ok?', activity[pub].pages[pid].questions[idxxx], pid, idxxx, item.completed);
                pageComplete = pageComplete && item.completed;
            });
            console.warn('Page completed?', pageComplete);
            if (pageComplete) {
                var total = activity[pub].pages[pid].questions.length;
                var actual = 0;
                activity[pub].pages[pid].questions.forEach(function (question) {
                    console.warn('Result for the question?', question.score.getResult());
                    actual += question.score ? question.score.getResult() : 0;
                });

                $('#modal-on-modal-lynching').show();

                $('.conclusion .feedback', $('#quizz-' + pid)).html(Math.round(actual / total) + '%');

                $('.conclusion', $('#quizz-' + pid)).modal('show');

                $('.conclusion', $('#quizz-' + pid)).on('hide', function () {
                    $('#modal-on-modal-lynching').hide();
                    onPageComplete(pid, Math.round(actual / total));
                });
            }
        };

        var quizzBehavior = function () {
            $('section[id^=quizz-]', dom).each(function (ind, item) {
                $('.qcm button', item).on('click', function () {
                    var aid = $(this).parent().attr('id').split('-').pop() - 1;
                    var pid = $(this).parent().parent().parent().prev().attr('id').split('-');
                    var qid = pid.pop() - 1;
                    pid = pid.pop();

                    var scb = activity[pub].pages[pid].questions[qid];
                    if (!scb.score)
                        scb.score = new LxxlScoring.questionScore(scb.answers.length);

                    var getBackTo = scb.answers[aid].isCorrect;
                    if (getBackTo) {
                        $('button', $(this).parent().parent()).each(function (ind, item) {
                            $(item).attr('disabled', 'disabled');
                            // if($(item).html() != 'X'){

                            // }
                        });
                        $(this).show();
                        $(this).html('O');

                        $(this).attr('style', 'background-color: green;');
                        scb.score.markAnswered();
                        completeQuestion(pid, qid);
                    } else {
                        scb.score.addPenalty();

                        $('#modal-on-modal-lynching').show();
                        $('.modal', $(this).parent()).modal('show');
                        $('.modal', $(this).parent()).on('hide', function () {
                            $('#modal-on-modal-lynching').hide();
                        });
                        $(this).html('X');
                        $(this).attr('disabled', 'disabled');
                        $(this).attr('style', 'background-color: red;');
                    }
                });

                $('.qrm input', item).on('click', function () {
                    var ok = true;
                    $('li', $(this).parent().parent().parent()).each(function (ind, line) {
                        ok = ($('input', $(line))[0].checked || $('input', $(line))[1].checked) && ok;
                    });
                    if (ok) {
                        $('button', $(this).parent().parent().parent()).attr('disabled', null);
                    }
                });


                $('.qrm button', item).on('click', function () {
                    var pid = $(this).parent().parent().prev().attr('id').split('-');
                    var qid = pid.pop() - 1;
                    pid = pid.pop();
                    var scb = activity[pub].pages[pid].questions[qid];
                    if (!scb.score)
                        scb.score = new LxxlScoring.questionScore(scb.answers.length);
                    var goods = 0;
                    var bads = [];
                    $('li', $(this).parent()).each(function (ind, item) {
                        var aid = $(item).attr('id').split('-').pop() - 1;
                        var isYes = $('input', $(item))[0].checked;
                        if (activity[pub].pages[pid].questions[qid].answers[aid].isCorrect ? isYes : !isYes) {
                            goods++;
                        } else {
                            bads.push($('.modal', $(item)));
                        }
                    });
                    if (bads.length) {
                        scb.score.addPenalty();
                        var mod = bads[Math.round(Math.random() * (bads.length - 1))];
                        $('.feedback', mod).html(goods + '/' + (bads.length + goods));
                        mod.modal('show');
                    } else {
                        $(this).attr('disabled', 'disabled');
                        $('li input', $(this).parent()).each(function (ind, item) {
                            $(item).attr('disabled', 'disabled');
                        });
                        scb.score.markAnswered();
                        $('span.feedback', $(this).next()).html(scb.score.getResult() + '%');

                        $('#modal-on-modal-lynching').show();
                        $(this).next().modal('show');
                        $(this).next().on('hidden', function () {
                            $('#modal-on-modal-lynching').hide();
                            completeQuestion(pid, qid);
                        });
                    }
                });

            });

        };

        // This method is launch at starting of an activity
        var perfBehavior = function () {

            // retrieve each performance page
            $('section[id^=perf-]').each(function (idx, section) {
                var html = $(section).html();
                var block = {
                    subBlocks: {}
                };
                var currentBlock = block;
                var id = 0;
                var mustacheRegex = /{{(.*?)}}/g;
                var beginOfIf = /^#if (.*)$/i;
                var endOfIf = /^\/if$/i;
                // looking for mustache
                var newHtml = html.replace(mustacheRegex, function (all, expression) {
                    var result = "";
                    var groups = null;
                    if (!!(groups = expression.match(beginOfIf))) { // check if it's a begin of an if mustache

                        var newBlock = {
                            id: ++id,
                            type: "if",
                            parentBlock: currentBlock
                        };
                        currentBlock.subBlocks[id] = newBlock;
                        currentBlock = newBlock;
                        var ifContent = groups[1].replace(/\s/g, '');

                        result = "<script id='perf-if-open-" + id + "' type='text/x-placeholder' " +
                            "data-expression='" + ifContent + "'></script>";
                    } else if (expression.match(endOfIf)) { // check if it's a end of an if mustache
                        result = "<script id='perf-if-close-" + currentBlock.id + "' type='text/x-placeholder'></script>";
                        currentBlock = currentBlock.parentBlock;
                    } else { // else it's just placeholder to display the value describe by the expression
                        return "<span data-tag-type='value' data-expression='" + expression + "'></span>";
                    }
                    return result;
                });
                $(section).html(newHtml);
            });
        };

        var refreshPerformancePage = function (performancePage) {

            // remove useless p arround script if tag
            performancePage.find('script').each(function (idx, script) {
                var $script = $(script);
                var scriptParentContent = $script.parent().html().replace(/\s/g, '');
                if (!!scriptParentContent.match(/^<scriptid="perf.*<\/script>$/)) {
                    $script.unwrap();
                }
            });

            // place a 'activité' var in 'this' to be accessible by eval
            var activité = getActivityNotes();

            var getValueOf = function (expression) {
                var value;
                try {
                    value = eval(expression);
                } catch (e) {
                    console.warn(e);
                }
                return value;
            };

            // if parsing
            performancePage.find('script[id^=perf-if-open]').each(function (idx, ifOpener) {
                var $ifOpener = $(ifOpener);
                var isDisplayed = !!getValueOf(ifOpener.dataset.expression);
                var ifId = ifOpener.id.substr(ifOpener.id.lastIndexOf('-') + 1) >> 0;
                var domToDisplayOrHide = $ifOpener.nextUntil('#perf-if-close-' + ifId);
                if (isDisplayed) {
                    domToDisplayOrHide.show();
                } else {
                    domToDisplayOrHide.hide();
                }
            });

            // value parsing
            var noteRegex = /(activité\.(pages\[\d]\.)?note)(\[\/(20|100)\])?$/i;
            performancePage.find("span[data-tag-type='value']").each(function (idx, span) {
                var expression = span.dataset.expression;
                var groups = expression.match(noteRegex);
                var noteExpression = groups[1],
                    scale = (groups[4] >> 0) || 100; // retrieve specified scale or take 100 by default

                var note = getValueOf(noteExpression) / (100 / scale);
                span.innerHTML = note + "/" + scale;
            });
        };

        var getActivityNotes = function () {
            var flavorsWhoDontCount = ['perf', 'simple'];
            var nbPageWhoCount = 0;
            var total = 0;

            // Perf condition representation
            var activityNotes = {
                note: 0,
                pages: {}
            };

            activity[pub].pages.forEach(function (page, idx) {
                if (!flavorsWhoDontCount.contains(page.flavor.id) && (typeof page.score != "object")) {
                    nbPageWhoCount++;
                    activityNotes.pages[idx + 1] = {note: page.score}; // page begin at one
                    total += page.score;
                }
            });
            activityNotes.note = total / nbPageWhoCount >> 0;
            return activityNotes;
        };


        var tatBehavior = function () {
            // Tat thingies
            // var tat =
            $('section[id^=tat-]', dom).each(function (ind, item) {
                // Find page
                var x = 0;
                var recupPage;
                activity[pub].pages.some(function (page, dex) {
                    if (page.flavor.id == 'tat') {
                        if (x == ind) {
                            recupPage = page;
                            return true;
                        } else {
                            x++;
                        }
                        return false;
                    }
                });
                var id = item.id.split('-');
                var pageId = id.pop();
                var wordList = [];

                var total = $('[data-type="tat"]', item).length;
                recupPage.score = new LxxlScoring.tatScore(total);

                $('#tat-' + pageId + '-check', item).on('click', function () {
                    var notYet = 0;
                    $('input', $(this).parent().parent().prev()).each(function (ind, chose) {
                        var response = $(chose).val().toLowerCase().trim();
                        var valid = $(chose).data('ans').map(function (i) {
                            return i.toLowerCase().trim();
                        });
                        var isGood = valid.some(function (i) {
                            if (!i)
                                return;
                            if (response == i)
                                return true;
                            if (i.charAt(i.length - 1) == '*') {
                                return response.substr(0, i.length - 1) + '*' == i;
                            }
                            return false;
                        });

                        if (isGood) {
                            $('<b>' + response + '</b>').insertBefore($(chose));
                            $(chose).next().detach();
                            $(chose).detach();

                            // $(chose).attr('disabled', 'disabled');
                            // $(chose).next().attr('disabled', 'disabled');
                        } else {
                            notYet++;
                        }
                    });

                    var r = recupPage.score.getResult(total - notYet);
                    if (notYet) {
                        recupPage.score.addPenalty();
                        $('.modal .feedback', $('#tat-' + pageId)).html(r + '%');
                        $('#modal-on-modal-lynching').show();
                        $('.modal.feedback', $('#tat-' + pageId)).modal('show');
                        $('.modal.feedback', $('#tat-' + pageId)).on('hide', function () {
                            $('#modal-on-modal-lynching').hide();
                        });

                        // $('.modal.feedback', $('[id="tat-' + pageId + '"]')).modal('show');
                    } else {
                        $(this).attr('disabled', 'disabled');
                        $('.modal .feedback', $('#tat-' + pageId)).html(r + '%');
                        $('#modal-on-modal-lynching').show();

                        $('.modal.conclusion', $('#tat-' + pageId)).modal('show');
                        $('.modal.conclusion', $('#tat-' + pageId)).on('hide', function () {
                            $('#modal-on-modal-lynching').hide();
                            onPageComplete(pageId, r);
                        });
                    }
                    // Completed
                });


                $('[data-type="tat"]', item).each(function (idx, it) {
                    var response = [it.innerHTML];
                    wordList.push(it.innerHTML);
                    it = $(it);
                    response = response.concat(it.attr('data-alt').split(';'));
                    var clue = it.attr('data-clue');
                    var h = '<input id="tat-' + ind + '-hole-' + idx + '" type="text"></input>';
                    h += ' <button style="display: none">(?)</button>';
                    h = $('<span />').html(h);
                    $('input', h).data('ans', response);
                    it.replaceWith(h);
                    if (clue) {
                        $('button', h).on('click', function (e) {
                            recupPage.score.addPenalty();
                            // console.warn($(e.target).replace);
                            $(e.target).replaceWith($('<span style="text-decoration: underline;"/>').text('(' + clue + ')'));
                        });
                        $('button', h)[0].style.display = 'inline';
                    }

                });

                if (recupPage.displayHoles) {
                    var plist = wordList;
                    if (recupPage.displayHolesRandomly) {
                        wordList = [];
                        while (plist.length) {
                            wordList.push(plist.splice(Math.round(Math.random() * (plist.length - 1)), 1));
                        }
                    } else {
                        wordList.sort();
                    }
                    $('.wordlist', item).html('Liste des trous: ' + wordList.join(', '));
                    $('.wordlist', item)[0].style.display = 'block';
                }

            });
        };

    })();
})();