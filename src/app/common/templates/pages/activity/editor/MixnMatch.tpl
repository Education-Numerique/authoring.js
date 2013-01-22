/*
* @template : pages/activity/editor/mixnmatch
*/

<div class="container-fluid">



    <div class="widget-box noborder">
        <div class="widget-content" id="page-informations">
            
            <div class="control-group">
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Titre</label>
                    {{view Ember.TextField valueBinding="currentPage.title" focus="true" classNames="span2" id="form-page-title" placeholder="Identifiez la nature du texte"}}
                </div>
                <div class="input-prepend">
                    <label class="add-on" for="form-page-subtitle">Sous-titre</label>
                    {{view Ember.TextField valueBinding="currentPage.subtitle" classNames="span2" id="form-page-subtitle" placeholder="Sous-titre de la page"}}
                </div>
                
            </div>
            <div class="options">
                <!--
                    Activate / deactive
                    Minutes / secondes

                    limitedTime : 0 infini
                //-->
                {{#view view.TimeButton classNames="btn multicontrol nopadding"}}{{view LxxlLib.Ember.Checkbox classNames="btn" checkedBinding="pageActivatedLimitedTime"}}
                    <span data-toggle="modal" href="#modal-page-timer" class="name btn">Temps limité 
                        {{#if pageActivatedLimitedTime}}
                            ({{#bind minutes.selected.id}}{{pad this}}{{/bind}}:{{#bind seconds.selected.id}}{{pad this}}{{/bind}})
                        {{/if}}
                    </span>
                {{/view}}
                <!--
                    displayAll (bool) All together / one by one
                    sequencing || Random : All | number
                    -1 = follow through | 0 = random sur la totalité | X = random sur un subset
                //-->
                    {{#view view.SequenceButton classNames="btn multicontrol nopadding"}}{{view LxxlLib.Ember.Checkbox classNames="btn" checkedBinding="pageActivatedSequencing"}}<span data-toggle="modal" href="#modal-mixnmatch-sequencing"  class="name btn">Séquenceur</span>{{/view}}


                    <button {{action toggleSideDocument target="this"}} type="button" class="name btn radioblock">
                        {{view LxxlLib.Ember.Checkbox checkedBinding="currentPage.hasDocument"}}
                        Side document
                    </button>
                
                
                <!-- <button class="btn">Coefficient</button> -->
            </div>
            <div class="input-prepend">
                    <label class="add-on" for="form-page-explanation">Consigne</label>
                    {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.advice" classNames="redactorjs" plugins="mathjax,tooltip,imagemanager" id="form-page-explanation"}}
                </div>
        </div>
    </div>
    {{#if currentPage.hasDocument}}
    <div class="widget-box">
        <div class="widget-title" data-toggle="slidify" data-target="#page-document">
            <span class="icon">
                <i class="icon-pencil"></i>
            </span>
            <h5>Document</h5>
        </div>
        <div class="widget-content slidify-on nopadding" id="page-document">
                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax,tooltip,imagemanager" classNames="redactorjs"}}
        </div>
    </div>
    {{/if}}
    <hr class="soften" />
    <div class="widget-box questions-toolbar">
        <div class="widget-title">
            <span class="icon">
                <i class="icon-th-list"></i>
            </span>
            <h5>Eléments</h5>
            <button type="button" {{action addElement target="view"}} class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Ajouter un élément</button>
        </div>
    </div>
     {{#collection view.elementsCollectionView contentBinding="currentPage.questions" classNames="questions-list"}}
            <div class="widget-title" data-toggle="slidify" {{bindAttr data-target="view.widgetIdAnchor"}}>
                <span class="icon">
                    <i class="icon-bullhorn"></i>
                </span>
                <h5 class="text-ellipsis">Elément {{view.questionNumber}}</h5>
                {{#view view.DeleteQuestionButton modalName="deleteQuestion" questionBinding="view.content" data-toggle="modal" href="#modal-delete-question" classNames="btn btn-danger btn-mini"}}<i class="icon-remove icon-white"></i>{{/view}}
                
            </div>
            <div class="widget-content slidify nopadding" {{bindAttr id="view.widgetId"}}>
                <table class="table mix-and-match table-bordered table-striped with-check">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponse</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{view LxxlLib.Em.Wysiwyg valueBinding="view.content.text" buttons="bold,italic,|,video" plugins="mathjax,imagemanager" classNames="redactorjs"}}</td>
                            <td>{{view LxxlLib.Em.Wysiwyg valueBinding="view.answer.text" buttons="bold,italic,|,video" plugins="mathjax,imagemanager" classNames="redactorjs"}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {{/collection}}
        
</div>