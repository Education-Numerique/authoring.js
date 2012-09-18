/*
* @template : pages/qtiedit
*/
<form class="form-horizontal">
<div class="row-fluid qti">
    <div class="span10">
        
        <div class="widget-box">
            <div class="widget-title">
                <div class="qti-title span3">
                    <span class="icon"><span class="icon-edit"></span></span>
                    <h5>{{content.title}}</h5>
                </div>
                
            </div>
            <div class="widget-content nopadding">
                <div id="page-management" class="panel-right span3">
                    <div class="panel-title">
                        <h5>Informations</h5>
                    </div>
                    <div class="panel-title">
                        <h5>Pages</h5>
                        <div class="buttons">
                            <a id="add-event" data-toggle="modal" href="#modal-add-event" class="btn btn-success btn-mini"><i class="icon-plus icon-white"></i>Ajouter une page</a>
                            <div class="modal hide" id="modal-add-event">
                                 <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    <h3>Add a new event</h3>
                                </div>
                                <div class="modal-body">
                                    <p>Enter event name:</p>
                                    <p><input id="event-name" type="text"></p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn" data-dismiss="modal">Cancel</a>
                                    <a href="#" id="add-event-submit" class="btn btn-primary">Add event</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-content nopadding">

                        {{#collection view.pagesCollectionView contentBinding="content.pages" tagName="ul" classNames="pages-list"}}
                            <a >
                                <span class="icon"><span class="icon-file"></span></span>
                                <span class="page-title">{{view.content.title}}</span>
                            </a>
                            <span class="questions-count badge badge-info">{{view.content.questions.length}}</span>
                        {{/collection}}
                    </div>
                </div>


                <div class="panel-left span9">

                            <div class="container-fluid">
                                <div class="widget-box">
                                    <div class="widget-title" data-toggle="slidify" data-target="#page-informations">
                                        <span class="icon">
                                            <i class="icon-wrench"></i>
                                        </span>
                                        <h5>Informations</h5>
                                        <button class="btn btn-inverse btn-mini"><i class="icon-plus icon-white"></i>Ajouter une question</button>
                                    </div>
                                    <div class="widget-content slidify-on" id="page-informations">
                                        
                                        <div class="control-group">
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-page-title">Titre</label>
                                                {{view Ember.TextField valueBinding="currentPage.title" classNames="span2" id="form-page-title" placeholder="Identifiez la nature du texte"}}
                                            </div>
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-page-subtitle">Sous-titre</label>
                                                {{view Ember.TextField valueBinding="currentPage.subtitle" classNames="span2" id="form-page-subtitle" placeholder="Sous-titre de la page"}}
                                            </div>
                                            
                                        </div>
                                        <div class="options">
                                            <button class="btn">Temps limité</button>
                                            <button class="btn">Séquenceur</button>
                                            <button class="btn">Coefficient</button>
                                        </div>
                                        <div class="input-prepend">
                                                <label class="add-on" for="form-page-explanation">Consigne</label>
                                                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.advice" classNames="redactorjs" id="form-page-explanation"}}
                                            </div>
                                    </div>
                                </div>
                                <div class="widget-box">
                                    <div class="widget-title" data-toggle="slidify" data-target="#page-document">
                                        <span class="icon">
                                            <i class="icon-pencil"></i>
                                        </span>
                                        <h5>Document</h5>
                                    </div>
                                    <div class="widget-content slidify nopadding" id="page-document">
                                       {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" classNames="redactorjs"}}
                                    </div>
                                </div>
                                <hr class="soften" />
                                {{#collection view.questionsCollectionView contentBinding="currentPage.questions" classNames="questions-list"}}
                                    <div class="widget-title" data-toggle="slidify" {{bindAttr data-target="view.widgetIdAnchor"}}>
                                        <span class="icon">
                                            <i class="icon-th-list"></i>
                                        </span>
                                        <h5>Question {{view.content.text}}</h5>
                                        <button class="btn btn-danger btn-mini"><i class="icon-remove icon-white"></i>Supprimer</button>
                                        <button class="btn btn-inverse btn-mini"><i class="icon-plus icon-white"></i>Ajouter une réponse</button>
                                    </div>
                                    <div class="widget-content slidify nopadding" {{bindAttr id="view.widgetId"}}>
                                            <div class="input-prepend">
                                                <label class="add-on" for="form-question-title">Intitulé</label>
                                                {{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Intitulé de la question"}}
                                            </div>

                                        <div class="container-fix-sortify"> 
                                            <table class="table answers table-bordered table-striped with-check">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th><i class="icon-ok"></i></th>
                                                        <th>Réponse</th>
                                                        <th>Explication</th>
                                                        <th>Coef</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                {{#collection view.answersCollectionView contentBinding="view.content.answers" tagName="tbody"}}
                                                    <td><i class="icon-resize-vertical"></td>
                                                    <td>{{view LxxlLib.Ember.Checkbox checkedBinding="view.content.isCorrect"}}</td>
                                                    <td>{{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Intitulé de la réponse"}}</td>
                                                    <td>{{view Ember.TextField valueBinding="view.content.comment" classNames="span2"  placeholder=""}}</td>
                                                    <td></td>
                                                    <td>{{#view view.DeleteButton modalName="deleteAnswer" answerBinding="view.content" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-answer"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}</td>
                                                {{/collection}}
                                            </table>
                                        </div>
                                    </div>
                                {{/collection}}
                                    
                            </div>
                            

                       
                        
                    <hr class="clear" />
                </div>
                <hr class="clear" />
            </div>
        </div>
    </div>
    <div class="span2">
        <div class="widget-box">
            <div class="widget-title">
                <h5>Publish</h5>
            </div>
            <div class="widget-content">
                toto<br />
                toto <br />
            </div>
        </div>
    </div>
    <div class="span2">
        <div class="widget-box">
            <div class="widget-title">
                <h5>Publish</h5>
            </div>
            <div class="widget-content">
                toto<br />
                toto <br />
            </div>
        </div>
    </div>
</div>
</form>

{{#view view.ModalBox modalName="deleteAnswer"}}
<div class="modal hide" id="modal-delete-answer">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment supprimer cette réponse ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Supprimer{{/view}}
    </div>
</div>
{{/view}}
