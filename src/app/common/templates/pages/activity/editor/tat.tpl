/*
* @template : pages/activity/editor/tat
*/

<div class="container-fluid">

    <div class="widget-box noborder">
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

                 <button data-toggle="modal" href="#modal-tat-gestion" class="name btn">
                    Gestion
                </button>

                <button {{action toggleSideDocument target="this"}} type="button" class="name btn radioblock">
                    {{view LxxlLib.Ember.Checkbox checkedBinding="currentPage.hasDocument"}}
                    Side document
                </button>
                <!-- <button class="btn">Coefficient</button> -->
            </div>
            <div class="input-prepend">
                    <label class="add-on" for="form-page-explanation">Consigne</label>
                    {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.advice" classNames="redactorjs" plugins="mathjax,tooltip" id="form-page-explanation"}}
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
                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax,tooltip" classNames="redactorjs"}}
        </div>
    </div>
    {{/if}}


    <div class="widget-box">
        <div class="widget-title" data-toggle="slidify" data-target="#page-tat">
            <span class="icon">
                <i class="icon-pencil"></i>
            </span>
            <h5>Texte à trous</h5>
        </div>
        <div class="widget-content slidify-on nopadding" id="page-tat">
                {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.tat" plugins="mathjax,tat,tooltip" classNames="redactorjs"}}
        </div>
    </div>
        
</div>


{{#view view.TatGestion}}
<div class="modal hide" id="modal-tat-gestion">
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