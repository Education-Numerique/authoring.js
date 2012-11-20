/*
* @template : pages/qtiedit/page
*/

<div class="container-fluid">

    <div class="widget-box noborder">
      <div class="alert alert-info">
        <a href="#" data-dismiss="alert" class="close">×</a>
        <h4 class="alert-heading">Besoin d'aide?</h4>
        Une page simple est informative uniquement, et fournit des indications génériques à l'étudiant concernant l'exercice à venir.<br />
        Vous pouvez modifier le titre de cette page, et rédiger un document la constituant.
      </div>
    </div>

    <div class="widget-box noborder">
        <div class="widget-content" id="page-informations">
            
            <div class="control-group">
                <div class="input-prepend">
                    <label class="add-on" for="form-page-title">Titre</label>
                    {{view Ember.TextField valueBinding="currentPage.title" focus="true" classNames="span2" id="form-page-title" placeholder="Identifiez la nature du texte"}}
                </div>
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
            {{view LxxlLib.Em.Wysiwyg valueBinding="currentPage.document" plugins="mathjax" classNames="redactorjs"}}
        </div>
    </div>
</div>