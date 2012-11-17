/*
* @template : pages/qtiedit
*/

<form class="form-horizontal">
<div class="row-fluid qti" {{bindAttr class="isStaticPage isQuizz isTat"}}>

    <div class="span12">
        
        <div class="widget-box">
            <div class="widget-title">
                <div class="qti-title span3">
                    <span class="icon"><span class="icon-edit"></span></span>
                    <h5 class="text-ellipsis unselectable">{{content.title}}</h5>
                </div>
                {{#view view.DoPreview classNames="btn"}}<i class="icon-eye-open spacify"></i>Preview{{/view}}

            </div>
            <div class="widget-content nopadding main-container">
                <div id="page-management" class="panel-right span3">
                    {{#view view.InformationButton classNames="panel-button"}}Informations{{/view}}
                    <div class="panel-title" {{bindAttr class="currentPage:section-active"}}>
                        <h5>Pages</h5>
                        <div class="buttons">
                            <a  data-toggle="modal" href="#modal-create-page" class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Ajouter une page</a>
                            
                        </div>
                    </div>
                    <div class="panel-content nopadding">

                        {{#collection view.pagesCollectionView contentBinding="content.pages" tagName="ul" classNames="pages-list"}}
                                <span class="icon"><span {{bindAttr class="view.flavorIcon"}}></span></span>
                                <span class="page-title">{{view.content.title}}</span>
                            {{#view view.DeletePageButton modalName="deletePage" pageBinding="view.content" classNames="btn btn-danger btn-mini delete-page" data-toggle="modal" href="#modal-delete-page"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}
                        {{/collection}}
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
                                            <h5>Informations de la page</h5>
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
                                                {{#unless isTat}}
                                                    {{#view view.SequenceButton classNames="btn multicontrol nopadding"}}{{view LxxlLib.Ember.Checkbox classNames="btn" checkedBinding="pageActivatedSequencing"}}<span class="name btn">Séquenceur</span>{{/view}}
                                                {{else}}
                                                     <button data-toggle="modal" href="#modal-page-gestion" class="name btn">
                                                        Gestion
                                                    </button>
                                                {{/unless}}
                                                <!-- <button class="btn">Coefficient</button> -->
                                            </div>
                                            <div class="input-prepend">
                                                    <label class="add-on" for="form-page-explanation">Consigne</label>
                                                    {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.advice" classNames="redactorjs" plugins="mathjax" id="form-page-explanation"}}
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
                                            {{#if isTat}}
                                                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax,tat" classNames="redactorjs"}}
                                            {{else}}
                                                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax" classNames="redactorjs"}}
                                            {{/if}}
                                        </div>
                                    </div>
                                    {{#if isQuizz}}
                                        <hr class="soften" />
                                        <div class="widget-box questions-toolbar">
                                            <div class="widget-title">
                                                <span class="icon">
                                                    <i class="icon-th-list"></i>
                                                </span>
                                                <h5>Questions</h5>
                                                {{#view view.AddQuestionButton tagName="button" classNames="btn btn-success btn-mini"}}<i class="icon-plus icon-white spacify"></i>Ajouter une question{{/view}}
                                                {{#view view.CollapseAllQuestions tagName="button" classNames="btn btn-mini" }}
                                                    <i class="icon-resize-small spacify"></i>Collapse all
                                                {{/view}}
                                            </div>
                                        </div>
                                        {{#collection view.questionsCollectionView contentBinding="currentPage.questions" classNames="questions-list"}}
                                            <div class="widget-title" data-toggle="slidify" {{bindAttr data-target="view.widgetIdAnchor"}}>
                                                <span class="icon">
                                                    <i class="icon-bullhorn"></i>
                                                </span>
                                                <h5 class="text-ellipsis">Question {{view.questionNumber}}</h5>
                                                {{#view view.DeleteQuestionButton modalName="deleteQuestion" questionBinding="view.content" data-toggle="modal" href="#modal-delete-question" classNames="btn btn-danger btn-mini"}}<i class="icon-remove icon-white"></i>{{/view}}
                                                
                                            </div>
                                            <div class="widget-content slidify nopadding" {{bindAttr id="view.widgetId"}}>
                                                    <div class="input-prepend">
                                                        <label class="add-on" for="form-question-title">Intitulé</label>
                                                        {{view LxxlLib.Em.Wysiwyg valueBinding="view.content.text" air=true oneLine=true plugins="mathjax" classNames="redactorjs"}}
                                                    </div>
                                                    {{#view view.AddAnswerButton classNames="btn btn-inverse btn-mini" tagName="button"}}<i class="icon-plus icon-white spacify"></i>Ajouter une réponse{{/view}}

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
                                                    {{#if isQuizzMulti}}
                                                        {{#collection view.answersCollectionView contentBinding="view.content.answers" tagName="tbody"}}
                                                            <td><i class="icon-resize-vertical"></td>
                                                            <td>{{view LxxlLib.Ember.Checkbox checkedBinding="view.content.isCorrect"}}</td>
                                                            <td>{{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Intitulé de la réponse"}}</td>
                                                            <td>{{view Ember.TextField valueBinding="view.content.comment" classNames="span2"  placeholder=""}}</td>
                                                            <td></td>
                                                            <td>{{#view view.DeleteButton modalName="deleteAnswer" answerBinding="view.content" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-answer"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}</td>
                                                        {{/collection}}
                                                    {{else}}
                                                        {{#collection view.answersCollectionView contentBinding="view.content.answers" tagName="tbody"}}
                                                            <td><i class="icon-resize-vertical"></td>
                                                            <td>{{view LxxlLib.Em.RadioButton nameBinding="view.parentView.elementId" valueBinding="view.content" groupBinding="view.parentView.selectedAnswer"}}</td>
                                                            <td>{{view Ember.TextField valueBinding="view.content.text" classNames="span2"  placeholder="Intitulé de la réponse"}}</td>
                                                            <td>{{view Ember.TextField valueBinding="view.content.comment" classNames="span2"  placeholder=""}}</td>
                                                            <td></td>
                                                            <td>{{#view view.DeleteButton modalName="deleteAnswer" answerBinding="view.content" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-answer"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}</td>
                                                        {{/collection}}
                                                    {{/if}}
                                                </table>
                                            </div>
                                        {{/collection}}
                                    {{/if}}
                                        
                                </div>
                            {{else}}
                                {{view view.InformationTab}}
                            {{/if}}

                       
                        
                    <hr class="clear" />
                </div>
                <hr class="clear" />
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
        <p>{{view Ember.Select contentBinding="flavors.content" selectionBinding="flavors.selected" optionLabelPath="content.title" optionValuePath="content.id"}}</p>
    </div>
    <div class="modal-footer">
        <a class="btn" data-dismiss="modal">Annuler</a>
        {{#view view.AddPageButton classNames="btn btn-primary" tagName="a"}}Créer{{/view}}
    </div>
</div>

<div class="modal hide" id="modal-page-timer">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Gérer le temps limité</h3>
    </div>
    <div class="modal-body" style="height:200px">
        {{view LxxlLib.Em.Select contentBinding="minutes.content" selectionBinding="minutes.selected" optionLabelPath="content.title" optionValuePath="content.id"}}
        {{view LxxlLib.Em.Select contentBinding="seconds.content" selectionBinding="seconds.selected" optionLabelPath="content.title" optionValuePath="content.id"}}
    </div>
    <div class="modal-footer">
        <a class="btn btn-primary" data-dismiss="modal">Ok</a>
    </div>
</div>


{{#if isTat}}
{{#view view.TatGestion}}
<div class="modal hide" id="modal-page-gestion">
    <div class="modal-body" style="height:300px">
       <div class="tabbable"> <!-- Only required for left/right tabs -->
        <button type="button" class="close" data-dismiss="modal">×</button>
          <ul class="nav nav-tabs">
            <li class="active"><a href="#general" data-toggle="tab">General</a></li>
            <li><a href="#trous" data-toggle="tab">Trous</a></li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="general">
                <form>
                  <fieldset>
                    
                     <label>{{view LxxlLib.Ember.Checkbox checkedBinding="currentPage.displayHoles"}}Afficher tous les trous</label> <br />
                    {{#if currentPage.displayHoles}}
                        <label>Trier les mots par ordre :</label>
                        {{view LxxlLib.Em.RadioButton name="tat_options_sort" checkedBinding="tatIsAlphabetical" value=false title="Alphabétique" groupBinding="tatIsRandom"}}
                        {{view LxxlLib.Em.RadioButton name="tat_options_sort" checkedBinding="tatIsRandom" value=true title="Aléatoire" groupBinding="tatIsRandom"}}
                    {{/if}}
                  </fieldset>
                </form>
            </div>
            <div class="tab-pane" id="trous">
                {{#if view.tats.length}}
                <form>
                  <fieldset>
                    <label>Mot supprimé :</label>
                    {{view Ember.TextField valueBinding="view.currentTat.word"}}
                    <label>Indice :</label>
                    {{view Ember.TextField valueBinding="view.currentTat.clue"}}
                    <label>Alternatives (séparées par ; | joker : *) :</label>
                    {{view Ember.TextField valueBinding="view.currentTat.alt"}}
                   
                  </fieldset>
                </form>
                <ul class="pager" style="padding-top:10px">
                      <li {{bindAttr class="view.hasPrevious:show:disabled"}}><a {{action goPrevious target="this"}} >Précédent</a></li>
                      <li {{bindAttr class="view.hasNext:show:disabled"}}><a {{action goNext target="this" }} >Suivant</a></li>
                  
                </ul>
                {{else}}
                    Aucun trou
                {{/if}}
            </div>
          </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="btn btn-primary" data-dismiss="modal">Ok</a>
    </div>
</div>
{{/view}}
{{/if}}


<div class="modal hide" id="modal-preview" role="dialog" aria-labelledby="modal-preview-label" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="modal-preview-label">Preview</h3>
  </div>
  <div class="modal-body">
    <p id="modal-preview-body"></p>
  </div>
</div>


<div id="redactor-mathjax" style="display: none;">
    <div id="redactor_modal_content">
        <label>Formule : </label>
        <input type="text" class="formula redactor_input" value="f(x)=sum_(n=0)^oo(f^((n))(a))/(n!)(x-a)^n" />
        <label>Aperçu : </label>
        <div class="preview" style="float:left;margin-top:10px;"></div>
    </div>
            <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn" href="http://www1.chapman.edu/~jipsen/mathml/asciimathsyntax.html" style="float:left;" target="_blank">Documentation</a>
        <a class="redactor_modal_btn redactor_btn_modal_insert">Insérer</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Fermer</a>
    </div>
</div>

<div id="redactor-tat" style="display: none;">
    <div id="redactor_modal_content">
        <label>Mot supprimé : </label>
        <input type="text" class="word redactor_input" value="" />
        <label>Indice : </label>
        <input type="text" class="clue redactor_input" value="" />
        <label>Alternatives (séparées par ; | joker : *) : </label>
        <input type="text" class="alternatives redactor_input" value="" />
    </div>
            <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn redactor_btn_modal_insert">Trouer</a>
        <a class="redactor_modal_btn redactor_btn_modal_remove">Reboucher</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Annuler</a>
    </div>
</div>

