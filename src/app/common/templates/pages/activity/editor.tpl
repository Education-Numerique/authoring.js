/*
* @template : pages/activity/editor
*/

<form class="form-horizontal">
<div class="row-fluid qti" {{bindAttr class="isStaticPage isQuizz isTat isPerfPage"}}>

    <div class="span12">
        
        <div class="widget-box">
            <div class="widget-title">
                <div class="qti-title span3">
                    <h5 class="text-ellipsis unselectable">Pages de l'activité</h5>
                </div>
                {{#view view.DeleteActivityButton modalName="deleteActivity" classNames="btn btn-danger btn-mini" data-toggle="modal" href="#modal-delete-activity"}}Supprimer{{/view}}

<!-- JBT 01/2014 l'auteur n'a plus le droit de dépublier .... C'est réservé à E&N
                [[#if content.controller.isPublished]]
                  [[#view view.UnpublishActivityButton modalName="unpublishActivity" classNames="btn btn-warning btn-mini" data-toggle="modal" href="#modal-unpublish-activity"]]dépublier[[/view]]
                [[else]]
                [[/if]]
-------------------------------------------------------------------- -->

                <button type="button" {{action publishActivity target="controller"}} class="btn btn-success btn-mini">Publier</button>

                <button type="button" {{action embedActivity target="controller"}} class="btn btn-mini">Partager</button>

                <button type="button" {{action exportScorm target="controller"}} class="btn btn-mini">Exporter SCORM</button>

                <button type="button" {{action previewActivity target="controller"}} class="btn btn-mini">Prévisualiser</button>

                <button type="button" {{bindAttr disabled="view.disableSave"}}  {{action saveActivity target="controller"}} class="btn btn-mini">Sauvegarder</button>

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
                                {{#if isPerfPage}}
                                    {{view view.PerfPage}}
                                {{/if}}
                                {{#if isQuizz}}
                                    {{view view.QuizzPage}}
                                {{/if}}
                                {{#if isTat}}
                                    {{view view.TatPage}}
                                {{/if}}
                                {{#if isMixnmatch}}
                                    {{view view.MixnmatchPage}}
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


{{#view view.ModalBox modalName="deleteActivity"}}
<div class="modal" style="display:none" id="modal-delete-activity">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment supprimer TOUTE cette activité ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Supprimer{{/view}}
    </div>
</div>
{{/view}}

{{#view view.ModalBox modalName="unpublishActivity"}}
<div class="modal" style="display:none" id="modal-unpublish-activity">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Voulez-vous vraiment dépublier cette activité ?</h3>
    </div>
    <div class="modal-footer">
        {{#view view.CancelButton classNames="btn" tagName="a" data-dismiss="modal"}}Annuler{{/view}}
        {{#view view.ConfirmButton classNames="btn btn-danger" tagName="a"}}Dépublier{{/view}}
    </div>
</div>
{{/view}}

<div class="modal hide" id="modal-create-page">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Créer une nouvelle page</h3>
    </div>
    <div class="modal-body" style="height:200px">
        <p>Choisissez le modèle de votre page</p>
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

<div class="modal hide" id="modal-page-sequencing">
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h3>Séquenceur</h3>
    </div>
    <div class="modal-body" style="height:200px">
        <form>
          <fieldset>
            
            <label>{{view LxxlLib.Ember.Checkbox checkedBinding="currentPage.displayAll"}}Afficher toutes les questions</label> <br />
            <label>Afficher les questions par ordre :</label>
            {{view LxxlLib.Em.RadioButton name="sequencing_options_sort" checkedBinding="quizzSequencingIsRandom" value="0" title="Aléatoire sur la totalité" groupBinding="currentPage.sequencing"}}
            {{view LxxlLib.Em.RadioButton name="sequencing_options_sort" checkedBinding="quizzSequencingIsRandomSubset" value="1" title="Aléatoire sur un nombre de questions" groupBinding="currentPage.sequencing"}} 
            {{#if quizzSequencingIsRandomSubset}}
            {{view LxxlLib.Em.TextField min="1" valueBinding="quizzSequencingIsRandomSubsetValue" type="number"  classNames="span2"  placeholder="Nombre d'éléments"}}
            {{/if}}
          </fieldset>
        </form>
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

<div class="modal hide" id="action-saved" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Activité sauvegardée</h3>
  </div>
  <div class="modal-body">
    Le brouillon de votre activité a bien été sauvegardé.<br />
    En fait, cette sauvegarde est automatique. Vous devriez pratiquement toujours récupérer votre travail, n'importe où, n'importe quand.<br />
    <small>Attention à ne pas avoir plusieurs instances de votre activité en cours de publication ouvertes en même temps. Vous risqueriez de tout perdre à cause d'une instance que vous auriez oublié de refermer ...</small>
  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Ok</a>
  </div>
</div>

<div class="modal hide" id="action-published" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Activité publiée</h3>
  </div>
  <div class="modal-body">
    Cette version de votre activité a bien été publiée. Elle est désormais consultable par tous dans le Catalogue.<br />
    Nous vous rappelons que l'association se réserve le droit de présenter votre activité sur son site. (<a href='http://www.education-et-numérique.org' target='_blank'>Conditions Générales</a>)<br />
    Si vous continuez à travailler, seul votre <strong>brouillon</strong> sera modifié tant que vous n'aurez pas utilisé à nouveau le bouton "Publier".
  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Ok</a>
  </div>
</div>

<div class="modal hide" id="download-package-scorm" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Télécharger le package SCORM</h3>
  </div>
  <div class="modal-body">
    Package scorm exporté.
  </div>
  <div class="modal-footer">
        <a class="btn" data-dismiss="modal">Annuler</a>
      <a class="btn btn-primary"  id="download-scorm">Télécharger</a>
  </div>
</div>

<div class="modal hide" id="action-published-error" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Activité non publiée</h3>
  </div>
  <div class="modal-body">
    Votre activité n'est pas prête à être publiée. En effet, <span id="pub-err"></span>
    <br />Merci de corriger le problème.
  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Corriger</a>
  </div>
</div>

<div class="modal hide" id="action-scorm-error" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Package scorm</h3>
  </div>
  <div class="modal-body">
    <span id="pub-err"></span>
  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Fermer</a>
  </div>
</div>

<div class="modal hide" id="action-embed-error" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Codes d'insertion</h3>
  </div>
  <div class="modal-body">
    <span id="embed-pub-err"></span>
  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Fermer</a>
  </div>
</div>


<div class="modal hide" id="action-embed" role="dialog" aria-hidden="true">
  <div class="modal-header">
    <h3>Codes d'insertion</h3>
  </div>
  <div class="modal-body">
    Lien vers l'activité :  
    <pre>
      https://www.education-et-numerique.fr/0.3/activity/embed.html?id={{content.controller.id}}
    </pre>
    <hr />
    Code &lt;iframe&gt; à copier/coller dans le code source html de votre blog :
    <pre>
      &lt;iframe src=&quot;//www.education-et-numerique.fr/0.3/activity/embed.html?id={{content.controller.id}}&quot; style=&quot;width: 600px; max-width: 1000px; height: 800px;&quot; &gt;&lt;/iframe&gt;
    </pre>

  </div>
  <div class="modal-footer">
      <a class="btn btn-primary" data-dismiss="modal">Ok</a>
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
        <a class="redactor_modal_btn" href="http://fr.wikipedia.org/wiki/Aide:Formules_TeX" style="float:left;" target="_blank">Documentation</a>
        <a class="redactor_modal_btn redactor_btn_modal_insert">Insérer</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Fermer</a>
    </div>
</div>

<div id="redactor-imagemanager" style="display: none;">
    <div id="redactor_modal_content">
        <div id="redactor_tabs">
            <a href="javascript:void(null);" class="redactor_tabs_act">Upload</a>
            <a href="javascript:void(null);">Galerie</a>
        </div>
        <div id="redactor_tab1" class="redactor_tab">
            <div class="redactor_droparea"><div class="redactor_dropareabox">Déposez le fichier ici</div></div>
            <button class="btn btn-large add-thumbnail">
                <i class="icon-plus"></i>
                <input class="redactor_imageupload" type="file" name="file" class="">
                Ajouter une image
            </button>
        </div>
        <div id="redactor_tab2" class="redactor_tab" style="display:none">
            <div id="redactor_image_box">
                
            </div>
        </div>
    </div>
    <div id="redactor_modal_footer">
        <a  class="redactor_modal_btn redactor_btn_modal_close">Fermer</a>
    </div>
</div>

<div id="redactor-perf" style="display: none;">
      <div id="redactor_modal_content">
        <label>Condition d'affichage : </label>
        <input type="text" class="condition redactor_input" value="" />
        <span class="error_condition">&nbsp;</span>
      </div>

      <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn redactor_btn_modal_insert">Conditionner</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Annuler</a>
    </div>
</div>

<div id="redactor-tat" style="display: none;">
      <div id="redactor_modal_content">
        <label>Mot supprimé : </label>
        <input type="text" class="word redactor_input" value="" />
        <label>Indice : </label>
        <input type="text" class="clue redactor_input" value="" />
        <label>Autres réponses acceptées (séparées par ; | joker : *) : </label>
        <input type="text" class="alternatives redactor_input" value="" />
    </div>
            <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn redactor_btn_modal_insert">Trouer</a>
        <a class="redactor_modal_btn redactor_btn_modal_remove">Reboucher</a>
        <a  class="redactor_modal_btn redactor_btn_modal_close">Annuler</a>
    </div>
</div>

<div id="redactor-perf" style="display: none;">
      <div id="redactor_modal_content">
        <label>Condition d'affichage : </label>
        <input type="text" class="condition redactor_input" value="" />
        <span class="error_condition">&nbsp</span>
    </div>
    <hr class="clear" />

    <div id="redactor_modal_footer">
        <a class="redactor_modal_btn redactor_btn_modal_insert">Conditioner</a>
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

<script>
function confirmreload(){

window.onbeforeunload = function (e) {
      var e = e || window.event;
      var msg = "Leaving this page may make you lose all your edit";
      // For IE and Firefox
      if (e) {
          e.returnValue = msg;
      }
      else
      //For Safari / chrome
      return msg;
   };
 }
confirmreload();

function getActiveElement () {
    if (document.activeElement) {
        var output = document.getElementById("output");
        var activeElement = document.activeElement.getAttribute("contenteditable") || document.activeElement.tagName;
        return activeElement;
    }
}

$(document).keydown(function (e)
{
  var activeElement = getActiveElement();
  e = e || window.event;
  var charCode = e.charCode || e.keyCode;
  if (charCode == 8)
  {
    if (activeElement != 'INPUT' && activeElement != 'TEXTAREA' && activeElement != "true")
    {
      e.preventDefault();
      return false;
    }
  }
});
</script>
{{/view}}
