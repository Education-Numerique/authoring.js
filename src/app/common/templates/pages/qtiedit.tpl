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
            <div class="widget-content nopadding main-container">
                <div id="page-management" class="panel-right span3">
                    {{#view view.InformationButton classNames="panel-button"}}Informations{{/view}}
                    <div class="panel-title">
                        <h5>Pages</h5>
                        <div class="buttons">
                            <a  data-toggle="modal" href="#modal-create-page" class="btn btn-success btn-mini"><i class="icon-plus icon-white"></i>Ajouter une page</a>
                            
                        </div>
                    </div>
                    <div class="panel-content nopadding">

                        {{#collection view.pagesCollectionView contentBinding="content.pages" tagName="ul" classNames="pages-list"}}
                            <a >
                                <span class="icon"><span {{bindAttr class="view.flavorIcon"}}></span></span>
                                <span class="page-title">{{view.content.title}}</span>
                            </a>
                            {{#view view.DeletePageButton modalName="deletePage" pageBinding="view.content" classNames="btn btn-danger btn-mini delete-page" data-toggle="modal" href="#modal-delete-page"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}
<!--                             <span class="questions-count badge badge-info"></span>
 -->                        {{/collection}}
                    </div>
                </div>


                <div class="panel-left span9">

                            {{#if currentPage}}
                                <div class="container-fluid">
                                    <div class="widget-box">
                                        <div class="widget-title" data-toggle="slidify" data-target="#page-informations">
                                            <span class="icon">
                                                <i class="icon-wrench"></i>
                                            </span>
                                            <h5>Informations</h5>
                                            {{#if view.isQuizz}}
                                                {{#view view.AddQuestionButton tagName="button" classNames="btn btn-inverse btn-mini"}}<i class="icon-plus icon-white"></i>Ajouter une question{{/view}}
                                            {{/if}}
                                        </div>
                                        <div class="widget-content slidify-on" id="page-informations">
                                            
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
                                        <div class="widget-content slidify-on nopadding" id="page-document">
                                            {{#if view.isTat}}
                                                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" activeTat="true" classNames="redactorjs"}}
                                            {{else}}
                                                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" classNames="redactorjs"}}
                                            {{/if}}
                                        </div>
                                    </div>
                                    {{#if view.isQuizz}}
                                        <hr class="soften" />
                                        {{#collection view.questionsCollectionView contentBinding="currentPage.questions" classNames="questions-list"}}
                                            <div class="widget-title" data-toggle="slidify" {{bindAttr data-target="view.widgetIdAnchor"}}>
                                                <span class="icon">
                                                    <i class="icon-th-list"></i>
                                                </span>
                                                <h5>Question {{view.content.text}}</h5>
                                                {{#view view.DeleteQuestionButton modalName="deleteQuestion" questionBinding="view.content" data-toggle="modal" href="#modal-delete-question" classNames="btn btn-danger btn-mini"}}<i class="icon-remove icon-white"></i>Supprimer{{/view}}
                                                {{#view view.AddAnswerButton classNames="btn btn-inverse btn-mini" tagName="button"}}<i class="icon-plus icon-white"></i>Ajouter une réponse{{/view}}
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
                                    {{/if}}
                                        
                                </div>
                            {{else}}
                                <div class="container-fluid">
                                    <div class="widget-box">
                                        <div class="widget-title" data-toggle="slidify" data-target="#page-informations">
                                            <span class="icon">
                                                <i class="icon-wrench"></i>
                                            </span>
                                            <h5>Informations</h5>
                                        </div>
                                        <div class="widget-content slidify-on" id="page-informations">
                                            
                                            <div class="control-group">
                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-title">Titre</label>
                                                    {{view Ember.TextField valueBinding="content.title"  classNames="span2" id="form-page-title" placeholder="Titre de l'activité"}}
                                                </div>

                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-subtitle">Niveau</label>
                                                    {{view LxxlLib.Em.Select contentBinding="levels.content" selectionBinding="content.level" optionLabelPath="content.title" optionValuePath="content.id"}}
                                                </div>
                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-subtitle">Matière</label>
                                                    {{view LxxlLib.Em.Select contentBinding="matters.content" selectionBinding="content.matter" optionLabelPath="content.title" optionValuePath="content.id"}}
                                                </div>
                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-subtitle">Catégories</label>
                                                    {{view Em.GroupedSelect contentBinding="categoryTree" selectionBinding="content.category" optionLabelPath="content.title" optionValuePath="content.id"}}
                                                </div>
                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-subtitle">Durée</label>
                                                    {{view LxxlLib.Em.Select contentBinding="lengths.content" selectionBinding="content.duration" optionLabelPath="content.title" optionValuePath="content.id"}}
                                                </div>
                                                
                                                <div class="input-prepend">
                                                    <label class="add-on" for="form-page-subtitle">Difficulté</label>
                                                    {{view LxxlLib.Em.Select contentBinding="difficulties.content" selectionBinding="content.difficulty" optionLabelPath="content.title" optionValuePath="content.id"}}
                                                </div>
                                                
                                            </div>
                                            <div class="input-prepend">
                                                    <label class="add-on" for="form-page-explanation">Description</label>
                                                    {{view LxxlLib.Em.Wysiwyg valueBinding="content.description" classNames="redactorjs" id="form-page-explanation"}}
                                                </div>
                                        </div>
                                    </div>
                                        
                                </div>
                            {{/if}}

                       
                        
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
                {{#view view.DoPreview classNames="btn"}}<i class="icon-eye-open"></i>Preview{{/view}}
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

{{#view view.ModalBox modalName="deleteQuestion"}}
<div class="modal hide" id="modal-delete-question">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment supprimer cette question ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Supprimer{{/view}}
    </div>
</div>
{{/view}}

{{#view view.ModalBox modalName="deletePage"}}
<div class="modal hide" id="modal-delete-page">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment supprimer cette page ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Supprimer{{/view}}
    </div>
</div>
{{/view}}

<div class="modal hide" id="modal-create-page">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Créer une nouvelle page</h3>
    </div>
    <div class="modal-body" style="height:200px">
        <p>Choisissez le template de votre page</p>
        <p>{{view Ember.Select contentBinding="flavors.content" selectionBinding="flavors.selected" optionLabelPath="content.label" optionValuePath="content.value"}}</p>
    </div>
    <div class="modal-footer">
        <a class="btn" data-dismiss="modal">Annuler</a>
        {{#view view.AddPageButton classNames="btn btn-primary" tagName="a"}}Créer{{/view}}
    </div>
</div>


<div class="modal hide" id="modal-preview" role="dialog" aria-labelledby="modal-preview-label" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="modal-preview-label">Preview</h3>
  </div>
  <div class="modal-body">
    <p id="modal-preview-body"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
  </div>
</div>
