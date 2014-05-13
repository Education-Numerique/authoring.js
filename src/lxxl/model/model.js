jsBoot.use('jsBoot.types.TypedMutable');
jsBoot.use('jsBoot.types.getPooledMutable');
jsBoot.use('jsBoot.types.ArrayMutable');
jsBoot.use('jsBoot.types.utils');
jsBoot.use('jsBoot.core.Error');
jsBoot.use('jsBoot.service.core').as('servicesCore');
jsBoot.use('LxxlLib.service.activities', true).as('service');
jsBoot.use('LxxlLib.service.blob', true).as('blobService');

jsBoot.pack('LxxlLib.model', function (api) {
    'use strict';

    var blanket = function () {
    };

    /**
     * This is the base model describing activities metadata
     */

    this.Matter = api.getPooledMutable({
        id: '',
        title: ''
    });

    this.Level = api.getPooledMutable({
        id: '',
        title: ''
    });

    this.Length = api.getPooledMutable({
        id: 0,
        title: ''
    });

    this.Difficulty = api.getPooledMutable({
        id: '',
        title: ''
    });

    this.Flavor = api.getPooledMutable({
        id: '',
        title: ''
    });

    /*  this.Discipline = api.getPooledMutable({
     id: '',
     title: ''
     });
     */
    var catDescriptor = {
        id: '',
        title: '',
        matter: this.Matter,
        level: this.Level
    };

    this.Category = api.getPooledMutable(catDescriptor);
    // Mutate the descriptor to workaround the loop problem
    catDescriptor.content = api.ArrayMutable.bind({}, this.Category);


    /**
     * This is the activity model itself
     */
    this.Answer = api.TypedMutable.bind({}, {
        text: '',
        comment: '',
        isCorrect: false,
        weight: 0
    });

    this.Question = api.TypedMutable.bind({}, {
        coef: 0,
        text: '',
        isQRM: false,
        answers: api.ArrayMutable.bind({}, this.Answer)
    });

    this.Page = api.TypedMutable.bind({}, {
        flavor: this.Flavor,
        title: '',
        subtitle: '',
        advice: '',
        hasDocument: false,
        document: '',
        tat: '',
        limitedTime: 0,// // 0 == infinity - X seconds = time
        coef: 0,
        sequencing: -1,// -1 = follow through | 0 = random sur la totalité | X = random sur un subset
        // M&M: 0 ordered, 1 random
        displayHoles: false,
        displayHolesRandomly: false, // false = alphabetical, true = random

        displayAll: true,
        questions: api.ArrayMutable.bind({}, this.Question)
    });


    this.User = api.TypedMutable.bind({}, {
        uid: '',
        username: '',
        email: '',
        level: '',
        hasAvatar: false,
        profile: {}
    });

    // var tt = function(v){
    //   return '//' + api.servicesCore.requestor.hostPort + '/' + api.servicesCore.requestor.version + '/activities/' +
    //   v;
    // };

    // tt.isDirty = true;

    var MetaBlob = api.TypedMutable.bind({}, {
        media: api.ArrayMutable.bind({}, null),
        attachments: api.ArrayMutable.bind({}, null)
    });

    var Attachee = api.TypedMutable.bind({}, {
        id: '',
        url: '',
        type: '',
        name: ''
    });

    var Extra = api.TypedMutable.bind({}, {
        attachments: api.ArrayMutable.bind({}, Attachee)
    });

    var SubActivity = api.TypedMutable.bind({}, {
        title: 'Nouvelle Activité',
        description: 'Présentez ici votre activité en 200 caractères.',
        contributors: api.ArrayMutable.bind({}, this.User),
        extraContributors: api.ArrayMutable.bind({}, ''),
        level: this.Level,//new this.Level({id: 'other'}),
        matter: this.Matter,//new this.Matter({id: 'other'}),
        duration: this.Length,//new this.Length({id: 0}),
        difficulty: this.Difficulty,//new this.Difficulty({id: 'easy'}),
        category: api.ArrayMutable.bind({}, this.Category),
        thumbnailUrl: '',
        blobs: MetaBlob,
        pages: api.ArrayMutable.bind({}, this.Page),
        extra: Extra
    });

    var dirtyDateConverter = function (v) {
        if (v)
            return new Date(v * 1000);
        return null;
    };
    dirtyDateConverter.isDirty = true;

    var Activity = api.TypedMutable.bind({}, {
        id: '',
        creationDate: dirtyDateConverter,
        publicationDate: dirtyDateConverter,
        author: this.User,
        seenCount: 0,
        isDeleted: false,
        isPublished: false,
        isReported: false,
        draft: SubActivity,
        published: SubActivity
    });

    var success = function () {
    };

    var failure = function () {
        /*global console:false*/
        try {
            throw new api.Error('CREATION_FAILURE', 'Failed saving activity to service');
        } catch (e) {
            // Might occur in rare legit conditions (race between competing network calls) - doesn't really matter - the shit returns 404
            console.error(e);
        }
    };

    this.Activity = function (initialMesh) {
        var i = new Activity(initialMesh);
        i.draft.controller = i;
        i.published.controller = i;

        var prefix = '//' + api.servicesCore.requestor.hostPort + '/' + api.servicesCore.requestor.version + '/blob/';
        i.pull = function (onready) {
            if (!this.id || !api.service)
                return;
            api.service.read((function (d) {
                if ('blobs' in d.draft) {
                    Object.keys(d.draft.blobs).forEach(function (key) {
                        d.draft.blobs[key] = d.draft.blobs[key].map(function (id) {
                            return prefix + id + '/draft';
                        }, this);
                    }, this);
                    if ('thumbnail' in d.draft.blobs)
                        this.draft.set('thumbnailUrl', d.draft.blobs.thumbnail.pop());
                }

                if ('blobs' in d.published) {
                    Object.keys(d.published.blobs).forEach(function (key) {
                        d.published.blobs[key] = d.published.blobs[key].map(function (id) {
                            return prefix + id + '/published';
                        }, this);
                    }, this);
                    if ('thumbnail' in d.published.blobs)
                        this.published.set('thumbnailUrl', d.draft.blobs.thumbnail.pop());
                }

                try {
                    this.fromObject(d);
                    if (onready)
                        onready();
                } catch (e) {
                    this.isBroken = true;
                    alert('Quelque chose ne va pas et votre activité n\'a pas pu être chargée. Merci de rapporter ce bug en mentionnant l\'activité');
                }
            }.bind(this)), failure, this.id);
        };

        // Don't fail to init stuff in lists
        if (initialMesh && initialMesh.published) {
            if ('blobs' in initialMesh.draft) {
                if ('thumbnail' in initialMesh.draft.blobs)
                    i.draft.set('thumbnailUrl', prefix + initialMesh.draft.blobs.thumbnail.pop() + '/draft');
            }
            if ('blobs' in initialMesh.published) {
                if ('thumbnail' in initialMesh.published.blobs)
                    i.published.set('thumbnailUrl', prefix + initialMesh.published.blobs.thumbnail.pop() + '/published');
            }
        }

        i.isDead = false;
        i.push = function (altSuccess) {
            if (this.isDead)
                return;
            if (!api.service)
                return;
            if (!this.id) {
                api.service.create((function (d) {
                    this.set('id', d.id);
                }.bind(this)), failure, this.draft.toObject());
            } else {
                var p = this.draft.toObject();
                api.service.patch(altSuccess || success, failure, this.id, p);
            }
        };

        i.addMedia = function (blob, success/*, error*/) {
            if (!this.id || !api.service)
                return;
            api.service.addMedia((function (d) {
                this.draft.blobs.media.pushObject('//' + api.servicesCore.requestor.hostPort + d.url);
                success('//' + api.servicesCore.requestor.hostPort + d.url, d.blobId);
            }.bind(this)), function () {
            }, this.id, blob);
        };

        var handleDetachChange = function (arr, start, removeCount/*, addCount*/) {
            for (var x = start; x < start + removeCount; x++)
                api.blobService.remove(blanket, blanket, arr[x].id);
        };

        if (typeof Ember != 'undefined')
            i.draft.extra.attachments.addArrayObserver(i, {willChange: handleDetachChange, didChange: blanket});

        // XXX handle remove attachments
        i.addAttachment = function (blob, name, success, error) {
            if (!this.id || !api.service)
                return;
            api.service.addAttachment((function (d) {
                this.draft.extra.attachments.pushObject(new Attachee({
                    id: d.blobId,
                    url: '//' + api.servicesCore.requestor.hostPort + d.url,
                    name: name,
                    type: blob.type
                }));
                success('//' + api.servicesCore.requestor.hostPort + d.url, d.blobId);
            }.bind(this)), function (d) {
                error(d);
            }, this.id, blob);
        };

        i.setThumbnail = function (blob) {
            if (!this.id || !api.service)
                return;
            api.service.addThumbnail((function (d) {
                this.draft.set('thumbnailUrl', '//' + api.servicesCore.requestor.hostPort + d.url + '?' + Math.random());
            }.bind(this)), blanket, this.id, blob);
        };

        i.removeThumbnail = function () {
            this.draft.set('thumbnailUrl', null);
            if (!this.id || !api.service)
                return;
            // XXX not plugged service-side
            // api.service.addThumbnail((function(d){
            //   console.warn("sucessfully published thumbnail blob with return", d);
            //   this.set('thumbnailUrl', d);
            // }.bind(this)), function(){}, this.id, blob);
        };

        var d = i.destroy;
        i.destroy = function () {
            this.isDead = true;
            if (this.id && api.service)
                api.service.remove(success, failure, this.id);
            d.apply(this);
        };

        i.report = function () {
            if (!this.id || !api.service)
                return;
            api.service.report(success, failure, this.id);
        };

        i.unreport = function () {
            if (!this.id || !api.service)
                return;
            api.service.unreport(success, failure, this.id);
        };

        i.seen = function () {
            if (!this.id || !api.service)
                return;
            this.seenCount++;
            api.service.seen(success, failure, this.id);
        };

        // Should imply a push
        i.publish = function () {
            if (!this.id || !api.service)
                return;
            this.set('isPublished', true);
            api.service.publish(success, failure, this.id);
        };

        i.unpublish = function () {
            if (!this.id || !api.service)
                return;
            this.set('isPublished', false);
            api.service.unpublish(success, failure, this.id);
        };

        i.SHORT_TITLE = 'SHORT_TITLE';
        i.SHORT_DESCRIPTION = 'SHORT_DESCRIPTION';
        i.LONG_DESCRIPTION = 'LONG_DESCRIPTION';
        i.ONE_PAGE = 'ONE_PAGE';
        i.NO_GOOD_ANSWER = 'NO_GOOD_ANSWER';
        i.PERF_MUSTACHE_MALFORMED = 'PERF_MUSTACHE_MALFORMED';
        i.errorDescription = "";

        i.canPublish = function () {
            var err = false;
            var self = this;
            this.errorDescription = "";

            var ok = this.draft.pages.every(function (page) {
                if (page.flavor.id == 'quizz') {
                    return page.questions.every(function (question) {
                        return question.answers.some(function (answer) {
                            return (answer.isCorrect == true);
                        });
                    });
                }
                else {
                    return true;
                }
            });

            if (!ok) {
                err = this.NO_GOOD_ANSWER;
            }


            var perfPagesOk = this.draft.pages
                .filter(function (page) {
                    return page.flavor.id == "perf" && !!page.document;
                })
                .every(function (page) {
                    var mustacheRegex = /{{(.*?)}}/g;
                    var mustachesContent = page.document.match(mustacheRegex);

                    var htmlChars = {
                        '&gt;': '>',
                        '&lt;': '<'
                    };

                    if (!!mustachesContent) {
                        return mustachesContent.every(function (mustacheContent) {
                            var formattedContent = Object.keys(htmlChars).reduce(function (currentFormattedContent, htmlChar) {
                                return currentFormattedContent.replace(new RegExp(htmlChar, 'g'), htmlChars[htmlChar])
                            }, mustacheContent.replace(/ /g, ''));

                            var contentRegex = /^{{(\/if|#if activite\.(pages\[\d{1,4}]\.)?note(==|>=|<=|<|>)(100|\d{1,2})|(activite\.(pages\[\d{1,4}]\.)?note)(\[\/(20|100)\])?)}}$/i;
                            var contentIsValid = !!formattedContent.match(contentRegex);
                            if (!contentIsValid) {
                                self.errorDescription += mustacheContent + '<br/>';
                            }
                            return contentIsValid;
                        });
                    }
                    return true;
                });

            if (!perfPagesOk) {
                err = this.PERF_MUSTACHE_MALFORMED;
            }

            if (this.draft.pages.length < 1)
                err = this.ONE_PAGE;
            if (this.draft.description.replace(/(<[^>]+>)/g, '').length < 20)
                err = this.SHORT_DESCRIPTION;
            if (this.draft.description.replace(/(<[^>]+>)/g, '').length > 200)
                err = this.LONG_DESCRIPTION;
            if (this.draft.title.length < 4)
                err = this.SHORT_TITLE;

            return err;
        };

        return i;
    };
});
