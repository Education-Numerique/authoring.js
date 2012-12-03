/*
* @template : pages/activity/editor
*/

<form class="form-horizontal">
<div class="row-fluid qti" {{bindAttr class="isStaticPage isQuizz isTat"}}>

    <div class="span12">
        
        <div class="widget-box">
            <div class="widget-title">
                <div class="qti-title span3">
                    <span style="display: none;" class="icon"><span class="icon-edit"></span></span>
                    <h5 style="display: none;" class="text-ellipsis unselectable">{{content.title}}</h5>
                    <h5 class="text-ellipsis unselectable">Pages de l'activité</h5>
                </div>
                <button type="button" {{action saveActivity target="controller"}} class="btn btn-mini"><!--<i class="icon-eye-open spacify"></i>-->Sauvegarder</button>
                {{#view view.DoExport classNames="btn btn-mini"}}<!--<i class="icon-eye-open spacify"></i>-->Exporter{{/view}}
                {{#view view.DoPreview classNames="btn btn-mini"}}<!--<i class="icon-eye-open spacify"></i>-->Preview{{/view}}
                <button type="button" {{action publishActivity target="controller"}} class="btn btn-mini"><!--<i class="icon-eye-open spacify"></i>-->Publier</button>

            </div>
            <div class="widget-content nopadding main-container">
                <div id="page-management" class="panel-right span3">
                    {{#view view.InformationButton classNames="panel-button"}}Informations{{/view}}
                    
                    <div class="panel-content nopadding">

                        {{#collection view.pagesCollectionView contentBinding="content.pages" tagName="ul" classNames="pages-list"}}
                                <span class="icon"><span {{bindAttr class="view.flavorIcon"}}></span></span>
                                <span class="page-title">{{view.content.title}}</span>
                            {{#view view.DeletePageButton modalName="deletePage" pageBinding="view.content" classNames="btn btn-danger btn-mini delete-page" data-toggle="modal" href="#modal-delete-page"}}<i class="icon-remove icon-white full-opacity"></i>{{/view}}
                        {{/collection}}
                    </div>
                    <div class="panel-title">
                        <div class="buttons">
                            <a  data-toggle="modal" href="#modal-create-page" class="btn btn-success btn-mini"><i class="icon-plus icon-white spacify"></i>Ajouter une page</a>
                            
                        </div>
                    </div>
                </div>


                <div class="panel-left span9">

                            {{#if currentPage}}
                                {{#if isStaticPage}}
                                    {{view view.StaticPage}}
                                {{/if}}
                                {{#if isQuizz}}
                                    {{view view.QuizzPage}}
                                {{/if}}
                                {{#if isTat}}
                                    {{view view.TatPage}}
                                {{/if}}
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
<div class="modal" style="display:none" id="modal-delete-page">
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
        <div class="redactor_tabs">
            <a href="javascript:void(null);" class="asciimath redactor_tabs_act">AsciiMath</a>
            <a href="javascript:void(null);" class="latex">Latex</a>
        </div>
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

<div id="redactor-imagemanager" style="display: none;">
    <div id="redactor_modal_content">
        <div class="redactor_droparea"><div class="redactor_dropareabox">Déposez le fichier ici</div></div>
        <button class="btn btn-large add-thumbnail">
            <i class="icon-plus"></i>
            <input class="redactor_imageupload" type="file" name="file" class="">
            Ajouter une image
        </button>
    </div>
    <div id="redactor_modal_footer">
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

<div id="redactor-tooltip" style="display: none;">
      <div id="redactor_modal_content">
        <label>Texte </label>
        <input type="text" class="text redactor_input" value="" />
        <label>Tooltip </label>
        <input type="text" class="content redactor_input" value="" />
        <label>Emplacement </label>
        <label><input type="radio" name="placement" value="top" checked="checked" /> Haut</label>
        <label><input type="radio" name="placement" value="right" /> Droite</label>
        <label><input type="radio" name="placement" value="bottom" /> Bas</label>
        <label><input type="radio" name="placement" value="left" /> Gauche</label>

    </div>
    <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn redactor_btn_modal_insert">Insérer</a>
        <a class="redactor_modal_btn redactor_btn_modal_remove">Supprimer</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Annuler</a>
    </div>
</div>

{{#view view.ModalBox modalName="deleteSideDocument"}}
<div class="modal hide" id="modal-delete-side-document">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment supprimer ce side document ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Supprimer{{/view}}
    </div>
</div>
{{/view}}
