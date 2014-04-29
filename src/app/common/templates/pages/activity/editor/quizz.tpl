/*
* @template : pages/activity/editor/quizz
*/

<div class="container-fluid">

    <div class="widget-box noborder">
        <div class="widget-content" id="page-informations">
            
            <div class="control-group">
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Titre</label>
                    {{view Ember.TextField valueBinding="currentPage.title" focus="true" classNames="span2" id="form-page-title" placeholder="QCM/QRM"}}
                </div>
            <!-- Ciao sous-titre ...
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Sous-titre</label>
                    [[view Ember.TextField valueBinding="currentPage.subtitle" classNames="span2" id="form-page-subtitle" placeholder="Sous-titre de la page"]]
                </div>
            -->
                
            </div>
            <div class="options">
                <!--
                    Activate / deactive
                    Minutes / secondes

                    limitedTime : 0 infini
                
                [[#view view.TimeButton classNames="btn multicontrol master-button nopadding"]][[view LxxlLib.Ember.Checkbox classNames="btn" checkedBinding="pageActivatedLimitedTime"]]
                    <span data-toggle="modal" href="#modal-page-timer" class="name btn">Temps limité 
                        [[#if pageActivatedLimitedTime]]
                            ([[#bind minutes.selected.id]][[pad this]][[/bind]]:[[#bind seconds.selected.id]][[pad this]][[/bind]])
                        [[/if]]
                    </span>
                [[/view]]
                //-->
                <!--
                    displayAll (bool) All together / one by one
                    sequencing || Random : All | number
                    -1 = follow through | 0 = random sur la totalité | X = random sur un subset
                //-->
                    {{#view view.SequenceButton classNames="btn master-button multicontrol nopadding"}}{{view LxxlLib.Ember.Checkbox classNames="btn" checkedBinding="pageActivatedSequencing"}}<span data-toggle="modal" href="#modal-page-sequencing"  class="name btn">Séquenceur</span>{{/view}}

                <!-- Ciao Side Document ....
                    <button [[action toggleSideDocument target="this"]] type="button" class="name btn radioblock">
                        [[view LxxlLib.Ember.Checkbox checkedBinding="currentPage.hasDocument"]]
                        Side document
                    </button>
                -->
                
                <!-- <button class="btn">Coefficient</button> -->
            </div>
            
            <div class="widget-box">
        <div class="widget-title" data-toggle="slidify" data-target="#page-document">
            <span class="icon">
                <i class="icon-pencil"></i>
            </span>
            <h5>Document</h5>
        </div>
        <div class="widget-content slidify-on nopadding" id="page-document">
            {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.advice" classNames="redactorjs" plugins="mathjax,tooltip,imagemanager" id="form-page-explanation"}}
        </div>
    </div>
          
                
        </div>
    </div>
<!-- Ciao Side Document ....
    [[#if currentPage.hasDocument]]
    <div class="widget-box">
        <div class="widget-title" data-toggle="slidify" data-target="#page-document">
            <span class="icon">
                <i class="icon-pencil"></i>
            </span>
            <h5>Document</h5>
        </div>
        <div class="widget-content slidify-on nopadding" id="page-document">
                [[view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax,tooltip,imagemanager" classNames="redactorjs"]]
        </div>
    </div>
    [[/if]]
-->
        <hr class="soften" />
        <div class="widget-box questions-toolbar">
            <div class="widget-title">
                <span class="icon">
                    <i class="icon-th-list"></i>
                </span>
                <h5>Questions</h5>
                <button type="button" {{action addQRM target="view"}} class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Ajouter un QRM</button>
                <button type="button" {{action addQCM target="view"}} class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Ajouter un QCM</button>
                {{#view view.CollapseAllQuestions tagName="button" classNames="btn btn-mini" }}
                    <i class="icon-resize-small spacify"></i>Réduire tout
                {{/view}}
            </div>
        </div>
        {{#collection view.questionsCollectionView contentBinding="currentPage.questions" classNames="questions-list"}}
            <div class="widget-title" data-toggle="slidify" {{bindAttr data-target="view.widgetIdAnchor"}}>
                <span class="icon">
                    <i class="icon-bullhorn"></i>
                </span>
                <h5 class="text-ellipsis">Question {{view.questionNumber}} {{view.displayTitle}}</h5>
                {{#view view.DeleteQuestionButton modalName="deleteQuestion" questionBinding="view.content" data-toggle="modal" href="#modal-delete-question" classNames="btn btn-danger btn-mini"}}<i class="icon-remove icon-white"></i>{{/view}}
                
            </div>
            <div class="widget-content slidify nopadding" {{bindAttr id="view.widgetId"}}>
                    <div class="input-prepend">
                        <label class="add-on" for="form-question-title">Question</label>
                        {{view LxxlLib.Em.Wysiwyg valueBinding="view.content.text" air=true oneLine=true plugins="mathjax" classNames="redactorjs"}}
                    </div>
                    

                <table class="table answers table-bordered table-striped with-check">
                    <thead>
                        <tr>
                            <th></th>
                            <th><i class="icon-ok"></i></th>
                            <th>Réponse</th>
                            <th>Explication</th>
                            <!-- <th>Coef</th> -->
                            <th></th>
                        </tr>
                    </thead>
                    {{#if view.content.isQRM}}
                        {{#collection view.answersCollectionView contentBinding="view.content.answers" questionBinding="view.content" tagName="tbody"}}
                            <td><i class="icon-resize-vertical"></td>
                            <td>{{view LxxlLib.Ember.Checkbox checkedBinding="view.content.isCorrect"}}</td>
                            <td>{{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Réponse proposée"}}</td>
                            <td>{{view Ember.TextField valueBinding="view.content.comment" classNames="span2"  placeholder=""}}</td>
                            <!-- <td></td> -->
                            <td>{{#view view.DeleteButton modalName="deleteAnswer" questionBinding="view.parentView.parentView.content" answerBinding="view.content" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-answer"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}</td>
                        {{/collection}}
                    {{else}} <!-- QCM -->
                        {{#collection view.answersCollectionView contentBinding="view.content.answers" tagName="tbody"}}
                            <td><i class="icon-resize-vertical"></td>
                            <td>{{view LxxlLib.Em.RadioButton nameBinding="view.parentView.elementId" valueBinding="view.content" groupBinding="view.parentView.selectedAnswer" checkedBinding="view.content.isCorrect"}}</td>
                            <td>{{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Réponse proposée"}}</td>
                            <td>{{view Ember.TextField valueBinding="view.content.comment" classNames="span2"  placeholder=""}}</td>
                            <!-- <td></td> -->
                            <td>{{#view view.DeleteButton modalName="deleteAnswer" questionBinding="view.parentView.parentView.content" answerBinding="view.content" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-answer"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}</td>
                        {{/collection}}
                    {{/if}}

                </table>
                {{#view view.AddAnswerButton classNames="btn btn-inverse btn-mini add-answer-button" tagName="button"}}<i class="icon-plus icon-white spacify"></i>Ajouter une réponse{{/view}}
            </div>
        {{/collection}}
        
</div>